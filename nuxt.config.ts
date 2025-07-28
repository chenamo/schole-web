// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'スコレーをすこれ',
      meta: [
        { name: 'description', content: 'Discord上で活動する教養・学問好きのためのコミュニティ。学術に気軽に触れたい、でも話す場がない…そんな方に、悩みを共有したり小ネタを楽しんだりできる場所を提供します。' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' }
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bitcount:wght@100..900&family=DotGothic16&Caveat&display=swap",
          crossorigin: "",
        }
    ]}
  }
  
})
