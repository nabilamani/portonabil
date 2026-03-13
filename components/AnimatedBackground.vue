<script setup>
import { onMounted } from 'vue'

const items = Array.from({ length: 15 })

onMounted(() => {
  // Randomize initial positions and animation delays for a natural look
  const elements = document.querySelectorAll('.floating-item')
  elements.forEach((el) => {
    const rx = Math.random() * 100
    const ry = Math.random() * 100
    const delay = Math.random() * 5
    const duration = 10 + Math.random() * 20
    
    el.style.left = `${rx}vw`
    el.style.top = `${ry}vh`
    el.style.animationDelay = `${delay}s`
    el.style.animationDuration = `${duration}s`
  })
})
</script>

<template>
  <div class="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
    <!-- Animated gradient orbs -->
    <div 
      v-for="(_, index) in items" 
      :key="index"
      class="floating-item absolute rounded-full blur-[80px] md:blur-[120px] opacity-20 mix-blend-screen"
      :class="[
        index % 3 === 0 ? 'bg-soft-purple w-64 h-64 md:w-96 md:h-96' : 
        index % 3 === 1 ? 'bg-soft-blue w-48 h-48 md:w-80 md:h-80' : 
        'bg-soft-green w-56 h-56 md:w-80 md:h-80',
        index % 2 === 0 ? 'animate-float' : 'animate-float-reverse'
      ]"
    ></div>

    <!-- Shooting Stars / Comets overlay -->
    <div class="stars-container absolute inset-0 transform -rotate-45">
      <div v-for="i in 5" :key="'star-'+i" class="shooting-star"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0% { transform: translateY(0) scale(1); }
  33% { transform: translateY(-30vh) scale(1.2) translateX(10vw); }
  66% { transform: translateY(20vh) scale(0.8) translateX(-10vw); }
  100% { transform: translateY(0) scale(1); }
}

@keyframes float-reverse {
  0% { transform: translateY(0) scale(1); }
  33% { transform: translateY(30vh) scale(0.8) translateX(-15vw); }
  66% { transform: translateY(-20vh) scale(1.1) translateX(15vw); }
  100% { transform: translateY(0) scale(1); }
}

.animate-float {
  animation: float 20s infinite ease-in-out;
}

.animate-float-reverse {
  animation: float-reverse 25s infinite ease-in-out;
}

/* Shooting Stars */
.shooting-star {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 0 8px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 1);
  animation: shoot 3s linear infinite;
  opacity: 0;
}

.shooting-star::before {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  height: 1px;
  background: linear-gradient(90deg, #fff, transparent);
}

.shooting-star:nth-child(1) { top: 10%; left: -10%; animation-delay: 0s; animation-duration: 4s; }
.shooting-star:nth-child(2) { top: 30%; left: -20%; animation-delay: 2s; animation-duration: 5s; }
.shooting-star:nth-child(3) { top: 50%; left: -30%; animation-delay: 5s; animation-duration: 3.5s; }
.shooting-star:nth-child(4) { top: 70%; left: -10%; animation-delay: 7s; animation-duration: 6s; }
.shooting-star:nth-child(5) { top: 90%; left: -40%; animation-delay: 1s; animation-duration: 4.5s; }

@keyframes shoot {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translateX(150vw);
    opacity: 0;
  }
}
</style>
