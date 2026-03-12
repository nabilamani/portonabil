<script setup>
const roles = ['PECUT ENGINEER', 'UI/UX DESIGNER', 'CREATIVE CODER', 'WEB PROGRAMMER']
const currentRoleIndex = ref(0)
const isVisible = ref(true)

const bgColors = [
  'bg-soft-purple',
  'bg-soft-pink',
  'bg-soft-green',
  'bg-soft-yellow',
  'bg-soft-blue',
  'bg-soft-orange'
]
const currentBgIndex = ref(0)

const emit = defineEmits(['finished'])

onMounted(() => {
  // Cycle roles rapidly
  const roleInterval = setInterval(() => {
    currentRoleIndex.value = (currentRoleIndex.value + 1) % roles.length
  }, 150)

  // Cycle background colors
  const bgInterval = setInterval(() => {
    currentBgIndex.value = (currentBgIndex.value + 1) % bgColors.length
  }, 300)

  // Auto-hide after 2.2 seconds
  setTimeout(() => {
    clearInterval(roleInterval)
    clearInterval(bgInterval)
    isVisible.value = false
    
    // Emit finished after the transition finishes (approx 600ms)
    setTimeout(() => {
        emit('finished')
    }, 600)
  }, 2200)
})
</script>

<template>
  <Transition name="intro">
    <div v-if="isVisible" :class="bgColors[currentBgIndex]" class="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <!-- Fun decorative elements -->
      <div class="absolute top-10 left-10 w-20 h-20 border-8 border-black rounded-full animate-ping"></div>
      <div class="absolute bottom-10 right-10 w-24 h-24 bg-white border-4 border-black rotate-12 flex items-center justify-center font-black text-4xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
        !
      </div>

      <div class="text-center">
        <p class="text-black font-black text-xl md:text-2xl mb-4 tracking-widest uppercase">Hello, I Am</p>
        <div class="relative inline-block">
          <!-- Rapidly shifting role -->
          <h1 class="text-5xl md:text-8xl xl:text-9xl font-black text-white bg-black px-8 py-4 border-8 border-white shadow-[20px_20px_0px_0px_rgba(255,255,255,0.3)] transform -rotate-1">
            {{ roles[currentRoleIndex] }}
          </h1>
          
          <!-- Glitch-like duplicates -->
          <div class="absolute inset-0 translate-x-1 translate-y-1 -z-10 bg-white border-8 border-black opacity-30"></div>
        </div>
        
        <div class="mt-12 flex justify-center gap-4">
          <div v-for="i in 5" :key="i" 
            class="w-4 h-4 border-2 border-black rounded-full transition-colors"
            :class="i-1 === currentRoleIndex % 5 ? 'bg-black' : 'bg-transparent'"
          ></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.intro-leave-active {
  transition: all 0.6s cubic-bezier(1, 0, 0, 1);
}

.intro-leave-to {
  transform: translateY(-100%);
  filter: blur(10px);
}
</style>
