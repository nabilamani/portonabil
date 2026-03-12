<script setup>
const props = defineProps(['skills'])

const hardSkills = computed(() => props.skills?.filter(s => s.category === 'hard') || [])
const softwareSkills = computed(() => props.skills?.filter(s => s.category === 'software') || [])
</script>

<template>
  <section v-if="skills" class="max-w-6xl mx-auto px-4 py-32 relative overflow-hidden">
    <!-- Background Decoration -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-soft-green opacity-5 rounded-full blur-3xl -z-10"></div>
    
    <h2 class="section-title mb-24 bg-soft-green">MY SKILL SET</h2>
    
    <div class="grid md:grid-cols-2 gap-20">
      <!-- HARD SKILLS -->
      <div class="brutalist-card card-purple bg-neutral-900 overflow-visible">
        <div class="absolute -top-8 -left-4 bg-soft-purple text-black border-4 border-black px-6 py-2 font-black rounded-2xl rotate-[-5deg] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            HARD SKILLS
        </div>
        <div class="flex flex-wrap gap-4 mt-8">
          <span v-for="skill in hardSkills" :key="skill.id" 
            class="px-4 py-2 bg-white text-black font-black border-2 border-black rounded-xl hover:bg-soft-purple hover:-translate-y-1 transition-all cursor-default shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            {{ skill.name }}
          </span>
        </div>
      </div>

      <!-- SOFTWARE SKILLS -->
      <div class="brutalist-card card-yellow bg-neutral-900 overflow-visible">
        <div class="absolute -top-10 -right-4 bg-soft-yellow text-black border-4 border-black px-6 py-2 font-black rounded-2xl rotate-[5deg] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            SOFTWARE
        </div>
        <div class="flex flex-wrap gap-4 mt-8">
          <span v-for="skill in softwareSkills" :key="skill.id" 
            class="px-4 py-2 bg-white text-black font-black border-2 border-black rounded-xl hover:bg-soft-yellow hover:-translate-y-1 transition-all cursor-default shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            {{ skill.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
