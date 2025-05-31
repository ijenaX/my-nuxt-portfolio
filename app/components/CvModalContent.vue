<script setup lang="ts">
import { DefineProps } from 'vue';

defineProps<{
  title: string;
  description: string;
}>();

const emit = defineEmits(['close']);
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <button @click="emit('close')">Close</button>
  </div>
</template>
