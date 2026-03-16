<script setup>
import gsap from 'gsap'
import { Sparkles } from 'lucide-vue-next'

const props = defineProps(['profile'])

// Mengamankan pemrosesan nama agar tidak crash jika nilainya null/undefined
// Kita ubah menjadi array of characters untuk animasi 'Split Text'
const firstNameChars = computed(() => {
  if (!props.profile?.name) return 'MUHAMMAD'.split('')
  return props.profile.name.split(' ')[0].split('')
})

const lastNameChars = computed(() => {
  if (!props.profile?.name) return 'NABIL AMANI'.split('')
  const parts = props.profile.name.split(' ')
  return parts.slice(1).join(' ').split('')
})

onMounted(() => {
  // Kinetic Typography GSAP Animation Timeline
  const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.5 } })

  tl.from('.hero-badge', { y: -30, opacity: 0, duration: 1 }, 0.2)
    // Stagger Text & Split Text Reveal First Name
    .from('.char-first', { 
      y: '100%',
      rotationZ: 10,
      rotationX: -90,
      opacity: 0,
      stagger: 0.04,
      transformOrigin: '50% 100%',
    }, 0.3)
    // Stagger Text & Split Text Reveal Last Name
    .from('.char-last', { 
      y: '-100%',
      rotationZ: -10,
      rotationX: 90,
      opacity: 0,
      stagger: 0.04,
      transformOrigin: '50% 0%',
    }, 0.5)
    // Scale & Reveal Desc
    .from('.hero-desc', { x: -30, opacity: 0, duration: 1 }, "-=1.0")
    // Bounce Stack Cards
    .from('.hero-stack-card', { 
      scale: 0.5, 
      rotation: 5,
      opacity: 0, 
      stagger: 0.2,
      ease: 'back.out(1.5)',
      duration: 1
    }, "-=0.8")
    .from('.scroll-indicator', { opacity: 0, y: -20 }, "-=0.5")
})
</script>

<template>
  <section v-if="profile" class="min-h-screen flex flex-col justify-center relative px-4">
    <!-- Playful Background Shapes -->
    <div class="absolute top-20 right-[10%] w-32 h-32 bg-soft-purple rounded-full blur-3xl opacity-30 animate-pulse"></div>
    <div class="absolute bottom-40 left-[5%] w-64 h-64 bg-soft-blue rounded-full blur-3xl opacity-20"></div>
    
    <!-- Floating Bricks -->
    <div class="absolute top-40 right-[20%] w-24 h-24 border-4 border-white rotate-12 rounded-3xl hidden md:block animate-bounce" style="animation-duration: 4s"></div>
    <div class="absolute bottom-20 right-[40%] w-16 h-16 bg-soft-yellow border-4 border-black -rotate-12 rounded-2xl hidden md:block"></div>

    <div class="relative z-10">
        <div class="hero-badge inline-flex items-center gap-2 px-4 py-1.5 md:px-6 md:py-2 bg-soft-green border-[3px] md:border-4 border-black text-black font-black uppercase text-sm md:text-lg rounded-full mb-6 md:mb-8 transform -rotate-2 hover:rotate-0 transition-transform cursor-default">
            <Sparkles :size="18" class="fill-current" /> AVAILABLE FOR WORK
        </div>
        
        <h1 class="text-5xl sm:text-6xl md:text-[8rem] lg:text-[10rem] leading-[0.85] text-white font-black" style="perspective: 1000px;">
            <div class="hero-name-line overflow-hidden flex flex-wrap">
              <span v-for="(char, i) in firstNameChars" :key="'f'+i" class="char-first inline-block" v-html="char === ' ' ? '&nbsp;' : char"></span>
            </div>
            <div v-if="lastNameChars.length" class="mt-2 md:mt-4">
              <span class="text-soft-purple bg-white border-[3px] md:border-4 border-black px-3 py-1 md:px-6 md:py-3 inline-flex flex-wrap rounded-2xl md:rounded-3xl transform rotate-1 shadow-[6px_6px_0px_0px_rgba(167,139,250,1)] md:shadow-[12px_12px_0px_0px_rgba(167,139,250,1)] overflow-hidden">
                <span v-for="(char, i) in lastNameChars" :key="'l'+i" class="char-last inline-block" v-html="char === ' ' ? '&nbsp;' : char"></span>
              </span>
            </div>
        </h1>
        <div class="hero-desc mt-8 md:mt-12 flex flex-col md:flex-row items-start md:items-center gap-8">
            <p class="text-xl md:text-3xl lg:text-4xl max-w-2xl font-bold leading-tight">
                {{ profile.role || 'Developer' }} based in Indonesia. 
                <span class="text-soft-yellow underline decoration-wavy decoration-2 md:decoration-4">Crafting premium digital experiences.</span>
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
