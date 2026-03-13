<script setup>
import { Building2 } from 'lucide-vue-next'
const props = defineProps(['experiences'])
const colors = ['card-purple', 'card-pink', 'card-yellow', 'card-green', 'card-blue']
</script>

<template>
  <section v-if="experiences" class="max-w-6xl mx-auto px-4 py-12 md:py-20 relative">
    <h2 class="section-title mb-12 md:mb-24 reveal-text">PENGALAMAN KERJA</h2>
    <div class="space-y-12 md:space-y-20">
      <div v-for="(exp, index) in experiences" :key="exp.id" 
        class="brutalist-card bg-neutral-900 border-white group overflow-visible reveal-text"
        :class="colors[index % colors.length]"
      >
        <!-- Floating Period Badge -->
        <div class="absolute -top-5 -right-2 md:-top-6 md:-right-4 bg-white text-black px-3 py-1 md:px-6 md:py-2 text-xs md:text-base font-black border-[3px] md:border-4 border-black rounded-lg md:rounded-xl rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-20">
            {{ exp.period }}
        </div>

        <div class="flex flex-col md:flex-row gap-8 mb-8">
            <div class="w-16 h-16 bg-white border-4 border-black rounded-2xl flex items-center justify-center shrink-0 -rotate-6 group-hover:rotate-0 transition-transform">
                <Building2 :size="32" class="text-black" />
            </div>
            <div>
                <h3 class="text-2xl md:text-4xl text-white mb-2">{{ exp.company }}</h3>
                <p class="text-lg md:text-xl font-bold text-soft-yellow uppercase tracking-widest">{{ exp.role }}</p>
            </div>
        </div>

        <div class="text-lg md:text-xl leading-relaxed text-white/80 border-t-2 border-white/10 pt-6 md:pt-8 whitespace-pre-line">
          {{ exp.description }}
        </div>

        <!-- Decorative dots -->
        <div class="absolute bottom-4 right-4 flex gap-2">
            <div class="w-3 h-3 rounded-full bg-white opacity-20"></div>
            <div class="w-3 h-3 rounded-full bg-white opacity-20"></div>
            <div class="w-3 h-3 rounded-full bg-white opacity-20"></div>
        </div>
      </div>
    </div>
  </section>
</template>
