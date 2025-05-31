<script setup lang="ts">
const year = new Date().getFullYear();
</script>
<template>
  <footer class="text-sm text-gray-300 px-2 py-2">
    <div class="mx-8 flex justify-between items-center">
      <!-- Text links -->
      <div>
        <p class="text-xs">© {{ year }} – Alle Rechte vorbehalten</p>
      </div>

      <!-- Icons rechts -->
      <div class="flex gap-4 text-xl">
        <a href="https://github.com/deinname" target="_blank" aria-label="GitHub" class="hover:text-accent transition">
          <Icon name="mdi:github" size="1.5em" />
        </a>
        <a href="https://linkedin.com/in/deinname" target="_blank" aria-label="LinkedIn" class="hover:text-accent transition">
          <Icon name="mdi:linkedin" size="1.5em" />
        </a>
        <a href="mailto:dein@email.de" aria-label="Email" class="hover:text-accent transition">
          <Icon name="mdi:email-outline" size="1.5em" />
        </a>
      </div>
    </div>
  </footer>
</template>
