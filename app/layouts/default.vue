<script setup lang="ts"></script>

<template>
  <div style="background-image: url('/images/background-planets.jpg')" class="min-h-screen flex flex-col text-white bg-no-repeat bg-cover bg-right bg-fixed">
    <BaseNavigation />
    <main id="modal-target" class="relative flex-1 border border-white mx-8 py-6">
      <slot />
    </main>
    <BaseFooter />
  </div>
</template>
