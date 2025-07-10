<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import * as d3 from 'd3';
import { radarData } from '@/utils/radarData';

const svgRef = ref<SVGSVGElement | null>(null);
const width = ref(0);
const height = ref(0);
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
  // hole die Größe vom Container
  const container = document.getElementById('modal-target');
  if (container) {
    width.value = container.clientWidth;
    height.value = container.clientHeight;
  }

  drawRadar();
});

function drawRadar() {
  if (!svgRef.value) return;
  const svg = d3.select(svgRef.value!);
  svg.selectAll('*').remove();

  const radius = Math.min(width.value, height.value) * 0.45; // 0.45 wegen Padding/Rand
  const center = { x: width.value / 2, y: height.value / 2 };
  const ringStep = radius / rings.length;
  const angleStep = (Math.PI * 2) / 4;

  // Ringe zeichnen und Beschriftung der Ringe
  rings.forEach((ring, i) => {
    const r = ringStep * (i + 1);

    svg.append('circle').attr('cx', center.x).attr('cy', center.y).attr('r', r).attr('stroke', '#DE2B37').attr('fill', 'none');

    svg
      .append('text')
      .attr('x', center.x)
      .attr('y', center.y - r + 24)
      .attr('text-anchor', 'middle')
      .attr('fill', '#aaa')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .text(ring.toUpperCase());
  });

  // Quadrantlinien zeichnen
  for (let i = 0; i < 4; i++) {
    const angle = (Math.PI / 2) * i;
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);

    svg.append('line').attr('x1', center.x).attr('y1', center.y).attr('x2', x).attr('y2', y).attr('stroke', '#DE2B37');
  }

  // Punkte berechnen & zeichnen
  const tempPoints: typeof points.value = [];

  const radiusPx = 7;
  const minDistance = radiusPx * 2 + 1;

  entries.value.forEach((entry) => {
    let x = 0;
    let y = 0;
    let tries = 0;
    let valid = false;

    while (tries < 100 && !valid) {
      const angle = angleStep * entry.quadrantIndex + Math.random() * angleStep;
      const r = ringStep * (entry.ringIndex + 0.5) * (0.8 + 0.35 * Math.random());

      x = center.x + r * Math.cos(angle);
      y = center.y + r * Math.sin(angle);

      valid = tempPoints.every((p) => {
        const dx = p.x - x;
        const dy = p.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance >= minDistance;
      });

      tries++;
    }

    tempPoints.push({ id: entry.id, x, y, label: entry.label });

    const pointGroup = svg
      .append('g')
      .attr('class', 'point-group')
      .on('mouseenter', () => (state.hoveredId = entry.id))
      .on('mouseleave', () => (state.hoveredId = null));

    const fillColor = quadrantColors[entry.quadrantIndex] ?? '#ccc';
    pointGroup.append('circle').attr('cx', x).attr('cy', y).attr('r', radiusPx).attr('fill', fillColor);

    pointGroup
      .append('text')
      .attr('x', x)
      .attr('y', y + 3)
      .attr('text-anchor', 'middle')
      .attr('fill', '#000')
      .style('font-size', '8px')
      .style('pointer-events', 'none')
      .text(entry.id);
  });

  points.value = tempPoints;
}
</script>

<template>
  <div class="flex flex-row gap-4">
    <svg ref="svgRef" :width="width" :height="height" class="border border-white/30 bg-white/5"></svg>
    <!-- Tooltip als HTML Overlay -->
    <div
      v-if="state.hoveredId !== null"
      :style="{
        position: 'absolute',
        pointerEvents: 'none',
        top: `${points.find((p) => p.id === state.hoveredId)?.y}px`,
        left: `${points.find((p) => p.id === state.hoveredId)?.x}px`,
        transform: 'translate(10px, -10px)',
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
