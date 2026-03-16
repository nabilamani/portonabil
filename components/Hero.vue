<script setup>
import gsap from 'gsap'
import { Sparkles } from 'lucide-vue-next'

const props = defineProps(['profile'])

// Mengamankan pemrosesan nama agar tidak crash jika nilainya null/undefined
const firstName = computed(() => {
  if (!props.profile?.name) return 'MUHAMMAD'
  return props.profile.name.split(' ')[0]
})

const lastName = computed(() => {
  if (!props.profile?.name) return 'NABIL AMANI'
  const parts = props.profile.name.split(' ')
  return parts.slice(1).join(' ')
})

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } })

  tl.from('.hero-badge', { y: -20, opacity: 0, duration: 0.8 }, 0.2)
    .from('.hero-name-line', { 
      y: 100, 
      opacity: 0, 
      stagger: 0.2,
      filter: 'blur(20px)' 
    }, 0.4)
    .from('.hero-desc', { x: -30, opacity: 0, duration: 1 }, "-=0.8")
    .from('.hero-stack-card', { 
      scale: 0.8, 
      opacity: 0, 
      stagger: 0.2,
      shadow: 'none'
    }, "-=0.6")
    .from('.scroll-indicator', { opacity: 0, y: -20 }, "-=0.4")
    
  // Line Drawing Animation (delayed slightly so it draws after text appears)
  const path = document.querySelector('.hero-line-draw path')
  if (path) {
    const length = path.getTotalLength()
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    tl.to(path, { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, "-=0.2")
  }

  // Icon Animation (Continuous Rotation)
  gsap.to('.hero-sparkles', {
    rotate: 360,
    duration: 6,
    ease: 'linear',
    repeat: -1
  })

  // Morph Shape Animation (Organic Blobs)
  gsap.set('.morph-shape-1', { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' })
  gsap.to('.morph-shape-1', {
    borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
    duration: 3,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  })

  gsap.set('.morph-shape-2', { borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' })
  gsap.to('.morph-shape-2', {
    borderRadius: '70% 30% 50% 50% / 30% 30% 70% 70%',
    duration: 4,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  })
})
</script>

<template>
  <section v-if="profile" class="min-h-screen flex flex-col justify-center relative px-4">
    <!-- Playful Background Shapes (Morphed by GSAP) -->
    <div class="morph-shape-1 absolute top-20 right-[10%] w-64 h-64 md:w-96 md:h-96 bg-soft-purple blur-3xl opacity-30"></div>
    <div class="morph-shape-2 absolute bottom-40 left-[5%] w-72 h-72 md:w-[500px] md:h-[500px] bg-soft-blue blur-3xl opacity-20"></div>
    
    <!-- Floating Bricks -->
    <div class="absolute top-40 right-[20%] w-24 h-24 border-4 border-white rotate-12 rounded-3xl hidden md:block animate-bounce" style="animation-duration: 4s"></div>
    <div class="absolute bottom-20 right-[40%] w-16 h-16 bg-soft-yellow border-4 border-black -rotate-12 rounded-2xl hidden md:block"></div>

    <div class="relative z-10">
        <div class="hero-badge inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 bg-soft-green border-[3px] md:border-4 border-black text-black font-black uppercase text-sm md:text-lg rounded-full mb-6 md:mb-8 transform -rotate-2 hover:rotate-0 transition-transform cursor-default">
            <Sparkles :size="18" class="hero-sparkles fill-current" /> AVAILABLE FOR WORK
        </div>
        
        <h1 class="text-5xl sm:text-6xl md:text-[8rem] lg:text-[10rem] leading-[0.85] text-white font-black">
            <div class="hero-name-line">{{ firstName }}</div>
            <div v-if="lastName" class="hero-name-line">
              <span class="text-soft-purple bg-white border-[3px] md:border-4 border-black px-3 py-1 md:px-6 md:py-3 inline-block rounded-2xl md:rounded-3xl mt-2 md:mt-4 transform rotate-1 shadow-[6px_6px_0px_0px_rgba(167,139,250,1)] md:shadow-[12px_12px_0px_0px_rgba(167,139,250,1)]">{{ lastName }}</span>
            </div>
        </h1>
        <div class="hero-desc mt-8 md:mt-12 flex flex-col md:flex-row items-start md:items-center gap-8">
            <p class="text-xl md:text-3xl lg:text-4xl max-w-2xl font-bold leading-tight">
                {{ profile.role || 'Developer' }} based in Indonesia.<br class="hidden md:block">
                <span class="relative inline-block mt-2 md:mt-4">
                  <span class="relative z-10 text-soft-yellow">Crafting premium digital experiences.</span>
                  <!-- SVG for Line Drawing Animation -->
                  <svg class="hero-line-draw absolute w-[110%] h-[120%] -left-[5%] -top-[10%] -z-10 pointer-events-none" viewBox="0 0 400 60" preserveAspectRatio="none">
                    <path d="M5,45 Q 200,65 395,20" fill="none" stroke="#FFFF00" stroke-width="8" stroke-linecap="round" />
                  </svg>
                </span>
            </p>
        </div>
        
        <div class="mt-8 md:mt-16 flex flex-wrap gap-4 md:gap-8">
            <div class="hero-stack-card brutalist-card card-purple scale-90 md:scale-95 hover:scale-100">
                <span class="block text-white font-black text-2xl md:text-3xl">PHP & JS</span>
                <span class="text-xs md:text-sm uppercase font-bold opacity-60 italic">Core Stack</span>
            </div>
            <div class="hero-stack-card brutalist-card card-yellow scale-90 md:scale-95 hover:scale-100">
                <span class="block text-white font-black text-2xl md:text-3xl">REACT & LARAVEL</span>
                <span class="text-xs md:text-sm uppercase font-bold opacity-60 italic">Tools of Choice</span>
            </div>
        </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="w-1 h-12 bg-gradient-to-b from-white to-transparent rounded-full"></div>
    </div>
  </section>
  <section v-else class="min-h-screen flex items-center justify-center">
    <p class="text-6xl font-black animate-ping text-soft-purple">LOADING PORTFOLIO...</p>
  </section>
</template>
