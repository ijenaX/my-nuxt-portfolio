<script setup lang="ts">
import { ref } from 'vue';

interface TimelineItem {
  year: number;
  type: string;
  image: string;
  text: string;
  readMore: boolean;
}

const items: TimelineItem[] = [
  {
    year: 2025,
    type: 'none',
    image: 'present1_psd.jpg',
    text: '???',
    readMore: false,
  },
  {
    year: 2025,
    type: 'certificate',
    image: 'present1_psd.jpg',
    text: 'AZ-900 Azure Fundamentals',
    readMore: false,
  },
  {
    year: 2023,
    type: 'professional',
    image: 'pexels-photo-70912.jpeg',
    text: 'Berufseinstieg bei der MVI Solve-It als Junior Softwareenwickler',
    readMore: true,
  },
  {
    year: 2023,
    type: 'professional',
    image: 'openknowledge-kennedy-tower.jpg',
    text: 'Berufseinstieg bei der open knowledge GmbH als Enterprise Developer',
    readMore: true,
  },
  {
    year: 2023,
    type: 'education',
    image: 'free-birds.jpeg',
    text: 'Abschluss des Studiums Medieninformatik B-Sc. mit der Note 2,4',
    readMore: false,
  },
  {
    year: 2022,
    type: 'education',
    image: 'openknowledge-kennedy-tower.jpg',
    text: 'Start des Praxissemesters bei open knowledge GmbH',
    readMore: true,
  },
  {
    year: 2017,
    type: 'none',
    image: 'whs-gelsenkirchen.jpg',
    text: 'Beginn des Studiums Medieninformatik an der Westfälischen Hochschule Gelsenkirchen',
    readMore: true,
  },
  {
    year: 2017,
    type: 'education',
    image: 'printer.jpeg',
    text: 'Praktikum in der Lithografie Staudt',
    readMore: true,
  },
  {
    year: 2016,
    type: 'education',
    image: 'abitur.jpeg',
    text: 'Abitur mit der Abschlussnote 2,4',
    readMore: false,
  },
];

const tabs = ['Berufserfahrung', 'Ausbildung', 'Zertifikate'] as const;
const activeTab = ref<(typeof tabs)[number]>('Berufserfahrung');

const filteredItems = computed(() => {
  switch (activeTab.value) {
    case 'Berufserfahrung':
      return items.filter((i) => i.type === 'professional');
    case 'Ausbildung':
      return items.filter((i) => i.type === 'education');
    case 'Zertifikate':
      return items.filter((i) => i.type === 'certificate');
    default:
      return [];
  }
});

function getImagePath(fileName: string): string {
  return `/images/${fileName}`;
}

const isOpen = ref(false);
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-center font-AvaFont text-4xl my-4 text-accent">Lebenslauf</h1>
    <p class="text-center mx-auto max-w-3xl pb-10">
      Entdecke die Projekte an denen ich im professionellen Umfeld gearbeitet habe, meine Ausbildung und praktische Erfahrung, sowie Zertifikate. Jede Karte war ein Meilenstein auf meinem Weg zum
      Full-Stack Entwickler.
    </p>

    <!-- Tabs -->
    <ul class="flex justify-center gap-8 mb-6 text-lg font-semibold cursor-pointer select-none">
      <li v-for="tab in tabs" :key="tab" :class="[activeTab === tab ? 'border-b-4 border-accent text-accent' : 'text-secondary hover:text-accent']" class="pb-2" @click="activeTab = tab">
        {{ tab }}
      </li>
    </ul>

    <!-- Tab Content -->
    <div>
      <div v-if="filteredItems.length === 0" class="text-center text-secondary italic">Für den Tab "{{ activeTab }}" sind aktuell keine Einträge vorhanden.</div>

      <ul class="flex flex-wrap gap-6 justify-center">
        <li v-for="item in filteredItems" :key="item.year + item.text" class="flex flex-col w-64 p-4 border rounded-md shadow-sm hover:shadow-md transition">
          <img :src="getImagePath(item.image)" alt="Bild zu {{ item.text }}" class="w-full h-40 object-cover rounded-md mb-4" />
          <p class="font-semibold text-lg">{{ item.year }}</p>
          <p class="flex-grow">{{ item.text }}</p>
          <button v-if="item.readMore" class="text-accent underline mt-2 self-start" @click="isOpen = true">Mehr lesen</button>
        </li>
      </ul>
    </div>
    <!-- Read more modal -->
    <teleport to="#modal-target">
      <transition name="circle">
        <div v-if="isOpen" class="absolute inset-0 bg-accent flex items-center justify-center z-50">
          <div>
            <h2>Modal</h2>
            <p>Some text</p>
            <button @click="isOpen = false">Close</button>
          </div>
        </div>
      </transition>
    </teleport>
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
