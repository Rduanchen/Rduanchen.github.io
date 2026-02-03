<script setup>
import { ref, onMounted } from 'vue';

const isDark = ref(false);

onMounted(() => {
  const theme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  isDark.value = theme === 'dark' || (!theme && systemTheme);
  
  if (isDark.value) document.documentElement.classList.add('dark');
});

function toggleTheme() {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}
</script>

<template>
  <button 
    @click="toggleTheme" 
    class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
    aria-label="Toggle theme"
  >
    <span v-if="!isDark">🌞</span>
    <span v-else>🌙</span>
  </button>
</template>