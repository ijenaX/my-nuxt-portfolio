<script setup lang="ts"></script>
<template>
  <header class="py-4 mb-24">
    <nav class="w-screen px-8 flex items-center fixed">
      <div class="flex flex-col">
        <NuxtLink to="/home">
          <NuxtImg width="208" densities="x1" src="/Lockup-Dark-Background.png" format="webp" alt="" />
        </NuxtLink>
        <p class="mt-2">Full Stack Developer</p>
      </div>
      <ul class="flex gap-6 ml-auto text-xl capitalize">
        <li>
          <NuxtLink to="/techstack">Tech Stack</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/projects">Projekte</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/cv">Lebenslauf</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact">FAQ</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact">Kontakt</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
