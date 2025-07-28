<template>
  <header class="fixed top-0 left-0 w-full text-gray shadow-1xl z-50">
    <div class="container mx-auto flex justify-between items-center p-4 px-4 py-2 rounded-3xl shadow-lg">
      <!--<sv-liquid-glass styles='{"style":{"roundness":50,"padding_x":1,"padding_y":2},"text":{"content":"スコレーをすこれ","edit":false,"font_family":"Inter","size_weight":500,"font_size":3.5},"color":{"accent":"#D7DADD"}}' contrast="dark"></sv-liquid-glass>-->
      <h1 class="text-xl font-bold backdrop-blur-3xl px-4 py-2 rounded-3xl shadow-lg"><a href="#top" @click.prevent="scrollTo('top')">スコレーをすこれ</a></h1>

      <!-- ハンバーガー / クローズボタン -->
      <div class="backdrop-blur-3xl rounded-3xl shadow-lg px-4 py-3 flex items-center space-x-4">
      <button @click="toggleMenu" class="md:hidden focus:outline-none z-50 relative w-6 h-6">
        <span :class="['block w-6 h-0.5 bg-gray-900 absolute transition-transform duration-300', isOpen ? 'rotate-45 top-2.5' : 'top-1']"></span>
        <span :class="['block w-6 h-0.5 bg-gray-900 absolute transition-opacity duration-300', isOpen ? 'opacity-0' : 'top-2.5']"></span>
        <span :class="['block w-6 h-0.5 bg-gray-900 absolute transition-transform duration-300', isOpen ? '-rotate-45 bottom-2.5' : 'bottom-1']"></span>
      </button>
      </div>

      <!-- PC メニュー -->
      <nav class="hidden md:flex backdrop-blur-3xl px-4 py-2 rounded-3xl shadow-lg">
        <ul class="flex space-x-6 text-sm md:text-lg">
          
          <li><a href="#about" @click.prevent="scrollTo('about')" class="hover:underline">About Us</a></li>
          <li><a href="#events" @click.prevent="scrollTo('events')" class="hover:underline">Events</a></li>
          <li><a href="#joinus" @click.prevent="scrollTo('joinus')" class="hover:underline">Join Us</a></li>
          
        </ul>
      </nav>
    </div>

    <!-- モバイル オーバーレイ -->
    <transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40 backdrop-blur-3xl"
        @click.self="closeMenu"
      >
        <!-- ドロワーメニュー -->
        <transition name="slide">
          <div class="absolute top-0 right-0 h-full w-64 bg-gray-900 text-white p-6 shadow-lg z-50">
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

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

// スクロール制御：メニューが開いてるときはbodyのスクロールを禁止
watch(isOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
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
  font-family: "Bitcount", system-ui;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-variation-settings:
    "slnt" 0,
    "CRSV" 0.5,
    "ELSH" 0,
    "ELXP" 0;
}
header {
  font-family: "DotGothic16", sans-serif;
  font-weight: 400;
  font-style: normal;
}
/* オーバーレイフェード */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

/* ドロワースライド */
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

/* ハンバーガーアイコン用の top/bottom 位置 */
span.top-1 {
  top: 0.25rem;
}
span.top-2\.5 {
  top: 0.625rem;
}
span.bottom-1 {
  bottom: 0.25rem;
}
span.bottom-2\.5 {
  bottom: 0.625rem;
}
</style>
