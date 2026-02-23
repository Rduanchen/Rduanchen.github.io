<script setup>
import { ref } from "vue";
import ThemeToggle from "./ThemeToggle.vue";

// 1. 接收外部傳入的當前語言 (預設為 'en')
const props = defineProps({
  currentLang: {
    type: String,
    default: "en",
  },
});

const isOpen = ref(false);
const isLangMenuOpen = ref(false);
const isZh = props.currentLang === "zh-tw";
const homeHref = isZh ? "/zh-tw/" : "/";
const portfolioHref = isZh ? "/zh-tw/projects/" : "/projects/";

// 2. 修正切換語言的邏輯
const switchLang = (targetLang) => {
  const currentPath = window.location.pathname;

  // 如果目標語言跟現在一樣，就什麼都不做
  if (targetLang === props.currentLang) {
    isLangMenuOpen.value = false;
    return;
  }

  // 邏輯 A: 切換到中文 (zh-tw)
  if (targetLang === "zh-tw") {
    // 如果現在是首頁 (/) -> /zh-tw/
    if (currentPath === "/" || currentPath === "") {
      window.location.href = "/zh-tw/";
    } else {
      // 其他頁面：在路徑前加上 /zh-tw
      // 確保不要重複加，先移除可能的舊前綴 (雖然理論上 currentLang check 已經擋掉)
      window.location.href = `/zh-tw${currentPath}`;
    }
  }

  // 邏輯 B: 切換到英文 (en)
  else if (targetLang === "en") {
    // 移除 URL 中的 /zh-tw
    // 例如 /zh-tw/projects -> /projects
    // 例如 /zh-tw/ -> /
    const newPath = currentPath.replace("/zh-tw", "") || "/";
    window.location.href = newPath;
  }

  isLangMenuOpen.value = false;
};

const navLinks = [
  { name: isZh ? "首頁" : "Home", href: homeHref, icon: "mdi-home-outline" },
  {
    name: isZh ? "專題研究" : "Projects",
    href: portfolioHref,
    icon: "mdi-briefcase-variant-outline",
  },
];
</script>

<template>
  <nav
    class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <!-- Logo 連結也要根據語言調整 -->
          <a
            :href="homeHref"
            class="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            <img
              src="/icon.png"
              alt="Rduan logo"
              class="h-8 w-8 rounded-md object-cover ring-1 ring-black/10 dark:ring-white/20"
            />
            Rduan's <span class="text-blue-600">Portfolio</span>
          </a>
        </div>

        <div class="hidden md:block">
          <ul class="flex items-center gap-2">
            <li v-for="link in navLinks" :key="link.name">
              <a
                :href="link.href"
                class="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <i :class="['mdi text-base', link.icon]" />
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Right Side -->
        <div class="flex items-center gap-2">
          <ThemeToggle />

          <!-- Language Switcher -->
          <div class="relative hidden md:block">
            <button
              @click="isLangMenuOpen = !isLangMenuOpen"
              class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700 transition-colors"
            >
              <i class="mdi mdi-translate text-base" />
              <!-- 顯示當前語言 -->
              <span>{{
                currentLang === "zh-tw" ? "繁體中文" : "English"
              }}</span>
            </button>

            <div
              v-if="isLangMenuOpen"
              class="absolute right-0 mt-2 w-32 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-md shadow-lg py-1 z-50"
            >
              <button
                @click="switchLang('en')"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                English
              </button>
              <button
                @click="switchLang('zh-tw')"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                繁體中文
              </button>
            </div>
          </div>

          <div class="flex md:hidden">
            <button
              @click="isOpen = !isOpen"
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-zinc-800"
            >
              <span class="sr-only">Open main menu</span>
              <i v-if="!isOpen" class="mdi mdi-menu text-2xl" />
              <i v-else class="mdi mdi-close text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isOpen"
        class="md:hidden border-b border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div class="space-y-1 px-4 pb-3 pt-2">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-zinc-900"
            @click="isOpen = false"
          >
            <i :class="['mdi text-lg', link.icon]" />
            {{ link.name }}
          </a>
          <div class="mt-2 border-t border-gray-200 pt-2 dark:border-zinc-800">
            <button
              @click="switchLang('en')"
              class="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-zinc-900"
            >
              English
            </button>
            <button
              @click="switchLang('zh-tw')"
              class="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-zinc-900"
            >
              繁體中文
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>
