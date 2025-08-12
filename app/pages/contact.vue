<script setup lang="ts"></script>

<template>
  <section class="container px-4 py-16 max-w-3xl mx-auto">
    <h1 class="text-center text-5xl font-extrabold mb-8 tracking-wide drop-shadow-md">Kontakt</h1>
    <p class="text-center text-lg leading-relaxed mb-12">
      Du möchtest mit mir zusammenarbeiten oder hast Fragen? <br />
      Ich freue mich auf deine Nachricht!
    </p>

    <ul class="mx-auto max-w-md space-y-6 border p-8 rounded-md backdrop-blur-sm">
      <li class="flex items-center space-x-4 text-lg">
        <Icon name="mdi-email" class="h-6 w-6 text-accent flex-shrink-0" />
        <span>
          <strong>E-Mail: </strong>
          <a href="mailto:svenja.galla@protonmail.com" class="underline hover:text-accent transition">svenja.galla@protonmail.com</a>
        </span>
      </li>

      <li class="flex items-center space-x-4 text-lg">
        <Icon name="mdi-map-marker" class="h-6 w-6 text-accent flex-shrink-0" />
        <span>
          <strong>Standort:</strong> NRW, Deutschland –
          <span class="italic">remote verfügbar</span>
        </span>
      </li>

      <li class="flex items-center space-x-4 text-lg">
        <Icon name="mdi-calendar-check" class="h-6 w-6 text-accent flex-shrink-0" />
        <span> <strong>Verfügbarkeit:</strong> Ab Oktober 2025 </span>
      </li>
    </ul>
  </section>
</template>
