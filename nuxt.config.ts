// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', 'nuxt-auth-utils'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
    tursoUrl: process.env.TURSO_DB_URL,
    tursoToken: process.env.TURSO_DB_AUTH_TOKEN,
  },
  app: {
    head: {
      title: 'Muhammad Nabil Amani | Portfolio',
      meta: [
        { name: 'description', content: 'Portfolio of Muhammad Nabil Amani - Web Developer & UI/UX Designer' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;700;900&display=swap' }
      ]
    }
  }
})
