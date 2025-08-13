<script setup lang="ts">
import { ref } from 'vue';
import CvModalContent from '~/components/CvModalContent.vue';

export type CvType = 'professional' | 'education' | 'certificate';

interface TimelineItem {
  year: string;
  type: CvType;
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
    image: ['engin-akyurt-A9_IsUtjHm4-unsplash.jpg'],
    text: 'AZ-900 Azure Fundamentals',
    modalText: '',
    readMore: false,
  },
  {
    year: '09/2023 - heute',
    type: 'professional',
    image: ['pexels-photo-70912.jpeg'],
    text: 'Junior Software-Enwickler, MVI Group GmbH',
    modalText:
      'Während meiner Tätigkeit bei MVI Group GmbH arbeitete ich an verschiedenen Projekten im Bereich Cloud & Webentwicklung. Innerhalb eines agilen Teams, war ich bisher beteiligt an der Implementierung von Microservices, CI/CD-Pipelines und der Optimierung von Cloud-Infrastrukturen. Mein Schwerpunkt dabei lag allerdings auf der Weiterentwicklung eines Angular Frontends welches als Kundenanwendung genutzt wird. Als Nebenprojekt innerhalb der Firma war ich zudem an der Planung und Umsetzung eines Chatbots beteiligt. Mein Fokus lag hier auf dem Aufbau der Infrastruktur in Azure und der Entwicklung einer Angular Web-Component.',
    technologies: ['Angular', 'Azure', 'Docker', 'Java', 'Kubernetes', 'Terraform', 'Typescript', 'Postgresql'],
    readMore: true,
  },
  {
    year: '05/2023 - 07/2023',
    type: 'professional',
    image: ['openknowledge-kennedy-tower.jpg'],
    text: 'Enterprise Developer, open knowledge GmbH',
    modalText:
      'Während meiner Zeit als Praktikant und Festangestellter bei der open knowledge GmbH, habe ich eigenständig an der Entwicklung eines internen Full-Stack Projektes gearbeitet. Es ging darum backend-seitig eine Architektur im Spring Boot Framework nach dem Domain Driven Design Standard (DDD) zu entwickeln, sowie eine REST-API und das Frontend in Angular zu implementieren. Dazu gehörten auch Unit Tests.',
    technologies: ['Angular', 'Java', 'Spring Boot', 'Typescript', 'DDD', 'REST'],
    readMore: true,
  },
  {
    year: '08/2022 - 04/2023',
    type: 'education',
    image: ['openknowledge-kennedy-tower.jpg'],
    text: 'Praxissemester bei open knowledge GmbH',
    modalText:
      'Während meiner Zeit als Praktikant und Festangestellter bei der open knowledge GmbH, habe ich eigenständig an der Entwicklung eines internen Full-Stack Projektes gearbeitet. Es ging darum backend-seitig eine Architektur im Spring Boot Framework nach dem Domain Driven Design Standard (DDD) zu entwickeln, sowie eine REST-API und das Frontend in Angular zu implementieren. Dazu gehörten auch Unit Tests.',
    technologies: ['Angular', 'Java', 'Spring Boot', 'Typescript', 'DDD', 'REST', 'Github Actions'],
    readMore: true,
  },
  {
    year: '10/2017 - 04/2023',
    type: 'education',
    image: ['pexels-luis-gomes-166706-546819.jpg'],
    text: 'Studium Medieninformatik B-Sc., WHS Gelsenkirchen',
    modalText:
      'Während meines Studiums habe ich fundierte Kenntnisse in den Bereichen Softwareentwicklung, Webtechnologien, UX/UI-Design und Medientechnik erworben. Zu meinen Schwerpunkten zählten Frontend- und Backend-Programmierung, Datenbanken, sowie visuelle Kommunikation. Im Rahmen eines Softwareprojekts wurde eine umfassende Anwendung zur Verarbeitung und Bearbeitung von Audiosignalen in einem interdisziplinären Team entwickelt. Das Thema meiner Bachelorarbeit hingegen drehte sich um Design Systeme und wie sie als Schnittstelle zwischen Entwicklern und Designern dienen können. Dafür interviewte ich u.a. verschiedene Entwickler und Designer im professionellen Umfeld.',
    readMore: true,
  },
  {
    year: '02/2017',
    type: 'education',
    image: ['printer.jpeg'],
    text: 'Praktikum, Lithografie Staudt GmbH',
    modalText:
      'Während meines Praktikums in einer Lithografie erhielt ich spannende Einblicke in den Produktionsprozess der Druckvorstufe und praktische Erfahrungen in der Erstellung von Printmedien.',
    technologies: ['Adobe Photoshop', 'Adobe Indesign', 'Komposition', 'Farblehre'],
    readMore: true,
  },
  {
    year: '09/2008 - 04/2016',
    type: 'education',
    image: ['abitur.jpeg'],
    text: 'Schulzeit am Hellweg Gymnasium',
    modalText: '',
    readMore: false,
  },
];

const isOpen = ref(false);
const tabLabels = {
  professional: 'Berufserfahrung',
  education: 'Ausbildung',
  certificate: 'Zertifikate',
};
const tabs = Object.keys(tabLabels) as Array<keyof typeof tabLabels>;
const currentTab = ref<keyof typeof tabLabels>('professional');
const selectedItem = ref<TimelineItem | null>(null);

const filteredItems = computed(() => items.filter((i) => i.type === currentTab.value));

function getImagePath(fileName: string): string {
  return fileName ? `/images/${fileName}` : '';
}

function openModal(item: TimelineItem) {
  selectedItem.value = item;
  isOpen.value = true;
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
