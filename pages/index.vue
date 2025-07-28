<template>
  <section
    id="firstvisual"
    class="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center"
    style="background-image: url('/img/mainvisual.jpg');"
  >
    <!-- SVG タイトル -->
    <svg
      class="w-[90%] max-w-4xl h-auto"
      viewBox="0 0 800 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        class="svg-title"
      >
        スコレーをすこれ
      </text>
    </svg>

    <!-- サブタイトル（後からフェードイン） -->
    <p class="text-xl sm:text-2xl mt-6 opacity-0 animate-fadein-delay">
      知的探究心を共に刺激し合う
    </p>
  </section>
  <main class="container mx-auto py-8 px-4 flex flex-col items-center">
    <div class="w-full max-w-3xl">
      <About />
      <Events />
      <JoinUs />
      <Links />
    </div>
  </main>
</template>

<script lang="ts" setup>

</script>

<style scoped>
  html {
  scroll-behavior: smooth;
  }
  body {
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
body {
  font-family: "DotGothic16", sans-serif;
  font-weight: 400;
  font-style: normal;
}


/* SVG アニメーション */
.svg-title {
  font-size: 48px;
  font-family: 'Caveat', 'Yu Mincho', serif;
  stroke: white;
  stroke-width: 1.5px;
  fill: none;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: handwriting 4s ease-out forwards;
  animation-delay: 1s;
    font-family: 'Caveat', cursive;
}

@keyframes handwriting {
  to {
    stroke-dashoffset: 0;
  }
}

/* サブタイトルフェードイン（遅延付き） */
@keyframes fadein {
  to {
    opacity: 1;
  }
}

.animate-fadein-delay {
  animation: fadein 1s ease forwards;
  animation-delay: 2s; /* SVGのアニメーション完了後に出す */
}
</style>