<script setup lang="ts"></script>

<template>
  <section class="container mx-auto max-w-7xl flex flex-col lg:flex-row justify-center items-center gap-8 px-4 pt-14">
    <!-- Textblock -->
    <div class="max-w-2xl mr-8">
      <h1 class="leading-tight">Full Stack - Vom Bit bis zum Button</h1>
      <p class="text-lg leading-relaxed mb-8">
        Ich bin Svenja. <br />
        Generalistin und digitale Gestalterin. Ich mag es, eine Anwendung als Ganzes zu begreifen, jedes Teil darin sinnvoll zu verknüpfen und habe Freude an komplexen Herausforderungen. Dabei treibt
        mich meine Neugier, Offenheit für Neues und eine klare Lösungsorientierung.
      </p>
      <div class="flex gap-4">
        <NuxtLink to="/techstack" class="flex items-center gap-2 px-6 py-3 font-bold text-accent hover:bg-accent hover:text-white transition"><Icon name="mdi:arrow-top-right" />Tech Stack</NuxtLink>
        <NuxtLink to="/contact" class="flex items-center gap-2 px-6 py-3 font-bold text-accent hover:bg-accent hover:text-white transition"><Icon name="mdi:arrow-top-right" />Kontakt</NuxtLink>
      </div>
    </div>

    <!-- Bildblock -->
    <div class="justify-center py-6">
      <NuxtImg src="/images/galla-bust-website-left.png" width="290" format="webp" alt="Roman Bust with Svenjas face" />
    </div>
  </section>
</template>
