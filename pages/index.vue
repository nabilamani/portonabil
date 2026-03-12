<script setup>
const { data: portfolio } = await useFetch('/api/portfolio')
</script>

<template>
  <div v-if="portfolio" class="min-h-screen selection:bg-accent selection:text-black">
    <header class="p-8 sticky top-0 bg-black/80 backdrop-blur-md z-50 border-b-4 border-white">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-3xl text-white">MNA.</h1>
        <nav class="hidden md:flex gap-8">
          <a href="#about" class="hover:text-accent uppercase font-bold">About</a>
          <a href="#experience" class="hover:text-accent uppercase font-bold">Experience</a>
          <a href="#skills" class="hover:text-accent uppercase font-bold">Skills</a>
          <a href="#education" class="hover:text-accent uppercase font-bold">Education</a>
        </nav>
        <a href="mailto:nabilamani2304@gmail.com" class="brutalist-btn bg-accent border-black">Hire Me</a>
      </div>
    </header>

    <main class="container mx-auto px-4 py-20 space-y-40">
      <Hero :profile="portfolio.profile" />
      <About id="about" :profile="portfolio.profile" />
      <Experience id="experience" :experiences="portfolio.experiences" />
      <Skills id="skills" :skills="portfolio.skills" />
      <Education 
        id="education" 
        :education="portfolio.education" 
        :organizations="portfolio.organizations"
        :certifications="portfolio.certifications"
      />
    </main>

    <footer class="p-20 bg-white text-black border-t-8 border-black text-center mt-40">
      <h2 class="text-6xl mb-8">LET'S CONNECT!</h2>
      <div class="flex justify-center gap-12 text-2xl font-black">
        <a href="https://github.com/nabilamani" target="_blank" class="hover:underline">GITHUB</a>
        <a href="https://ungu.in/linkedin_nabilamani1" target="_blank" class="hover:underline">LINKEDIN</a>
        <a href="mailto:nabilamani2304@gmail.com" class="hover:underline">EMAIL</a>
      </div>
      <p class="mt-20 font-mono">© 2026 MUHAMMAD NABIL AMANI. BUILT WITH NUXT 4 & NITRO.</p>
    </footer>
  </div>
</template>
