<script setup>
defineProps(['experiences'])
</script>

<template>
  <section v-if="experiences" class="space-y-20">
    <h2 class="section-title">PENGALAMAN</h2>
    <div class="space-y-12">
      <div v-for="exp in experiences" :key="exp.id" class="brutalist-card bg-neutral-900 border-white hover:bg-neutral-800">
        <div class="flex flex-col md:flex-row justify-between mb-8 pb-4 border-b-2 border-white/20">
          <div>
            <h3 class="text-3xl text-accent">{{ exp.company }}</h3>
            <p class="text-xl font-bold opacity-80 uppercase">{{ exp.role }}</p>
          </div>
          <p class="text-xl font-black bg-white text-black px-4 self-start mt-4 md:mt-0">{{ exp.period }}</p>
        </div>
        <div class="text-lg leading-relaxed whitespace-pre-line">
          {{ exp.description }}
        </div>
      </div>
    </div>
  </section>
</template>
