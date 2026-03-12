<script setup>
defineProps(['profile'])
</script>

<template>
  <section v-if="profile" class="min-h-[80vh] flex flex-col justify-center items-start text-left">
    <div class="bg-accent text-black px-4 py-2 mb-6 font-black uppercase text-xl inline-block -rotate-1">
      AVAILABLE FOR WORK
    </div>
    <h1 class="text-7xl md:text-[10rem] leading-[0.9] text-white">
      {{ profile.name.split(' ')[0] }} <br />
      <span class="text-accent underline decoration-8">{{ profile.name.split(' ').slice(1).join(' ') }}</span>
    </h1>
    <p class="text-2xl md:text-4xl mt-12 max-w-3xl font-bold border-l-8 border-accent pl-8 py-4">
      {{ profile.role }} based in Indonesia.
    </p>
    <div class="mt-16 flex flex-wrap gap-8">
      <div class="brutalist-card">
        <span class="block text-accent font-black text-3xl">PHP & JS</span>
        <span class="text-sm uppercase opacity-70">Core Stack</span>
      </div>
      <div class="brutalist-card">
        <span class="block text-accent-yellow font-black text-3xl">NUXT & LARAVEL</span>
        <span class="text-sm uppercase opacity-70">Frameworks</span>
      </div>
    </div>
  </section>
</template>
