<script setup>
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
</script>

<template>
  <section v-if="profile" class="min-h-screen flex flex-col justify-center relative overflow-hidden px-4">
    <!-- Playful Background Shapes -->
    <div class="absolute top-20 right-[10%] w-32 h-32 bg-soft-purple rounded-full blur-3xl opacity-30 animate-pulse"></div>
    <div class="absolute bottom-40 left-[5%] w-64 h-64 bg-soft-blue rounded-full blur-3xl opacity-20"></div>
    
    <!-- Floating Bricks -->
    <div class="absolute top-40 right-[20%] w-24 h-24 border-4 border-white rotate-12 rounded-3xl hidden md:block animate-bounce" style="animation-duration: 4s"></div>
    <div class="absolute bottom-20 right-[40%] w-16 h-16 bg-soft-yellow border-4 border-black -rotate-12 rounded-2xl hidden md:block"></div>

    <div class="relative z-10">
        <div class="inline-block px-6 py-2 bg-soft-green border-4 border-black text-black font-black uppercase text-lg rounded-full mb-8 transform -rotate-2 hover:rotate-0 transition-transform cursor-default">
            ✨ AVAILABLE FOR WORK
        </div>
        
        <h1 class="text-6xl md:text-[8rem] xl:text-[10rem] leading-[0.85] text-white font-black">
            {{ firstName }}<br />
            <span v-if="lastName" class="text-soft-purple bg-white border-4 border-black px-4 py-2 inline-block rounded-3xl mt-4 transform rotate-1 shadow-[10px_10px_0px_0px_rgba(167,139,250,1)]">{{ lastName }}</span>
        </h1>

        <div class="mt-12 flex flex-col md:flex-row items-start md:items-center gap-8">
            <p class="text-2xl md:text-4xl max-w-2xl font-bold leading-tight">
                {{ profile.role || 'Developer' }} based in Indonesia. 
                <span class="text-soft-yellow underline decoration-wavy decoration-4">Crafting premium digital experiences.</span>
            </p>
        </div>
        
        <div class="mt-16 flex flex-wrap gap-8">
            <div class="brutalist-card card-purple scale-95 hover:scale-100">
                <span class="block text-white font-black text-3xl">PHP & JS</span>
                <span class="text-sm uppercase font-bold opacity-60 italic">Core Stack</span>
            </div>
            <div class="brutalist-card card-yellow scale-95 hover:scale-100">
                <span class="block text-white font-black text-3xl">REACT & LARAVEL</span>
                <span class="text-sm uppercase font-bold opacity-60 italic">Tools of Choice</span>
            </div>
        </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div class="w-1 h-12 bg-gradient-to-b from-white to-transparent rounded-full"></div>
    </div>
  </section>
  <section v-else class="min-h-screen flex items-center justify-center">
    <p class="text-6xl font-black animate-ping text-soft-purple">LOADING PORTFOLIO...</p>
  </section>
</template>
