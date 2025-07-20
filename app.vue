<template>
  <div>
    <!-- ローディング画面 -->
    <transition name="fade">
      <div
        v-if="isLoading"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900 text-white opacity-90"
      >
        <div class="flex flex-col items-center space-y-4">
          <div class="text-2xl font-semibold"></div>
          <div class="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </transition>

    <!-- 本体 -->
    <div class="header-and-contents bg-gray-100 min-h-screen" id="top">
      <Header />
      <main class="container mx-auto py-8 px-4">
        <NuxtPage />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
// ローディング
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 450) // 表示時間を変更したい場合はここ（ms単位）
})

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* フェードアニメーション */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
</style>
  
<style>
body {
  touch-action: manipulation;
  scroll-behavior: smooth;
}
</style>