<script setup>
defineProps(['profile'])
</script>

<template>
  <section v-if="profile" class="max-w-6xl mx-auto px-4 py-32 relative">
    <!-- Decorative Pattern -->
    <div class="absolute -top-10 -left-10 w-40 h-40 bg-soft-pink/10 rounded-full blur-3xl"></div>
    
    <h2 class="section-title mb-20">SIAPA SAYA?</h2>
    
    <div class="grid lg:grid-cols-2 gap-20 items-center">
      <div class="relative group">
        <!-- Floating Sticker -->
        <div class="absolute -top-12 -left-8 z-20 bg-soft-yellow border-4 border-black px-4 py-2 font-black rounded-xl rotate-[-15deg] group-hover:rotate-0 transition-transform">
            👋 HELLO!
        </div>

        <!-- Polaroid Frame -->
        <div class="relative z-10 bg-white p-6 pb-20 border-4 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] rounded-sm rotate-3 transition-all hover:rotate-0 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
          <div class="aspect-square bg-neutral-900 overflow-hidden relative border-4 border-black">
            <img v-if="profile.photoUrl" :src="profile.photoUrl" :alt="profile.name" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            <div v-else class="w-full h-full bg-neutral-900 flex items-center justify-center text-4xl font-black italic">NO PHOTO</div>
          </div>
          <div class="mt-8 text-center">
              <p class="font-black text-black text-2xl uppercase tracking-widest">{{ profile.name }}</p>
              <p class="text-black/50 font-bold italic text-sm mt-2">EST. 2004 — INDONESIA</p>
          </div>
        </div>

        <!-- Decorative Circle Behind -->
        <div class="absolute -bottom-10 -right-10 w-48 h-48 border-8 border-soft-blue rounded-full -z-10 opacity-50"></div>
      </div>

      <div class="space-y-10">
        <div class="relative">
            <h3 class="text-3xl font-black text-soft-green mb-4 inline-block underline decoration-4 decoration-white">PROFIL SINGKAT</h3>
            <div class="text-xl md:text-2xl leading-relaxed font-medium text-white/90 bg-neutral-900/50 p-8 rounded-3xl border-2 border-white/10" v-html="profile.description"></div>
        </div>

        <div class="relative">
            <div class="squiggle mb-6 opacity-30"></div>
            <div class="text-lg md:text-xl leading-relaxed text-white/70 italic border-l-4 border-soft-pink pl-6" v-html="profile.bio"></div>
        </div>
      </div>
    </div>
  </section>
</template>
