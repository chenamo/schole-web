<template>
  <header class="fixed top-0 left-0 w-full text-gray shadow-1xl z-50">
    <div class="container mx-auto flex justify-between items-center p-4 px-4 py-2 rounded-3xl shadow-lg">
      <h1 class="text-xl font-bold backdrop-blur-3xl px-4 py-2 rounded-3xl shadow-lg">
        <a href="#top" @click.prevent="scrollTo('top')">スコレーをすこれ</a>
      </h1>

      <!-- ハンバーガーアイコン -->
      <div class="backdrop-blur-3xl rounded-3xl shadow-lg px-4 py-3 flex items-center space-x-4 md:hidden">
        <button @click="toggleMenu" class="relative w-8 h-8 z-50 focus:outline-none">
          <span :class="['line', isOpen ? 'rotate-45 top-3' : 'top-1']"></span>
          <span :class="['line', isOpen ? 'opacity-0' : 'top-3']"></span>
          <span :class="['line', isOpen ? '-rotate-45 bottom-3' : 'bottom-1']"></span>
        </button>
      </div>

      <!-- PCメニュー -->
      <nav class="hidden md:flex backdrop-blur-3xl px-4 py-2 rounded-3xl shadow-lg">
        <ul class="flex space-x-6 text-sm md:text-lg">
          <li><a href="#about" @click.prevent="scrollTo('about')" class="hover:underline">About Us</a></li>
          <li><a href="#events" @click.prevent="scrollTo('events')" class="hover:underline">Events</a></li>
          <li><a href="#joinus" @click.prevent="scrollTo('joinus')" class="hover:underline">Join Us</a></li>
        </ul>
      </nav>
    </div>

    <!-- モバイルメニュー（オーバーレイ＋スライド） -->
    <transition name="fade">
      <div v-if="menuVisible" class="fixed inset-0 z-40 backdrop-blur-3xl" @click.self="closeMenu">
        <transition name="slide-in">
          <div v-show="isOpen" class="absolute top-0 right-0 h-full w-64 bg-gray-900 text-white p-6 shadow-lg z-50">
            <ul class="flex flex-col space-y-4 text-lg mt-8">
              <li><a href="#about" @click.prevent="scrollTo('about')" class="hover:underline">About Us</a></li>
              <li><a href="#events" @click.prevent="scrollTo('events')" class="hover:underline">Events</a></li>
              <li><a href="#joinus" @click.prevent="scrollTo('joinus')" class="hover:underline">Join Us</a></li>
            </ul>
          </div>
        </transition>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const isOpen = ref(false)
const menuVisible = ref(false)

const toggleMenu = () => {
  if (!isOpen.value) {
    menuVisible.value = true
    requestAnimationFrame(() => {
      isOpen.value = true
    })
  } else {
    isOpen.value = false
    setTimeout(() => {
      menuVisible.value = false
    }, 400)
  }
}

const closeMenu = () => {
  isOpen.value = false
  setTimeout(() => {
    menuVisible.value = false
  }, 400)
}

watch(isOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  closeMenu()
}

useHead({
  script: [
    {
      src: 'https://glass.danilofiumi.com/web-comps/boundle.js',
      tagPriority: 1,
      type: "module",
      crossorigin: 'anonymous',
    },
  ],
})
</script>

<style scoped>
header {
  font-family: "DotGothic16", sans-serif;
  font-weight: 400;
}

/* ハンバーガーアイコン線 */
.line {
  position: absolute;
  width: 100%;
  height: 3px;
  background-color: #111;
  transition: all 0.3s ease;
  left: 0;
  border-radius: 2px;
}
.top-1 {
  top: 0.3rem;
}
.top-3 {
  top: 0.75rem;
}
.bottom-1 {
  bottom: 0.3rem;
}
.bottom-3 {
  bottom: 0.75rem;
}

/* フェード */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

/* スライドイン（右から） */
.slide-in-enter-from {
  transform: translateX(100%);
}
.slide-in-enter-to {
  transform: translateX(0%);
}
.slide-in-leave-from {
  transform: translateX(0%);
}
.slide-in-leave-to {
  transform: translateX(100%);
}
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.4s ease;
}
</style>
