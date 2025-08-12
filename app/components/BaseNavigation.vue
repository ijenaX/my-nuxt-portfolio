<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <header class="py-4 mb-12">
    <nav class="w-full px-8 flex items-center justify-between fixed z-50 text-white">
      <div class="flex flex-col">
        <NuxtLink to="/home">
          <NuxtImg width="208" densities="x1" src="/logo/Lockup-Dark-Background.png" format="webp" alt="" />
        </NuxtLink>
        <p class="mt-2 text-sm">Full Stack Entwickler</p>
      </div>

      <!-- Desktop Version -->
      <ul class="hidden md:flex gap-6 text-xl capitalize">
        <li><NuxtLink to="/home" class="hover:text-accent">Home</NuxtLink></li>
        <li><NuxtLink to="/techstack" class="hover:text-accent">Tech Stack</NuxtLink></li>
        <li><NuxtLink to="/cv" class="hover:text-accent">Lebenslauf</NuxtLink></li>
        <li><NuxtLink to="/faq" class="hover:text-accent">FAQ</NuxtLink></li>
        <li><NuxtLink to="/contact" class="hover:text-accent">Kontakt</NuxtLink></li>
      </ul>

      <!-- Mobile Version -->
      <button class="md:hidden text-3xl focus:outline-none" @click="toggleMenu">
        <Icon :name="isMenuOpen ? 'mdi:close' : 'mdi:menu'" />
      </button>
    </nav>

    <transition name="fade">
      <div v-if="isMenuOpen" class="fixed top-0 left-0 w-full h-screen bg-black/90 text-white flex flex-col items-center justify-center gap-6 text-2xl z-40">
        <NuxtLink to="/home" @click="toggleMenu">Home</NuxtLink>
        <NuxtLink to="/techstack" @click="toggleMenu">Tech Stack</NuxtLink>
        <NuxtLink to="/cv" @click="toggleMenu">Lebenslauf</NuxtLink>
        <NuxtLink to="/faq" @click="toggleMenu">FAQ</NuxtLink>
        <NuxtLink to="/contact" @click="toggleMenu">Kontakt</NuxtLink>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
