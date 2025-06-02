<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import * as d3 from 'd3';
import { radarData } from '@/utils/radarData';

const svgRef = ref<SVGSVGElement | null>(null);
const width = 600;
const height = 600;
const rings = ['Adopt', 'Trial', 'Hold'];
const quadrantColors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728'];

const state = reactive({
  hoveredId: null as number | null,
});

type EntryWithMeta = {
  id: number;
  label: string;
  quadrantIndex: number;
  ringIndex: number;
};

const entries = ref<EntryWithMeta[]>([]);

// Punkte mit Positionen für Tooltip
const points = ref<{ id: number; x: number; y: number; label: string }[]>([]);

function getEntries(): EntryWithMeta[] {
  const all: EntryWithMeta[] = [];
  let counter = 1;

  radarData.forEach((q, qIdx) => {
    q.rings.forEach((r, rIdx) => {
      r.entries.forEach((entry) => {
        all.push({
          id: counter++,
          label: entry.label,
          quadrantIndex: qIdx,
          ringIndex: rIdx,
        });
      });
    });
  });

  return all;
}

entries.value = getEntries();

function getId(label: string): number | null {
  const found = entries.value.find((e) => e.label === label);
  return found ? found.id : null;
}

function hoveredId(label: string): boolean {
  const id = getId(label);
  return id === state.hoveredId;
}

onMounted(() => {
  const svg = d3.select(svgRef.value!);
  svg.selectAll('*').remove();

  const radius = Math.min(width, height) / 2 - 50;
  const center = { x: width / 2, y: height / 2 };
  const ringStep = radius / rings.length;
  const angleStep = (Math.PI * 2) / 4;

  // Ringe zeichnen und Beschriftung der Ringe
  rings.forEach((ring, i) => {
    const r = ringStep * (i + 1);

    svg.append('circle').attr('cx', center.x).attr('cy', center.y).attr('r', r).attr('stroke', '#555').attr('fill', 'none');

    svg
      .append('text')
      .attr('x', center.x)
      .attr('y', center.y - r - 6)
      .attr('text-anchor', 'middle')
      .attr('fill', '#aaa')
      .style('font-size', '10px')
      .text(ring.toUpperCase());
  });

  // Quadrantlinien zeichnen
  for (let i = 0; i < 4; i++) {
    const angle = (Math.PI / 2) * i;
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);

    svg.append('line').attr('x1', center.x).attr('y1', center.y).attr('x2', x).attr('y2', y).attr('stroke', '#888');
  }

  // Quadrantnamen
  radarData.forEach((q, i) => {
    const angle = (Math.PI / 2) * i + Math.PI / 4;
    const x = center.x + (radius + 20) * Math.cos(angle);
    const y = center.y + (radius + 20) * Math.sin(angle);

    svg.append('text').attr('x', x).attr('y', y).attr('text-anchor', 'middle').attr('fill', '#fff').style('font-size', '12px').text(q.name);
  });

  // Punkte berechnen & zeichnen (ohne Tooltip in D3)
  const tempPoints: typeof points.value = [];

  entries.value.forEach((entry) => {
    const angle = angleStep * entry.quadrantIndex + (Math.random() * angleStep) / 2;
    const r = ringStep * (entry.ringIndex + 0.5) * (0.9 + 0.2 * Math.random());

    const x = center.x + r * Math.cos(angle);
    const y = center.y + r * Math.sin(angle);

    tempPoints.push({ id: entry.id, x, y, label: entry.label });

    const pointGroup = svg
      .append('g')
      .attr('class', 'point-group')
      .on('mouseenter', () => (state.hoveredId = entry.id))
      .on('mouseleave', () => (state.hoveredId = null));

    // Kreis
    const fillColor = quadrantColors[entry.quadrantIndex] ?? '#ccc';
    pointGroup.append('circle').attr('cx', x).attr('cy', y).attr('r', 7).attr('fill', fillColor);

    // Nummer in Kreis (zentriert, weiß)
    pointGroup
      .append('text')
      .attr('x', x)
      .attr('y', y + 3) // leicht vertikal zentriert
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .style('font-size', '8px')
      .style('pointer-events', 'none') // Damit der Text keine Hover-Events blockiert
      .text(entry.id);
  });

  points.value = tempPoints;
});
</script>

<template>
  <div class="flex flex-col items-center gap-4" style="position: relative; width: 600px; height: 600px">
    <svg ref="svgRef" :width="width" :height="height" class="rounded-xl border border-white/30 bg-white/5 backdrop-blur-md"></svg>
    <!-- Tooltip als HTML Overlay -->
    <div
      v-if="state.hoveredId !== null"
      :style="{
        position: 'absolute',
        pointerEvents: 'none',
        top: `${points.find((p) => p.id === state.hoveredId)?.y}px`,
        left: `${points.find((p) => p.id === state.hoveredId)?.x}px`,
        transform: 'translate(10px, -30px)',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        fontSize: '12px',
        userSelect: 'none',
      }"
    >
      {{ points.find((p) => p.id === state.hoveredId)?.label }}
    </div>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white mt-6">
    <div v-for="(quadrant, i) in radarData" :key="i">
      <h3 :style="{ color: quadrantColors[i] }" class="font-bold mb-1">{{ quadrant.name }}</h3>
      <ol class="space-y-1 list-inside">
        <li v-for="ring in quadrant.rings" :key="ring.name" class="space-y-1">
          <div
            v-for="entry in ring.entries"
            :key="entry.label"
            :class="['transition-colors duration-200 cursor-pointer', hoveredId(entry.label) ? 'text-accent font-semibold' : '']"
            @mouseenter="state.hoveredId = getId(entry.label)"
            @mouseleave="state.hoveredId = null"
          >
            <span class="font-mono mr-1 text-xs text-gray-400">{{ getId(entry.label) }}.</span>
            {{ entry.label }}
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
