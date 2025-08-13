<script setup lang="ts">
const navHeight = 80;
const footerHeight = 60;
</script>

<template>
  <div style="background-image: url('/images/background-planets.jpg')" class="min-h-screen flex flex-col text-white bg-no-repeat bg-cover bg-right bg-fixed">
    <BaseNavigation />
    <main
      id="modal-target"
      class="relative flex-1 border-transparent xs:border border-white mx-8 py-6 overflow-y-auto"
      :style="{
        minHeight: `calc(100vh - ${navHeight + footerHeight}px)`,
        maxHeight: `calc(100vh - ${navHeight + footerHeight}px)`,
      }"
    >
      <slot />
    </main>
    <BaseFooter />
  </div>
</template>
