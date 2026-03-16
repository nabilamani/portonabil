<script setup>
import gsap from 'gsap'
defineProps(['profile'])

onMounted(() => {
    // Sticker Rotation Loop
    gsap.to('.about-sticker', {
        rotate: 15,
        yoyo: true,
        repeat: -1,
        duration: 1.5,
        ease: 'sine.inOut'
    })

    // Morph Shape Animation
    gsap.set('.about-morph-circle', { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' })
    gsap.to('.about-morph-circle', {
        borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
        rotate: 360,
        duration: 8,
        ease: 'linear',
        repeat: -1
    })
})
</script>

<template>
  <section v-if="profile" class="max-w-6xl mx-auto px-4 py-16 md:py-32 relative">
    <!-- Decorative Pattern -->
    <div class="absolute -top-10 -left-10 w-40 h-40 bg-soft-pink/10 rounded-full blur-3xl"></div>
    
    <h2 class="section-title mb-12 md:mb-20 reveal-text">SIAPA SAYA?</h2>
    
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <div class="relative group reveal-text">
        <!-- Floating Sticker (Animated via GSAP) -->
        <div class="about-sticker absolute -top-12 -left-8 z-20 bg-soft-yellow border-4 border-black px-4 py-2 font-black rounded-xl rotate-[-15deg]">
            👋 HELLO!
        </div>

        <!-- Polaroid Frame -->
        <div class="relative z-10 bg-white p-4 md:p-6 pb-16 md:pb-20 border-[3px] md:border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] rounded-sm rotate-3 transition-all hover:rotate-0 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div class="aspect-square bg-neutral-900 overflow-hidden relative border-4 border-black">
            <img v-if="profile.photoUrl" :src="profile.photoUrl" :alt="profile.name" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            <div v-else class="w-full h-full bg-neutral-900 flex items-center justify-center text-4xl font-black italic">NO PHOTO</div>
          </div>
          <div class="mt-8 text-center">
              <p class="font-black text-black text-2xl uppercase tracking-widest">{{ profile.name }}</p>
              <p class="text-black/50 font-bold italic text-sm mt-2">EST. 2004 — INDONESIA</p>
          </div>
        </div>

        <!-- Decorative Morphing Circle Behind -->
        <div class="about-morph-circle absolute -bottom-10 -right-10 w-48 h-48 border-8 border-soft-blue -z-10 opacity-50"></div>
      </div>

      <div class="space-y-10">
        <div class="relative reveal-text">
            <h3 class="text-2xl md:text-3xl font-black text-soft-green mb-4 relative inline-block">
              PROFIL SINGKAT
              <!-- Line Drawing under heading (using CSS transition trigger logic) -->
              <svg class="absolute w-[110%] h-[120%] -left-[5%] top-0 -z-10 pointer-events-none" viewBox="0 0 200 40" preserveAspectRatio="none">
                <path class="draw-path" d="M10,35 Q 100,25 190,35" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" />
              </svg>
            </h3>
            <div class="text-lg md:text-2xl leading-relaxed font-medium text-white/90 bg-neutral-900/50 p-6 md:p-8 rounded-2xl md:rounded-3xl border-2 border-white/10" v-html="profile.description"></div>
        </div>

        <div class="relative reveal-text">
            <div class="squiggle mb-6 opacity-30"></div>
            <div class="text-lg md:text-xl leading-relaxed text-white/70 italic border-l-4 border-soft-pink pl-6" v-html="profile.bio"></div>
        </div>
      </div>
    </div>
  </section>
</template>
