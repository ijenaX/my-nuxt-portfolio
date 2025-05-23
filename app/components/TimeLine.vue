<script setup lang="ts">
import { ref } from 'vue';

interface TimelineItem {
  year: number;
  image: string;
  text: string;
  readMore: boolean;
}

const items: TimelineItem[] = [
  {
    year: 2025,
    image: 'present1_psd.jpg',
    text: '???',
    readMore: false,
  },
  {
    year: 2023,
    image: 'pexels-photo-70912.jpeg',
    text: 'Berufseinstieg bei der MVI Solve-It als Junior Softwareenwickler',
    readMore: true,
  },
  {
    year: 2023,
    image: 'free-birds.jpeg',
    text: 'Abschluss des Studiums Medieninformatik B-Sc. mit der Note 2,4',
    readMore: true,
  },
  {
    year: 2022,
    image: 'openknowledge-kennedy-tower.jpg',
    text: 'Start des Praxissemesters bei open knowledge GmbH',
    readMore: true,
  },
  {
    year: 2017,
    image: 'whs-gelsenkirchen.jpg',
    text: 'Beginn des Studiums Medieninformatik an der Westfälischen Hochschule Gelsenkirchen',
    readMore: true,
  },
  {
    year: 2017,
    image: 'printer.jpeg',
    text: 'Praktikum in der Lithografie Staudt',
    readMore: true,
  },
  {
    year: 2016,
    image: 'abitur.jpeg',
    text: 'Abitur mit der Abschlussnote 2,4',
    readMore: false,
  },
  {
    year: 2008,
    image: 'hellweg-schulgebäude.jpg',
    text: 'Versetzung aufs Gymnasium: Hellwegschule in Bochum',
    readMore: false,
  },
  {
    year: 2004,
    image: 'grundschule.jpeg',
    text: 'Einschulung in die Grundschule GGS Westenfeld in Bochum',
    readMore: false,
  },
  {
    year: 1998,
    image: 'satellite.jpg',
    text: 'Ankunft auf der Erde',
    readMore: false,
  },
];

function getImagePath(fileName: string): string {
  return `/images/${fileName}`;
}

const activeYear = ref(items[0]!.year);
</script>

<template>
  <div v-for="year in items" :key="year.year" class="relative px-0 flex flex-col space-y-4 h-screen">
    <div class="absolute z-0 w-0.5 h-full bg-highlight shadow-md inset-0 left-3"></div>
    <div class="relative z-10">
      <div class="absolute inset-0 h-7 w-7 text-xs bg-highlight"></div>
      <!-- Sci-Fi Linie mit Knick -->
      <div class="-z-10 absolute top-3 left-6 w-[calc(100%-3rem)] h-0.5 bg-highlight"></div>
      <div :key="year.image" v-motion :initial="{ opacity: 0, y: 0 }" :visible="{ opacity: 1, y: 0 }" :delay="200" :duration="500" class="relative ml-auto w-4/5 md:w-fit md:max-w-[40vw]">
        <div class="group relative overflow-hidden rounded-md shadow-md border-2 border-white transition-all">
          <img :src="getImagePath(year.image)" alt="Timeline image" class="object-cover rounded-md transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75" />
          <span
            class="absolute text-white bg-accent px-4 text-2xl font-bold transition-all duration-1000 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:left-4 group-hover:top-4 group-hover:translate-x-0 group-hover:translate-y-0"
            >{{ year.year }}</span
          >
          <p
            class="absolute bottom-0 left-0 w-full p-4 text-white text-sm bg-black bg-opacity-60 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0"
          >
            {{ year.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="flex mb-32">
    <div class="top-0 h-screen">
      <div class="space-y-4">
        <div v-for="year in items" :key="year.year" class="text-right transition-all" :class="{ 'text-blue-600 font-bold': activeYear === year.year }">
          {{ year.year }}
        </div>
      </div>
    </div>

    <div class="w-3/4">
      <TimelineItem v-for="item in items" :key="item.year" :item="item" :is-active="activeYear === item.year">
        <div class="p-4">
          <img :src="item.image" class="mb-4 rounded-xl shadow-lg w-full max-w-lg" />
          <p class="text-lg">{{ item.text }}</p>
        </div>
      </TimelineItem>
    </div>
  </div> -->
</template>
