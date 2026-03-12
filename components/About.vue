<script setup>
defineProps(['profile'])
</script>

<template>
  <section v-if="profile" class="max-w-5xl">
    <h2 class="section-title">PROFIL</h2>
    <div class="grid md:grid-cols-2 gap-16 items-start">
      <div class="relative">
        <!-- Mock photo space with brutalist border -->
        <div class="aspect-[3/4] bg-white border-8 border-white overflow-hidden -rotate-3 transition-transform hover:rotate-0">
          <div class="w-full h-full bg-neutral-900 flex items-center justify-center text-4xl font-black">PHOTO</div>
        </div>
        <div class="absolute -bottom-8 -right-8 brutalist-card bg-accent-yellow text-black rotate-6">
            <p class="font-black">WEB PROGRAMMER</p>
        </div>
      </div>
      <div class="text-xl leading-relaxed space-y-6">
        <div v-html="profile.description"></div>
        <div v-html="profile.bio"></div>
      </div>
    </div>
  </section>
</template>
