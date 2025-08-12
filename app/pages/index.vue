<script setup lang="ts">
definePageMeta({
  layout: 'landing-page',
});
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center px-4 sm:px-8">
    <div class="flex flex-col items-center max-w-screen-sm text-center">
      <h1 class="text-4xl sm:text-6xl break-words">Willkommen auf Svenjas Portfolio</h1>
      <h2 class="text-xl sm:text-2xl mb-12">Full Stack Developer</h2>
    </div>
    <NuxtLink to="/home" class="text-white hover:text-white hover:border-accent border border-white hover:bg-accent font-bold text-lg px-5 py-2.5 text-center transition flex items-center">
      <span class="h-full flex items-center justify-center">
        <img class="w-5 hover:opacity-80 transition-opacity duration-200 mr-2" src="/logo/Icon-Color.png" />
        <p>Öffnen</p>
      </span>
    </NuxtLink>
  </div>
</template>
