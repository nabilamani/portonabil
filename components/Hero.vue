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
  <section v-if="profile" class="min-h-[80vh] flex flex-col justify-center items-start text-left">
    <div class="bg-accent text-black px-4 py-2 mb-6 font-black uppercase text-xl inline-block -rotate-1">
      AVAILABLE FOR WORK
    </div>
    
    <h1 class="text-7xl md:text-[10rem] leading-[0.9] text-white">
      {{ firstName }} <br />
      <span v-if="lastName" class="text-accent underline decoration-8">{{ lastName }}</span>
    </h1>

    <p class="text-2xl md:text-4xl mt-12 max-w-3xl font-bold border-l-8 border-accent pl-8 py-4">
      {{ profile.role || 'Developer' }} based in Indonesia.
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
  <section v-else class="min-h-[80vh] flex items-center justify-center">
    <p class="text-4xl font-black animate-pulse">MEMUAT DATA...</p>
  </section>
</template>
