<script setup>
import { 
  Database, 
  Layers, 
  Rocket, 
  ExternalLink, 
  Github, 
  Check, 
  X, 
  Star, 
  Image as ImageIcon, 
  ChevronDown, 
  ChevronUp,
  Zap,
  Eye
} from 'lucide-vue-next'

const props = defineProps({
  projects: Array
})

const selectedProject = ref(null)
const showAll = ref(false)
const itemsLimit = 3

const displayedProjects = computed(() => {
  if (!props.projects) return []
  if (showAll.value) return props.projects
  return props.projects.slice(0, itemsLimit)
})

function parseJSON(str, fallback = []) {
  try {
    return JSON.parse(str)
  } catch (e) {
    return fallback
  }
}

function openDetail(project) {
    selectedProject.value = project
    document.body.style.overflow = 'hidden'
}

function closeDetail() {
    selectedProject.value = null
    document.body.style.overflow = 'auto'
}
</script>

<template>
  <section class="relative">
    <div class="absolute -top-24 -left-20 w-64 h-64 bg-soft-purple opacity-10 rounded-full blur-[100px] -z-10"></div>
    
    <h2 class="section-title mb-24 bg-soft-blue reveal-text">MY PROJECTS</h2>

    <!-- Project Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="project in displayedProjects" :key="project.id" 
        @click="openDetail(project)"
        class="brutalist-card bg-neutral-900 border-white/10 group cursor-pointer hover:border-soft-purple hover:-translate-y-2 transition-all p-4 reveal-text"
      >
        <div class="aspect-video bg-neutral-800 rounded-xl overflow-hidden mb-6 border-2 border-black relative">
            <img v-if="project.imageUrl" :src="project.imageUrl" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div v-else class="w-full h-full flex items-center justify-center opacity-20">
                <ImageIcon :size="48" />
            </div>
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span class="brutalist-btn bg-soft-purple text-black text-xs font-black flex items-center gap-2">
                    <Eye :size="14" />
                    VIEW DETAILS
                </span>
            </div>
        </div>
        
        <h3 class="text-2xl font-black text-white uppercase mb-4 group-hover:text-soft-purple transition-colors line-clamp-2">
            {{ project.title }}
        </h3>
        
        <div class="flex flex-wrap gap-2 mb-6">
            <span v-for="tech in project.techs?.split(',').slice(0, 3)" :key="tech"
                class="px-2 py-0.5 bg-neutral-800 border-2 border-black text-[8px] font-black uppercase text-white/60 rounded"
            >
                {{ tech.trim() }}
            </span>
            <span v-if="project.techs?.split(',').length > 3" class="text-[8px] font-black text-white/30 self-center">+{{ project.techs.split(',').length - 3 }} MORE</span>
        </div>

        <p class="text-sm text-white/50 line-clamp-3 mb-4 leading-relaxed">
            {{ project.description }}
        </p>
      </div>
    </div>

    <!-- Load More / Show Less Button -->
    <div v-if="projects?.length > itemsLimit" class="mt-16 flex justify-center">
      <button @click="showAll = !showAll" 
        class="brutalist-btn bg-white text-black font-black hover:bg-soft-yellow hover:scale-105 transition-all text-sm px-12 flex items-center gap-3"
      >
        <template v-if="!showAll">
            LOAD MORE PROJECTS
            <ChevronDown :size="18" />
        </template>
        <template v-else>
            SHOW LESS PROJECTS
            <ChevronUp :size="18" />
        </template>
      </button>
    </div>

    <!-- Project Detail Overlay (Modal) -->
    <Teleport to="body">
      <div v-if="selectedProject" 
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      >
        <!-- Overlay Backdrop -->
        <div @click="closeDetail" class="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"></div>
        
        <!-- Big Detail Container -->
        <div class="brutalist-card bg-[#0a0a0a] border-white/20 w-full max-w-7xl h-full max-h-[90vh] overflow-y-auto relative z-10 custom-scrollbar">
            <!-- Close Button -->
            <button @click="closeDetail" class="absolute top-6 right-6 z-20 w-12 h-12 bg-white text-black border-4 border-black rounded-full font-black hover:bg-soft-purple hover:scale-110 transition-all flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <X :size="24" stroke-width="3" />
            </button>

            <div class="p-8 md:p-12">
                <div class="grid lg:grid-cols-2 gap-16 items-start">
                    <!-- Text Content -->
                    <div class="space-y-8">
                        <div class="inline-block px-4 py-1 bg-soft-purple border-2 border-black font-black text-xs rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
                            PROJECT OVERVIEW
                        </div>
                        
                        <h3 class="text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tighter">
                            {{ selectedProject.title }}
                        </h3>
                        
                        <div class="squiggle opacity-30 h-1 bg-white w-32"></div>
                        
                        <p class="text-lg md:text-xl text-white/70 leading-relaxed font-medium">
                            {{ selectedProject.description }}
                        </p>

                        <!-- Stats Grid -->
                        <div class="grid grid-cols-2 gap-6" v-if="selectedProject.stats">
                            <div v-for="stat in parseJSON(selectedProject.stats)" :key="stat.label" 
                            class="brutalist-card bg-neutral-900 border-white/10 flex items-center gap-4 group/stat hover:border-soft-purple transition-all"
                            >
                            <div class="w-12 h-12 bg-soft-purple border-2 border-black rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover/stat:-translate-y-1 transition-transform">
                                <Database v-if="stat.icon === 'database'" :size="24" class="text-black" />
                                <Layers v-else-if="stat.icon === 'layers'" :size="24" class="text-black" />
                                <Rocket v-else :size="24" class="text-black" />
                            </div>
                            <div>
                                <p class="text-2xl font-black text-white leading-none">{{ stat.value }}</p>
                                <p class="text-xs uppercase font-bold text-white/40 tracking-widest mt-1">{{ stat.label }}</p>
                            </div>
                            </div>
                        </div>

                        <!-- Tech Stack Tags -->
                        <div class="flex flex-wrap gap-3" v-if="selectedProject.techs">
                            <span v-for="tech in selectedProject.techs.split(',')" :key="tech"
                            class="px-3 py-1 bg-neutral-800 border-2 border-black text-[10px] font-black uppercase tracking-tighter text-white/80 rounded shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-soft-blue hover:text-black transition-colors"
                            >
                            {{ tech.trim() }}
                            </span>
                        </div>

                        <!-- Actions -->
                        <div class="flex flex-wrap gap-6 pt-4">
                            <a :href="selectedProject.demoUrl" target="_blank" v-if="selectedProject.demoUrl"
                            class="brutalist-btn bg-soft-purple text-black font-black flex items-center gap-2 group/btn"
                            >
                            <span>VISIT LIVE DEMO</span>
                            <ExternalLink :size="18" class="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </a>
                            <a :href="selectedProject.githubUrl" target="_blank" v-if="selectedProject.githubUrl"
                            class="brutalist-btn bg-black text-white border-white flex items-center gap-2 group/btn"
                            >
                            <span>GITHUB SOURCE</span>
                            <Github :size="18" class="opacity-50 group-hover/btn:scale-110 transition-transform" />
                            </a>
                        </div>

                        <!-- Credentials -->
                        <div v-if="selectedProject.credentials" class="p-6 bg-neutral-900 border-l-8 border-soft-purple rounded-r-2xl">
                            <p class="text-[10px] uppercase font-black text-soft-purple mb-2 tracking-widest">Access Credentials</p>
                            <code class="text-sm font-mono text-white/60 break-all">{{ selectedProject.credentials }}</code>
                        </div>
                    </div>

                    <!-- Side Column -->
                    <div class="space-y-12">
                        <!-- Main Preview -->
                        <div class="brutalist-card p-2 bg-neutral-950 border-black card-purple overflow-hidden">
                            <div v-if="selectedProject.imageUrl" class="aspect-video bg-neutral-800 rounded-xl overflow-hidden border-2 border-black">
                                <img :src="selectedProject.imageUrl" class="w-full h-full object-cover" />
                            </div>
                            <div v-else class="aspect-video bg-neutral-900 flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl">
                                <ImageIcon :size="48" class="opacity-20" />
                            </div>
                        </div>

                        <!-- Features Box -->
                        <div class="brutalist-card bg-neutral-900 border-white/20 relative !overflow-visible">
                            <div class="absolute -top-4 -right-4 w-12 h-12 bg-soft-yellow border-4 border-black rounded-full flex items-center justify-center z-20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce">
                                <Zap :size="24" class="text-black fill-black" stroke-width="3" />
                            </div>
                            
                            <h4 class="text-2xl font-black mb-8 uppercase flex items-center gap-3">
                                <Star class="text-soft-yellow fill-soft-yellow" :size="24" />
                                Main Features
                            </h4>
                            
                            <ul class="space-y-6" v-if="selectedProject.features">
                                <li v-for="feature in parseJSON(selectedProject.features)" :key="feature" class="flex gap-4 group">
                                    <div class="mt-1 w-5 h-5 bg-white border-2 border-black rounded flex-shrink-0 flex items-center justify-center text-black group-hover:bg-soft-green transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <Check :size="12" stroke-width="4" />
                                    </div>
                                    <p class="text-white/80 font-medium leading-tight group-hover:text-white transition-colors">{{ feature }}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 12px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: black;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #333;
  border: 3px solid black;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
