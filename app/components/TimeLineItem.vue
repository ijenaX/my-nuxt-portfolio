<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface TimelineItem {
  year: number;
  image: string;
  text: string;
  readMore: boolean;
}

const props = defineProps<{
  item: TimelineItem;
  isActive: boolean;
  onVisible?: (item: TimelineItem) => void;
}>();

const itemRef = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && props.onVisible) {
        props.onVisible(props.item);
      }
    },
    {
      threshold: 0.5,
    }
  );
  if (itemRef.value) {
    observer.observe(itemRef.value);
  }
});
</script>

<template>
  <div :id="`year-${item.year}`" ref="itemRef" class="py-16">
    <div class="flex">
      <div class="ml-8">
        <slot />
      </div>
    </div>
  </div>
</template>
