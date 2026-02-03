<script setup>
import { ref } from 'vue';
import ThemeToggle from "./ThemeToggle.vue";

// 1. 接收外部傳入的當前語言 (預設為 'en')
const props = defineProps({
  currentLang: {
    type: String,
    default: 'en'
  }
});

const isOpen = ref(false);
const isLangMenuOpen = ref(false);

// 2. 修正切換語言的邏輯
const switchLang = (targetLang) => {
  const currentPath = window.location.pathname;
  
  // 如果目標語言跟現在一樣，就什麼都不做
  if (targetLang === props.currentLang) {
    isLangMenuOpen.value = false;
    return;
  }

  // 邏輯 A: 切換到中文 (zh-tw)
  if (targetLang === 'zh-tw') {
    // 如果現在是首頁 (/) -> /zh-tw/
    if (currentPath === '/' || currentPath === '') {
      window.location.href = '/zh-tw/';
    } else {
      // 其他頁面：在路徑前加上 /zh-tw
      // 確保不要重複加，先移除可能的舊前綴 (雖然理論上 currentLang check 已經擋掉)
      window.location.href = `/zh-tw${currentPath}`;
    }
  } 
  
  // 邏輯 B: 切換到英文 (en)
  else if (targetLang === 'en') {
    // 移除 URL 中的 /zh-tw
    // 例如 /zh-tw/projects -> /projects
    // 例如 /zh-tw/ -> /
    const newPath = currentPath.replace('/zh-tw', '') || '/';
    window.location.href = newPath;
  }

  isLangMenuOpen.value = false;
};

// 導航連結 (這裡先寫死，如果要更完美也可以透過 props 傳入翻譯好的連結)
const navLinks = [
  { name: 'Home', href: props.currentLang === 'zh-tw' ? '/zh-tw/' : '/' },
  { name: 'Projects', href: '#projects' }, // 錨點通常不變
  { name: 'Blogs', href: '#blogs' },
  { name: 'Contact', href: '#contact' },
];
</script>

<template>
  <nav class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        
        <!-- Logo -->
        <div class="flex-shrink-0">
          <!-- Logo 連結也要根據語言調整 -->
          <a :href="currentLang === 'zh-tw' ? '/zh-tw/' : '/'" class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Rduan's <span class="text-blue-600">Portfolio</span>
          </a>
        </div>

        <!-- Desktop Menu -->
        <!-- <div class="hidden md:block">
          <ul class="flex items-baseline space-x-8">
            <li v-for="link in navLinks" :key="link.name">
              <a :href="link.href" class="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-300 dark:hover:text-blue-400">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div> -->

        <!-- Right Side -->
        <div class="flex items-center gap-2">
          <ThemeToggle />

          <!-- Language Switcher -->
          <div class="relative">
            <button 
              @click="isLangMenuOpen = !isLangMenuOpen"
              class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700 transition-colors"
            >
              <!-- 顯示當前語言 -->
              <span>{{ currentLang === 'zh-tw' ? '繁體中文' : 'English' }}</span>
              <span>🌐</span>
            </button>
            
            <div v-if="isLangMenuOpen" class="absolute right-0 mt-2 w-32 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-md shadow-lg py-1 z-50">
              <button @click="switchLang('en')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800">
                English
              </button>
              <button @click="switchLang('zh-tw')" class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800">
                繁體中文
              </button>
            </div>
          </div>

          <!-- Mobile Hamburger (略，與原本相同) -->
           <!-- <div class="flex md:hidden">
            <button 
              @click="isOpen = !isOpen" 
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-zinc-800"
            >
              <span class="sr-only">Open main menu</span>
              <svg v-if="!isOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div> -->
        </div>
      </div>
    </div>
    
    <!-- Mobile Menu (記得更新連結) -->
    <!-- <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isOpen" class="md:hidden bg-white dark:bg-zinc-950 border-b dark:border-zinc-800">
        <div class="space-y-1 px-4 pb-3 pt-2">
          <a 
            v-for="link in navLinks" 
            :key="link.name" 
            :href="link.href" 
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-zinc-900"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </Transition> -->
  </nav>
</template>