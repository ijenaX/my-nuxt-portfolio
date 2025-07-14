<script setup lang="ts">
definePageMeta({
  layout: 'landing-page',
});
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center">
    <div class="flex flex-col items-center">
      <h1 class="text-center text-6xl">Willkommen auf Svenjas Portfolio</h1>
      <h2 class="text-2xl mb-12">Software Developer | UX/UI Designer</h2>
    </div>
    <a href="/home" class="text-white hover:text-white hover:border-accent border border-white hover:bg-accent font-bold text-lg px-5 py-2.5 text-center transition">
      <span class="h-full flex items-center justify-center">
        <img class="w-5 hover:opacity-80 transition-opacity duration-200 mr-2" src="/Icon-Color.png" />
        <p>Öffnen</p>
      </span>
    </a>
  </div>
</template>
