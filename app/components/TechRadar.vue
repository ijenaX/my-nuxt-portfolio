<script setup lang="ts">
import { computed } from 'vue';
import type { RadarQuadrant, RadarEntry } from '@/utils/radarData';
import { radarData } from '@/utils/radarData';

const quadrants = computed(() => radarData);
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
    <div v-for="quadrant in quadrants" :key="quadrant.name" class="border rounded-xl p-4 bg-white/10 backdrop-blur-md">
      <h2 class="text-xl font-bold mb-3 border-b border-white/30 pb-1">{{ quadrant.name }}</h2>
      <div v-for="ring in quadrant.rings" :key="ring.name" class="mb-4">
        <h3 class="text-sm font-semibold text-blue-200 mt-2">{{ ring.name }}</h3>
        <ul class="list-disc list-inside text-sm">
          <li v-for="entry in ring.entries" :key="entry.label">
            {{ entry.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
