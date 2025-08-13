<script setup lang="ts">
import { ref } from 'vue';
import items from '~/data/cvItems.json';

export type CvType = 'professional' | 'education' | 'certificate';

const tabLabels = {
  professional: 'Berufserfahrung',
  education: 'Ausbildung',
  certificate: 'Zertifikate',
};
const tabs = Object.keys(tabLabels) as Array<keyof typeof tabLabels>;
const currentTab = ref<keyof typeof tabLabels>('professional');

const filteredItems = computed(() => items.filter((i) => i.type === currentTab.value));

function getImagePath(fileName: string): string {
  return fileName ? `/images/${fileName}` : '';
}
</script>

<template>
  <div class="container mx-auto px-4 py-16 max-w-6xl">
    <h1 class="text-center">Lebenslauf</h1>
    <p class="text-center mx-auto max-w-3xl pb-10 text-lg leading-relaxed">
      Entdecke die Projekte an denen ich im professionellen Umfeld gearbeitet habe, meine Ausbildung und praktische Erfahrung, sowie Zertifikate. Jede Karte war ein Meilenstein auf meinem Weg zum Full
      Stack Entwickler.
    </p>

    <!-- Tabs -->
    <ul class="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6 text-lg font-semibold cursor-pointer select-none text-center">
      <li v-for="tab in tabs" :key="tab" :class="[currentTab === tab ? 'border-b-4 border-accent text-accent' : 'text-gray-300 hover:text-accent', 'pb-2']" @click="currentTab = tab">
        {{ tabLabels[tab] }}
      </li>
    </ul>

    <!-- Tab Content -->
    <div>
      <div v-if="filteredItems.length === 0" class="text-center text-highlight italic">Für den Tab "{{ tabLabels[currentTab] }}" sind aktuell keine Einträge vorhanden.</div>

      <ul class="flex flex-wrap gap-6 justify-center">
        <li v-for="item in filteredItems" :key="item.year + item.text" class="flex flex-col w-64 p-4 border backdrop-blur-sm rounded-md shadow-sm hover:shadow-md transition">
          <img :src="getImagePath(item.image[0]!)" alt="Bild zu {{ item.text }}" class="w-full h-36 object-cover rounded-md mb-4" />
          <p class="font-semibold text-lg">{{ item.year }}</p>
          <p class="flex-grow">{{ item.text }}</p>
          <NuxtLink v-if="item.readMore" :to="`/cvDetail/${item.id}`" class="text-accent hover:underline mt-2 self-end">...Mehr erfahren</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.circle-enter-active,
.circle-leave-active {
  transition: clip-path 0.4s ease-in-out;
}

.circle-enter-from {
  clip-path: circle(0% at 50% 50%);
  opacity: 0;
}
.circle-enter-to {
  clip-path: circle(150% at 50% 50%);
  opacity: 1;
}

.circle-leave-from {
  clip-path: circle(150% at 50% 50%);
  opacity: 1;
}
.circle-leave-to {
  clip-path: circle(0% at 50% 50%);
  opacity: 0 ease-out;
}
</style>
