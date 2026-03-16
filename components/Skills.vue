<script setup>
const props = defineProps(['skills'])

const hardSkills = computed(() => props.skills?.filter(s => s.category === 'hard') || [])
const softwareSkills = computed(() => props.skills?.filter(s => s.category === 'software') || [])
</script>

<template>
  <section v-if="skills" class="max-w-6xl mx-auto px-4 py-12 md:py-32 relative overflow-hidden">
    <!-- Background Decoration -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-soft-green opacity-5 rounded-full blur-3xl -z-10"></div>
    
    <h2 class="section-title mb-12 md:mb-24 bg-soft-green reveal-text">MY SKILL SET</h2>
    
    <div class="grid md:grid-cols-2 gap-16 lg:gap-20">
      <!-- HARD SKILLS -->
      <div class="brutalist-card card-purple bg-neutral-900 overflow-visible reveal-text">
        <div class="absolute -top-6 -left-2 md:-top-8 md:-left-4 bg-soft-purple text-black border-[3px] md:border-4 border-black px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-base font-black rounded-xl rotate-[-5deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            HARD SKILLS
        </div>
        <div class="flex flex-wrap gap-4 mt-8">
          <span v-for="skill in hardSkills" :key="skill.id" 
            class="px-3 py-1.5 md:px-4 md:py-2 bg-white text-black font-black border-2 border-black rounded-lg md:rounded-xl hover:bg-soft-purple hover:-translate-y-1 transition-all cursor-default shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs md:text-base"
          >
            {{ skill.name }}
          </span>
        </div>
      </div>

      <!-- SOFTWARE SKILLS -->
      <div class="brutalist-card card-yellow bg-neutral-900 overflow-visible reveal-text">
        <div class="absolute -top-8 -right-2 md:-top-10 md:-right-4 bg-soft-yellow text-black border-[3px] md:border-4 border-black px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-base font-black rounded-xl rotate-[5deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            SOFTWARE
        </div>
        <div class="flex flex-wrap gap-4 mt-8">
          <span v-for="skill in softwareSkills" :key="skill.id" 
            class="px-3 py-1.5 md:px-4 md:py-2 bg-white text-black font-black border-2 border-black rounded-lg md:rounded-xl hover:bg-soft-yellow hover:-translate-y-1 transition-all cursor-default shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs md:text-base"
          >
            {{ skill.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
