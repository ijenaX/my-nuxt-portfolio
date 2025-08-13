<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import items from '~/data/cvItems.json';

const route = useRoute();
const router = useRouter();

// Dynamic id from URL
const id = route.params.id as string;

// Item that belongs to URL
const item = items.find((i) => i.id === id);

if (!item) {
  // Optional: REdirection if id not exists
  router.push('/cv');
}

definePageMeta({
  pageTransition: {
    name: 'circle-forward',
    mode: 'out-in',
  },
  middleware(to, from) {
    if (!from.params.id) return;

    const circleTransition = to.meta.pageTransition as { name: string };
    circleTransition.name = +to.params.id! > +from.params.id! ? 'circle-forward' : 'circle-backward';
  },
});
</script>

<template>
  <div v-if="item" class="bg-accent absolute inset-0 flex flex-col p-6 w-full h-fit sm:h-full">
    <header class="flex justify-center mb-20">
      <NuxtLink
        :to="`/cv`"
        class="group p-2 cursor-pointer relative text-xl font-normal border-0 flex items-center justify-center bg-transparent text-white h-auto w-[170px] overflow-hidden transition-all duration-100"
        aria-label="Modal schließen"
      >
        <span class="group-hover:w-full absolute left-0 h-full w-5 border-y border-l border-white transition-all duration-500"></span>
        <p>Zurück</p>
        <span class="group-hover:w-full absolute right-0 h-full w-5 border-y border-r border-white transition-all duration-500"></span>
      </NuxtLink>
    </header>

    <div class="flex-1 flex flex-row justify-center">
      <section class="mb-6 px-2 sm:text-left max-w-prose w-full mx-auto break-words">
        <h2 class="text-xl sm:text-2xl font-bold text-center px-4 sm:px-12 py-4 sm:py-6 bg-stone-900 text-highlight w-full">
          {{ item.text }}
        </h2>
        <p class="text-sm sm:text-base px-4 sm:px-12 py-6 sm:py-12 text-center leading-relaxed border border-stone-900">
          {{ item.modalText }}
        </p>
      </section>
    </div>

    <div v-if="item.technologies?.length" class="mt-4">
      <ul class="flex flex-wrap gap-2 justify-center">
        <li v-for="tech in item.technologies" :key="tech" class="bg-stone-900 text-white px-3 py-1 rounded-full text-sm">
          {{ tech }}
        </li>
      </ul>
    </div>
  </div>

  <div v-else class="p-4">
    <p>CV-Eintrag nicht gefunden.</p>
  </div>
</template>

<style>
.circle-forward-enter-active,
.circle-forward-leave-active {
  transition:
    clip-path 0.4s ease-in-out,
    opacity 0.4s ease-in-out;
}

.circle-forward-enter-from {
  clip-path: circle(0% at 50% 50%);
  opacity: 0;
}
.circle-forward-enter-to {
  clip-path: circle(150% at 50% 50%);
  opacity: 1;
}
.circle-forward-leave-from {
  clip-path: circle(150% at 50% 50%);
  opacity: 1;
}
.circle-forward-leave-to {
  clip-path: circle(0% at 50% 50%);
  opacity: 0;
}

.circle-backward-enter-active,
.circle-backward-leave-active {
  transition:
    clip-path 0.4s ease-in-out,
    opacity 0.4s ease-in-out;
}

.circle-backward-enter-from {
  clip-path: circle(150% at 50% 50%);
  opacity: 0;
}
.circle-backward-enter-to {
  clip-path: circle(0% at 50% 50%);
  opacity: 1;
}
.circle-backward-leave-from {
  clip-path: circle(0% at 50% 50%);
  opacity: 1;
}
.circle-backward-leave-to {
  clip-path: circle(150% at 50% 50%);
  opacity: 0;
}
</style>
