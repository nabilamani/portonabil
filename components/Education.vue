<script setup>
defineProps(['education', 'organizations', 'certifications'])
</script>

<template>
  <section v-if="education" class="space-y-20">
    <h2 class="section-title">PENDIDIKAN</h2>
    <div class="grid md:grid-cols-2 gap-12">
      <div v-for="item in education" :key="item.id" class="brutalist-card border-accent">
        <h3 class="text-2xl mb-2">{{ item.institution }}</h3>
        <p class="font-bold opacity-80 mb-4">{{ item.degree }} <span v-if="item.gpa">| IPK {{ item.gpa }}</span></p>
        <p class="text-xl font-black text-accent">{{ item.period }}</p>
      </div>
    </div>

    <!-- ORGANIZATIONS -->
    <div v-if="organizations?.length" class="mt-20">
      <h2 class="section-title">ORGANISASI</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div v-for="org in organizations" :key="org.id" class="brutalist-card bg-neutral-900 border-white">
          <p class="text-accent font-black mb-2">{{ org.period }}</p>
          <h3 class="text-xl mb-1">{{ org.org }}</h3>
          <p class="font-bold opacity-80 uppercase text-xs">{{ org.role }}</p>
        </div>
      </div>
    </div>

    <!-- NON-FORMAL -->
    <div v-if="certifications?.length" class="mt-20">
      <h3 class="text-4xl mb-12 uppercase font-black underline decoration-4 underline-offset-8">Pelatihan & Sertifikasi</h3>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="item in certifications" :key="item.id" class="p-6 border-b-4 border-r-4 border-white bg-neutral-900 group transition-all hover:bg-accent hover:border-black hover:text-black">
          <p class="text-sm opacity-70 group-hover:text-black">{{ item.date }}</p>
          <h4 class="text-lg font-black mt-2 leading-snug">{{ item.title }}</h4>
          <p class="text-xs mt-4 group-hover:text-black/70">{{ item.issuer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
