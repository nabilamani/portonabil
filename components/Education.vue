<script setup>
defineProps(['education', 'organizations', 'certifications'])
</script>

<template>
  <section v-if="education" class="max-w-6xl mx-auto px-4 py-32 space-y-40">
    <div>
        <h2 class="section-title mb-24 reveal-text">PENDIDIKAN</h2>
        <div class="grid md:grid-cols-2 gap-16">
          <div v-for="item in education" :key="item.id" class="brutalist-card card-blue bg-neutral-900 group overflow-visible reveal-text">
            <div class="absolute -top-4 -left-4 w-12 h-12 bg-soft-blue border-4 border-black rounded-full flex items-center justify-center text-2xl z-20">🎓</div>
            <h3 class="text-3xl mb-4 pt-4">{{ item.institution }}</h3>
            <p class="font-bold text-soft-purple text-xl mb-6">{{ item.degree }} <span v-if="item.gpa" class="text-white/40 block md:inline md:ml-2">| IPK {{ item.gpa }}</span></p>
            <div class="bg-white text-black px-4 py-1 inline-block font-black rounded-lg skew-x-[-10deg]">{{ item.period }}</div>
          </div>
        </div>
    </div>

    <!-- ORGANIZATIONS -->
    <div v-if="organizations?.length">
      <h2 class="section-title mb-24 bg-soft-yellow reveal-text">ORGANISASI</h2>
      <div class="grid md:grid-cols-3 gap-10">
        <div v-for="org in organizations" :key="org.id" class="brutalist-card card-yellow bg-neutral-900 hover:rotate-2 transition-transform reveal-text">
          <p class="text-soft-yellow font-black mb-4 tracking-tighter">{{ org.period }}</p>
          <h3 class="text-2xl mb-2">{{ org.org }}</h3>
          <p class="font-bold opacity-60 uppercase text-xs tracking-widest text-soft-pink">{{ org.role }}</p>
        </div>
      </div>
    </div>

    <!-- CERTIFICATIONS -->
    <div v-if="certifications?.length">
      <h2 class="section-title mb-24 bg-soft-purple text-white border-white reveal-text">SERTIFIKASI</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="item in certifications" :key="item.id" class="brutalist-card card-pink bg-neutral-900 group hover:bg-soft-pink transition-colors reveal-text">
          <p class="text-sm font-black text-white/50 group-hover:text-black/50">{{ item.date }}</p>
          <h4 class="text-xl font-black mt-4 underline decoration-2 underline-offset-4 group-hover:text-black">{{ item.title }}</h4>
          <p class="text-sm mt-6 font-bold group-hover:text-black/70">{{ item.issuer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
