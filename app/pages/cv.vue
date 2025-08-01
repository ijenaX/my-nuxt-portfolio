<script setup lang="ts">
import { ref } from 'vue';
import CvModalContent from '~/components/CvModalContent.vue';

interface TimelineItem {
  year: string;
  type: string;
  image: string[];
  text: string;
  modalText: string;
  technologies?: string[];
  readMore: boolean;
}

const items: TimelineItem[] = [
  {
    year: '04/2025',
    type: 'certificate',
    image: ['present1_psd.jpg'],
    text: 'AZ-900 Azure Fundamentals',
    modalText: '',
    readMore: false,
  },
  {
    year: '09/2023 - heute',
    type: 'professional',
    image: ['pexels-photo-70912.jpeg'],
    text: 'Junior Softwareenwickler bei der MVI Solve-It',
    modalText:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    technologies: ['Angular', 'Azure', 'Docker', 'Java', 'Kubernetes', 'Terraform', 'Typescript', 'Postgresql'],
    readMore: true,
  },
  {
    year: '05/2023 - 07/2023',
    type: 'professional',
    image: ['openknowledge-kennedy-tower.jpg'],
    text: 'Enterprise Developer bei der open knowledge GmbH',
    modalText: 'testtext',
    readMore: false,
  },
  {
    year: '08/2022 - 04/2023',
    type: 'education',
    image: ['openknowledge-kennedy-tower.jpg'],
    text: 'Praxissemester bei open knowledge GmbH',
    modalText: 'testtext',
    readMore: true,
  },
  {
    year: '10/2017 - 04/2023',
    type: 'education',
    image: ['free-birds.jpeg'],
    text: 'Studium Medieninformatik B-Sc.',
    modalText: 'testtext',
    readMore: true,
  },
  {
    year: '02/2017',
    type: 'education',
    image: ['printer.jpeg'],
    text: 'Praktikum in der Lithografie Staudt',
    modalText: 'testtext',
    readMore: true,
  },
  {
    year: '09/2008 - 04/2016',
    type: 'education',
    image: ['abitur.jpeg'],
    text: 'Schulzeit am Hellweg Gymnasium',
    modalText: 'testtext',
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
  return fileName ? `/images/${fileName}` : '';
}

const isOpen = ref(false);
const selectedItem = ref<TimelineItem | null>(null);

function openModal(item: TimelineItem) {
  selectedItem.value = item;
  isOpen.value = true;
}
</script>

<template>
  <div class="container mx-auto px-4 py-16 max-w-3xl">
    <h1 class="text-center">Lebenslauf</h1>
    <p class="text-center mx-auto max-w-3xl pb-10 text-lg leading-relaxed">
      Entdecke die Projekte an denen ich im professionellen Umfeld gearbeitet habe, meine Ausbildung und praktische Erfahrung, sowie Zertifikate. Jede Karte war ein Meilenstein auf meinem Weg zum Full
      Stack Entwickler.
    </p>

    <!-- Tabs -->
    <ul class="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6 text-lg font-semibold cursor-pointer select-none text-center">
      <li v-for="tab in tabs" :key="tab" :class="[activeTab === tab ? 'border-b-4 border-accent text-accent' : 'text-gray-300 hover:text-accent', 'pb-2']" @click="activeTab = tab">
        {{ tab }}
      </li>
    </ul>

    <!-- Tab Content -->
    <div>
      <div v-if="filteredItems.length === 0" class="text-center text-secondary italic">Für den Tab "{{ activeTab }}" sind aktuell keine Einträge vorhanden.</div>

      <ul class="flex flex-wrap gap-6 justify-center">
        <li v-for="item in filteredItems" :key="item.year + item.text" class="flex flex-col w-64 p-4 border backdrop-blur-sm rounded-md shadow-sm hover:shadow-md transition">
          <img :src="getImagePath(item.image[0]!)" alt="Bild zu {{ item.text }}" class="w-full h-40 object-cover rounded-md mb-4" />
          <p class="font-semibold text-lg">{{ item.year }}</p>
          <p class="flex-grow">{{ item.text }}</p>
          <button v-if="item.readMore" class="text-accent hover:underline mt-2 self-end" @click="openModal(item)">...Mehr erfahren</button>
        </li>
      </ul>
    </div>
    <!-- Read more modal -->
    <teleport to="#modal-target">
      <transition name="circle">
        <div v-if="isOpen" class="absolute inset-0 bg-accent flex items-center justify-center z-50">
          <CvModalContent
            v-if="selectedItem"
            :title="`${selectedItem.text}`"
            :description="selectedItem.modalText"
            :technologies="selectedItem.technologies"
            :image="getImagePath(selectedItem.image[1]! ?? selectedItem.image[0])"
            @close="isOpen = false"
          />
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
