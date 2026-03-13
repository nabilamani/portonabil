<script setup>
import { Heart } from 'lucide-vue-next'
const { data: portfolio, error } = await useFetch('/api/portfolio')

// Intro State
const isIntroDone = ref(false)

if (error.value) {
    console.error('Failed to load portfolio:', error.value)
}

// Scroll Reveal Logic
const initObserver = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed')
            }
        })
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    })

    // Observe existing elements
    const observeAll = () => {
        document.querySelectorAll('.reveal-text:not(.is-revealed)').forEach(el => observer.observe(el))
    }

    observeAll()

    // Observe future elements (like Load More)
    const mutationObserver = new MutationObserver(() => {
        observeAll()
    })

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    })
}

watch(isIntroDone, (done) => {
    if (done) {
        nextTick(() => {
            initObserver()
        })
    }
})
</script>

<template>
  <Intro v-if="!isIntroDone" @finished="isIntroDone = true" />
  
  <div v-if="error" class="min-h-screen bg-black text-white flex items-center justify-center p-8">
    <div class="brutalist-card border-red-600">
        <h1 class="text-4xl text-red-600 mb-4">DATABASE ERROR</h1>
        <p class="opacity-70 mb-8">{{ error.message }}</p>
        <button @click="() => refreshNuxtData()" class="brutalist-btn bg-white text-black">TRY REFRESH</button>
    </div>
  </div>
  <div v-else-if="portfolio && isIntroDone" class="min-h-screen selection:bg-soft-purple selection:text-black scroll-smooth">
    <!-- Main Background Decorations -->
    <div class="fixed inset-0 -z-50 pointer-events-none">
        <div class="absolute top-[10%] left-[5%] w-96 h-96 bg-soft-purple/10 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-soft-blue/10 rounded-full blur-[150px]"></div>
        <div class="absolute top-[50%] left-[40%] w-72 h-72 bg-soft-yellow/5 rounded-full blur-[100px]"></div>
    </div>

    <header class="p-6 sticky top-0 bg-[#080808]/80 backdrop-blur-xl z-50 border-b-4 border-black">
      <div class="container mx-auto flex justify-between items-center">
        <div class="group cursor-default">
            <h1 class="text-4xl text-white group-hover:text-soft-purple transition-colors">MNA<span class="text-soft-yellow">.</span></h1>
        </div>
        <nav class="hidden lg:flex gap-10">
          <a v-for="link in ['about', 'projects', 'experience', 'skills', 'education']" :key="link"
            :href="'#' + link" 
            class="text-sm uppercase font-black tracking-widest hover:text-soft-yellow hover:scale-110 transition-all font-bold"
          >
            {{ link }}
          </a>
        </nav>
        <div class="flex items-center gap-4">
            <NuxtLink to="/admin" class="text-xs font-black uppercase tracking-tighter hover:text-soft-purple hover:underline decoration-2 underline-offset-4">
                Login
            </NuxtLink>
            <a :href="'https://wa.me/' + portfolio.profile.phone?.replace(/[^0-9]/g, '')" target="_blank" class="brutalist-btn !py-2 !px-6 bg-soft-green scale-95 hover:scale-100 flex items-center gap-2">
                <span>Contact</span>
            </a>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-20 space-y-64">
      <Hero :profile="portfolio.profile" />
      <About id="about" :profile="portfolio.profile" />
      <Projects id="projects" :projects="portfolio.projects" />
      
      <!-- Crossing Marquee Divider -->
      <MarqueeDivider />

      <Experience id="experience" :experiences="portfolio.experiences" />
      <Skills id="skills" :skills="portfolio.skills" />
      <Education 
        id="education" 
        :education="portfolio.education" 
        :organizations="portfolio.organizations"
        :certifications="portfolio.certifications"
      />
    </main>

    <footer class="mt-64 relative overflow-hidden">
        <!-- Squiggle Spacer -->
        <div class="squiggle opacity-50 mb-20"></div>

        <div class="bg-white text-black py-32 px-4 border-t-8 border-black">
            <div class="container mx-auto text-center">
                <div class="inline-block px-8 py-2 bg-soft-purple border-4 border-black text-black font-black uppercase text-2xl rounded-2xl mb-12 rotate-2">
                    KEEPIN' IN TOUCH
                </div>
                <h2 class="text-6xl md:text-[10rem] font-black tracking-tighter leading-none mb-20">LET'S CREATE!</h2>
                
                <div class="flex flex-wrap justify-center gap-8 md:gap-16 text-2xl md:text-5xl font-black">
                    <a href="https://github.com/nabilamani" target="_blank" class="hover:text-soft-purple transition-colors underline decoration-8 decoration-soft-purple underline-offset-8">GITHUB</a>
                    <a href="https://ungu.in/linkedin_nabilamani1" target="_blank" class="hover:text-soft-blue transition-colors underline decoration-8 decoration-soft-blue underline-offset-8">LINKEDIN</a>
                </div>

                <div class="mt-24 grid md:grid-cols-2 gap-12 max-w-4xl mx-auto text-left">
                    <div class="brutalist-card bg-neutral-950 text-white border-black card-purple">
                        <p class="text-soft-purple font-black uppercase mb-4 tracking-widest text-xs">Based in</p>
                        <p class="text-2xl font-black">{{ portfolio.profile.address || 'Indonesia' }}</p>
                    </div>
                    <div class="brutalist-card bg-neutral-950 text-white border-black card-yellow">
                        <p class="text-soft-yellow font-black uppercase mb-4 tracking-widest text-xs">Reach me at</p>
                        <p class="text-2xl font-black">{{ portfolio.profile.phone || '+62 857 2885 3831' }}</p>
                    </div>
                </div>

                <p class="mt-32 font-black tracking-widest uppercase text-xs opacity-40 italic flex items-center justify-center gap-1.5 flex-wrap">
                    © 2026 MUHAMMAD NABIL AMANI. DESIGNED WITH <Heart :size="12" class="fill-current" /> AND A LOT OF COFFEE.
                </p>
            </div>
        </div>
    </footer>

    <!-- Live Chat Widget -->
    <ChatWidget />
  </div>
</template>
