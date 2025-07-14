<script setup lang="ts"></script>

<template>
  <section class="container mx-auto max-w-7xl flex justify-center items-center gap-8 px-4 pt-14">
    <!-- Textblock -->
    <div class="flex-1 max-w-2xl">
      <h1 class="leading-tight">Willkommen in meinem Portfolio</h1>
      <p class="text-xl leading-relaxed mb-8">
        Ich bin Svenja, Softwareentwicklerin aus NRW. <br />
        Digitale Gestalterin mit klarem Blick für das Zusammenspiel von Form und Funktion. Ich gestalte, entwickle und verbinde Welten. Neugier treibt mich, Vielfalt inspiriert mich.
      </p>
      <div class="flex gap-4">
        <NuxtLink to="/techstack" class="flex items-center gap-2 px-6 py-3 font-bold text-accent hover:bg-accent hover:text-white transition"><Icon name="mdi:arrow-top-right" />Tech Stack</NuxtLink>
        <NuxtLink to="/contact" class="flex items-center gap-2 px-6 py-3 font-bold text-accent hover:bg-accent hover:text-white transition"><Icon name="mdi:arrow-top-right" />Kontakt</NuxtLink>
      </div>
    </div>

    <!-- Bildblock -->
    <div class="flex flex-1 justify-center py-6">
      <NuxtImg src="/images/galla-bust-website.png" width="290" format="webp" alt="Roman Bust with Svenjas face" class="transform -scale-x-100" />
    </div>
  </section>
</template>
