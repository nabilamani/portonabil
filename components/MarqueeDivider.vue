<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'MUHAMMAD NABIL AMANI • PECUT ENGINEER • CREATIVE DESIGNER • AVAILABLE FOR HIRE • MUHAMMAD NABIL AMANI • PECUT ENGINEER • CREATIVE DESIGNER • AVAILABLE FOR HIRE •'
  },
  color1: {
    type: String,
    default: 'bg-soft-purple'
  },
  color2: {
    type: String,
    default: 'bg-soft-yellow'
  }
})
</script>

<template>
  <div class="w-screen relative left-1/2 -translate-x-1/2 py-24 overflow-hidden select-none pointer-events-none">
    <!-- Strip 1 (Slanted Down) -->
    <div class="marquee-strip h-20 flex items-center border-y-4 border-black rotate-[2deg] z-20 absolute left-[-10%] right-[-10%]" :class="color1">
      <div class="marquee-content whitespace-nowrap flex gap-8 py-2">
        <span v-for="i in 4" :key="i" class="text-4xl font-black text-black uppercase tracking-tighter">
          {{ text }}
        </span>
      </div>
    </div>

    <!-- Strip 2 (Slanted Up) -->
    <div class="marquee-strip-reverse h-20 flex items-center border-y-4 border-black -rotate-[2deg] z-10 absolute left-[-10%] right-[-10%]" :class="color2">
      <div class="marquee-content-reverse whitespace-nowrap flex gap-8 py-2">
        <span v-for="i in 4" :key="i" class="text-4xl font-black text-black uppercase tracking-tighter">
          {{ text }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-strip {
  transform-origin: center;
  box-shadow: 0 10px 0 0 rgba(0,0,0,1);
}

.marquee-strip-reverse {
  transform-origin: center;
  box-shadow: 0 10px 0 0 rgba(0,0,0,1);
}

.marquee-content {
  animation: marquee 40s linear infinite;
}

.marquee-content-reverse {
  animation: marquee-reverse 60s linear infinite;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
</style>
