<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  technologies?: string[];
  image?: string;
}>();

const emit = defineEmits(['close']);
</script>

<template>
  <div class="text-black flex flex-col p-6 w-full h-full">
    <header class="flex justify-center mb-20">
      <button
        class="group p-2 cursor-pointer relative text-xl font-normal border-0 flex items-center justify-center bg-transparent text-white h-auto w-[170px] overflow-hidden transition-all duration-100"
        aria-label="Modal schließen"
        @click="emit('close')"
      >
        <span class="group-hover:w-full absolute left-0 h-full w-5 border-y border-l border-white transition-all duration-500"> </span>
        <p>Zurück</p>
        <span class="group-hover:w-full absolute right-0 h-full w-5 border-y border-r border-white transition-all duration-500"> </span>
      </button>
    </header>
    <div class="flex flex-row flex-1 justify-center">
      <!-- <div v-if="image" class="mb-6 flex justify-end">
        <NuxtImg :src="image" alt="Modal Bild" class="rounded-lg shadow-lg object-cover w-full sm:w-auto" />
      </div> -->
      <section class="mb-6 px-2 sm:text-left">
        <h1 class="text-2xl font-bold text-center px-12 py-6 bg-stone-900 text-highlight">{{ title }}</h1>
        <p class="text-base p-12 text-center leading-relaxed max-w-prose mx-auto sm:mx-0 border border-stone-900">{{ description }}</p>
      </section>
    </div>
    <div v-if="technologies?.length" class="mt-4">
      <ul class="flex flex-wrap gap-2 justify-center">
        <li v-for="tech in technologies" :key="tech" class="bg-stone-900 text-white px-3 py-1 rounded-full text-sm">
          {{ tech }}
        </li>
      </ul>
    </div>
  </div>
</template>
