<script setup>
const props = defineProps(['skills'])

const hardSkills = computed(() => props.skills?.filter(s => s.category === 'hard') || [])
const softwareSkills = computed(() => props.skills?.filter(s => s.category === 'software') || [])
</script>

<template>
  <section v-if="skills" class="space-y-20">
    <h2 class="section-title">KEAHLIAN</h2>
    <div class="grid md:grid-cols-2 gap-12">
      <!-- HARD SKILLS -->
      <div class="space-y-8">
        <h3 class="text-4xl bg-accent text-black px-4 py-1 inline-block -rotate-1">HARD SKILLS</h3>
        <div class="flex flex-wrap gap-4">
          <span v-for="skill in hardSkills" :key="skill.id" class="badge bg-neutral-800 hover:bg-accent hover:text-black transition-colors">
            {{ skill.name }}
          </span>
        </div>
      </div>
      <!-- SOFTWARE SKILLS -->
      <div class="space-y-8">
        <h3 class="text-4xl bg-accent-yellow text-black px-4 py-1 inline-block rotate-1">SOFTWARE</h3>
        <div class="flex flex-wrap gap-4">
          <span v-for="skill in softwareSkills" :key="skill.id" class="badge bg-neutral-800 hover:bg-accent-yellow hover:text-black transition-colors">
            {{ skill.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
