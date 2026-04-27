<script setup>
import { 
  MessageSquare, 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  X, 
  Save, 
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  Users,
  Code2,
  User,
  ArrowUp,
  ArrowDown
} from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const { data: portfolio, refresh } = await useFetch('/api/portfolio')
const activeTab = ref('profile')
const isSaving = ref(false)
const projectCategoryFilter = ref('web')

const tableData = computed(() => {
  if (!portfolio.value) return []
  let data = portfolio.value[activeTab.value] || []
  if (activeTab.value === 'projects') {
    data = data.filter(p => (p.category || 'web') === projectCategoryFilter.value)
  }
  return data
})

// --- Modal System ---
const isModalOpen = ref(false)
const modalType = ref('') // 'projects', 'experiences', etc.
const modalData = ref({})
const isNewItem = ref(false)

function openModal(type, item = null) {
  modalType.value = type
  isNewItem.value = !item
  
  if (item) {
    modalData.value = JSON.parse(JSON.stringify(item))
  } else {
    // Default values for new items
    const defaults = {
      projects: { title: '', description: '', category: 'web', techs: '', order: 0, stats: '[]', features: '[]', demoUrl: '', githubUrl: '', credentials: '', imageUrl: '', videoUrl: '' },
      experiences: { company: '', role: '', period: '', description: '', order: 0 },
      education: { institution: '', degree: '', period: '', gpa: '', order: 0 },
      organizations: { org: '', role: '', period: '', order: 0 },
      certifications: { title: '', issuer: '', date: '', order: 0 },
      skills: { name: '', category: 'hard', order: 0 }
    }
    modalData.value = defaults[type] || {}
  }
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  modalData.value = {}
  modalType.value = ''
}

async function handleSave() {
  isSaving.value = true
  try {
    const type = modalType.value
    const item = modalData.value
    const method = (item.id && !isNewItem.value) ? 'PATCH' : 'POST'
    const endpoint = `/api/${type}`

    await $fetch(endpoint, {
      method,
      body: item
    })
    
    await refresh()
    closeModal()
  } catch (e) {
    alert('Gagal menyimpan: ' + e.message)
  } finally {
    isSaving.value = false
  }
}

async function deleteItem(type, id) {
  if (!confirm(`Hapus item ini dari ${type}?`)) return
  isSaving.value = true
  try {
    await $fetch(`/api/${type}?id=${id}`, { method: 'DELETE' })
    await refresh()
  } finally {
    isSaving.value = false
  }
}

async function moveItem(table, index, direction) {
  if (!portfolio.value || !portfolio.value[table]) return;
  
  let items = [...portfolio.value[table]];
  if (table === 'projects') {
    items = items.filter(p => (p.category || 'web') === projectCategoryFilter.value);
  }
  
  if (direction === 'up' && index > 0) {
    const temp = items[index - 1];
    items[index - 1] = items[index];
    items[index] = temp;
  } else if (direction === 'down' && index < items.length - 1) {
    const temp = items[index + 1];
    items[index + 1] = items[index];
    items[index] = temp;
  } else {
    return;
  }

  const newItems = items.map((item, idx) => ({ id: item.id, order: idx + 1 }));
  
  try {
    await $fetch('/api/reorder', {
      method: 'POST',
      body: { table, items: newItems }
    });
    await refresh();
  } catch (e) {
    alert('Gagal mengurutkan: ' + e.message);
  }
}

// --- Profile Special ---
async function saveProfile() {
  isSaving.value = true
  try {
    await $fetch('/api/profile', {
      method: 'PATCH',
      body: portfolio.value.profile
    })
    alert('Profil diperbarui!')
    await refresh()
  } finally {
    isSaving.value = false
  }
}

async function onPhotoSelected(e) {
  const file = e.target.files[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) return alert('Maks 2MB')
  
  const reader = new FileReader()
  reader.onload = (event) => {
    portfolio.value.profile.photoUrl = event.target.result
  }
  reader.readAsDataURL(file)
}

function onCVSelected(event) {
  const file = event.target.files[0]
  if (!file) return
  if (file.type !== 'application/pdf') {
    alert('Mohon unggah file dalam format PDF')
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    portfolio.value.profile.cvUrl = e.target.result
  }
  reader.readAsDataURL(file)
}

async function onProjectPhotoSelected(event) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (event) => {
    modalData.value.imageUrl = event.target.result
  }
  reader.readAsDataURL(file)
}

// --- Chat System ---
const chatSessions = ref([])
const selectedChat = ref(null)
const chatMessages = ref([])
const adminReply = ref('')
let pollTimer = null

async function loadChats() {
  chatSessions.value = await $fetch('/api/chat/sessions')
}

async function selectChat(session) {
  selectedChat.value = session
  const res = await $fetch(`/api/chat/messages?sessionId=${session.id}`)
  chatMessages.value = res.messages || []
}

async function sendReply() {
  if (!adminReply.value.trim() || !selectedChat.value) return
  await $fetch('/api/chat/messages', {
    method: 'POST',
    body: { sessionId: selectedChat.value.id, content: adminReply.value, senderType: 'admin' }
  })
  adminReply.value = ''
  await selectChat(selectedChat.value)
}

function formatChatTime(ts) {
  if (!ts) return ''
  return new Date(ts * 1000).toLocaleString('id-ID', { 
    day: '2-digit', 
    month: 'short', 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

function parseVideoUrl(url) {
  if (!url) return { type: 'none', src: '' }
  
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)
    if (ytMatch) return { type: 'iframe', src: `https://www.youtube.com/embed/${ytMatch[1]}` }
  }
  
  if (url.includes('tiktok.com')) {
    const ttMatch = url.match(/video\/(\d+)/)
    if (ttMatch) return { type: 'iframe', src: `https://www.tiktok.com/embed/v2/${ttMatch[1]}` }
  }
  
  if (url.includes('instagram.com/p/') || url.includes('instagram.com/reel/')) {
    let src = url.split('?')[0]
    if (!src.endsWith('/')) src += '/'
    return { type: 'iframe', src: `${src}embed/` }
  }

  return { type: 'video', src: url }
}

onMounted(() => {
  loadChats()
  pollTimer = setInterval(loadChats, 5000)
})

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer)
})

const { clear: clearSession } = useUserSession()
async function logout() {
  await $fetch('/api/logout', { method: 'POST' })
  await clearSession()
  window.location.href = '/login'
}

const menuItems = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'projects', label: 'Projects', icon: Code2 },
  { id: 'experiences', label: 'Experiences', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Award },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'organizations', label: 'Organizations', icon: Users },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'chat', label: 'Live Chat', icon: MessageSquare },
]
</script>

<template>
  <div class="min-h-screen bg-[#080808] text-white font-sans selection:bg-accent selection:text-black">
    <!-- Overlay Loading -->
    <div v-if="isSaving" class="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center">
      <div class="bg-white text-black p-8 border-8 border-black shadow-[12px_12px_0px_0px_var(--accent)] animate-bounce">
        <p class="font-black text-2xl tracking-widest uppercase">Memproses...</p>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="sticky top-0 z-50 bg-black border-b-8 border-white p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="flex items-center gap-4">
        <div class="bg-accent text-black font-black px-3 py-1 rotate-[-2deg] border-4 border-black text-lg">MNA</div>
        <h1 class="text-2xl font-black tracking-tighter uppercase">Portfolio <span class="text-soft-purple">CMS</span></h1>
      </div>
      <div class="flex gap-4 w-full md:w-auto">
        <a href="/" target="_blank" class="brutalist-btn !py-2 !px-4 bg-white text-black text-xs flex-1 md:flex-none text-center">WEBSITE</a>
        <button @click="logout" class="brutalist-btn !py-2 !px-4 bg-red-600 text-white border-black text-xs flex-1 md:flex-none">KELUAR</button>
      </div>
    </nav>

    <div class="flex flex-col lg:flex-row min-h-[calc(100vh-100px)]">
      <!-- Sidebar Menu -->
      <aside class="w-full lg:w-72 border-b-8 lg:border-b-0 lg:border-r-8 border-white p-6 bg-neutral-950 space-y-4">
        <p class="text-[10px] font-black uppercase opacity-40 tracking-widest mb-6">Manajemen Menu</p>
        <button v-for="item in menuItems" :key="item.id"
          @click="activeTab = item.id"
          class="w-full flex items-center gap-4 p-4 border-4 transition-all duration-200 group relative overflow-hidden"
          :class="activeTab === item.id ? 'bg-accent text-black border-black translate-x-2' : 'bg-transparent border-white/10 text-white/60 hover:border-white/40 hover:text-white'"
        >
          <component :is="item.icon" :size="20" :stroke-width="3" />
          <span class="font-black uppercase text-sm tracking-tight">{{ item.label }}</span>
          
          <!-- Unread Badge for Chat Sidebar -->
          <div v-if="item.id === 'chat' && chatSessions.reduce((acc, s) => acc + (s.unreadCount || 0), 0) > 0" 
            class="ml-auto bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-black"
          >
            {{ chatSessions.reduce((acc, s) => acc + (s.unreadCount || 0), 0) }}
          </div>
          
          <div v-if="activeTab === item.id" class="absolute right-0 top-0 bottom-0 w-2 bg-black"></div>
        </button>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6 md:p-12 overflow-x-hidden">
        <!-- Header Section -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <p class="text-xs font-black text-accent uppercase tracking-[0.2em] mb-2">Workspace</p>
            <h2 class="text-5xl md:text-7xl font-black tracking-tighter uppercase">{{ activeTab }}</h2>
          </div>
          <button v-if="activeTab !== 'profile' && activeTab !== 'chat'" 
            @click="openModal(activeTab)"
            class="brutalist-btn bg-soft-blue text-black font-black flex items-center gap-2"
          >
            <Plus :size="20" /> TAMBAH BARU
          </button>
        </div>

        <div v-if="portfolio">
          <!-- PROFILE VIEW (Special Layout) -->
          <div v-if="activeTab === 'profile'" class="space-y-12">
            <div class="brutalist-card bg-neutral-900/50 border-white/20 p-8 md:p-12">
              <div class="grid lg:grid-cols-2 gap-16">
                <div class="space-y-8">
                  <div class="space-y-3">
                    <label class="cms-label text-soft-purple">Nama Lengkap</label>
                    <input v-model="portfolio.profile.name" class="cms-input text-2xl" />
                  </div>
                  <div class="space-y-3">
                    <label class="cms-label text-soft-yellow">Role / Jabatan</label>
                    <input v-model="portfolio.profile.role" class="cms-input" />
                  </div>
                  <div class="space-y-3">
                    <label class="cms-label text-soft-green">Foto Profil</label>
                    <div class="flex items-center gap-6 p-4 border-4 border-white/10 rounded-2xl bg-black/40">
                      <div class="w-24 h-24 border-4 border-white rotate-[-3deg] shadow-[6px_6px_0px_0px_white] overflow-hidden bg-neutral-800">
                        <img v-if="portfolio.profile.photoUrl" :src="portfolio.profile.photoUrl" class="w-full h-full object-cover" />
                      </div>
                      <input type="file" @change="onPhotoSelected" class="text-xs file:brutalist-btn file:!py-1 file:!px-4" />
                    </div>
                  </div>
                </div>
                <div class="space-y-8">
                  <div class="space-y-3">
                    <label class="cms-label text-soft-blue">Email</label>
                    <input v-model="portfolio.profile.email" class="cms-input" />
                  </div>
                  <div class="space-y-3">
                    <label class="cms-label text-soft-purple">Social Links (GitHub, LinkedIn, TikTok)</label>
                    <div class="grid grid-cols-1 gap-3">
                      <input v-model="portfolio.profile.github" placeholder="GitHub URL" class="cms-input text-xs" />
                      <input v-model="portfolio.profile.linkedin" placeholder="LinkedIn URL" class="cms-input text-xs" />
                      <input v-model="portfolio.profile.tiktok" placeholder="TikTok URL" class="cms-input text-xs" />
                    </div>
                  </div>
                  <div class="space-y-3">
                    <label class="cms-label text-soft-green">CV / Resume (PDF)</label>
                    <div class="flex items-center gap-4 p-4 border-4 border-white/10 rounded-2xl bg-black/40">
                      <div class="flex-1">
                        <p v-if="portfolio.profile.cvUrl" class="text-[10px] text-accent font-black uppercase mb-2">CV Terunggah ✓</p>
                        <input type="file" accept=".pdf" @change="onCVSelected" class="text-xs file:brutalist-btn file:!py-1 file:!px-4" />
                      </div>
                      <a v-if="portfolio.profile.cvUrl" :href="portfolio.profile.cvUrl" target="_blank" class="p-2 bg-white text-black border-2 border-black hover:bg-accent transition-colors">
                        <ExternalLink :size="16" />
                      </a>
                    </div>
                  </div>
                  <div class="space-y-3">
                    <label class="cms-label">Deskripsi Panjang</label>
                    <textarea v-model="portfolio.profile.description" class="cms-input h-32"></textarea>
                  </div>
                </div>
              </div>
              <button @click="saveProfile" class="brutalist-btn bg-accent text-black w-full mt-12 text-xl shadow-[8px_8px_0px_0px_white]">SIMPAN PERUBAHAN PROFIL</button>
            </div>
          </div>

          <!-- TABLE VIEW (For Projects, Exp, Edu, etc.) -->
          <div v-else-if="activeTab !== 'chat'" class="brutalist-card !p-0 overflow-hidden border-white/20">
            <!-- Project Category Filter -->
            <div v-if="activeTab === 'projects'" class="flex border-b-4 border-white/10">
              <button @click="projectCategoryFilter = 'web'" :class="projectCategoryFilter === 'web' ? 'bg-accent text-black font-black' : 'text-white/50 hover:text-white'" class="flex-1 py-4 uppercase tracking-widest text-sm transition-colors">Web / App Projects</button>
              <button @click="projectCategoryFilter = 'video'" :class="projectCategoryFilter === 'video' ? 'bg-accent text-black font-black' : 'text-white/50 hover:text-white'" class="flex-1 border-l-4 border-white/10 py-4 uppercase tracking-widest text-sm transition-colors">Video Projects</button>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-white/5 border-b-4 border-white/10">
                    <th class="p-6 text-xs font-black uppercase tracking-widest opacity-40">Info Utama</th>
                    <th class="p-6 text-xs font-black uppercase tracking-widest opacity-40">Sub-Info / Detail</th>
                    <th class="p-6 text-xs font-black uppercase tracking-widest opacity-40">Waktu / Status</th>
                    <th class="p-6 text-xs font-black uppercase tracking-widest opacity-40 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody class="divide-y-2 divide-white/5">
                  <tr v-for="(item, index) in tableData" :key="item.id" class="hover:bg-white/5 transition-colors group">
                    <!-- Column 1: Main Title -->
                    <td class="p-6">
                      <div class="flex items-center gap-4">
                        <div v-if="activeTab === 'projects' && item.imageUrl" class="w-12 h-12 border-2 border-white rounded-lg overflow-hidden shrink-0">
                          <img :src="item.imageUrl" class="w-full h-full object-cover" />
                        </div>
                        <p class="font-black text-lg tracking-tight uppercase group-hover:text-accent transition-colors">
                          {{ item.title || item.company || item.institution || item.org || item.name }}
                        </p>
                      </div>
                    </td>
                    <!-- Column 2: Details -->
                    <td class="p-6">
                      <p class="text-sm font-bold opacity-60">
                        {{ item.role || item.degree || item.issuer || item.category || 'N/A' }}
                      </p>
                      <p v-if="item.techs" class="text-[10px] mt-1 text-soft-purple font-black">{{ item.techs }}</p>
                    </td>
                    <!-- Column 3: Date/Period -->
                    <td class="p-6">
                      <span class="badge !bg-neutral-800 !text-[10px]">{{ item.period || item.date || 'Active' }}</span>
                    </td>
                    <!-- Column 4: Actions -->
                    <td class="p-6 text-right space-x-2">
                      <div class="inline-flex space-x-1 mr-4">
                        <button @click="moveItem(activeTab, index, 'up')" :disabled="index === 0" class="p-2 bg-neutral-800 text-white border-2 border-black hover:bg-white hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                          <ArrowUp :size="16" />
                        </button>
                        <button @click="moveItem(activeTab, index, 'down')" :disabled="index === tableData.length - 1" class="p-2 bg-neutral-800 text-white border-2 border-black hover:bg-white hover:text-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                          <ArrowDown :size="16" />
                        </button>
                      </div>
                      <button @click="openModal(activeTab, item)" class="p-2 bg-white text-black border-2 border-black hover:bg-accent transition-colors">
                        <Pencil :size="16" />
                      </button>
                      <button @click="deleteItem(activeTab, item.id)" class="p-2 bg-red-600 text-white border-2 border-black hover:bg-red-700 transition-colors">
                        <Trash2 :size="16" />
                      </button>
                    </td>
                  </tr>
                  <tr v-if="!tableData.length">
                    <td colspan="4" class="p-12 text-center italic opacity-30 font-black tracking-widest uppercase">Data Kosong</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- CHAT SYSTEM (Wide Layout) -->
          <div v-else class="grid lg:grid-cols-3 gap-8 h-[70vh]">
            <div class="lg:col-span-1 brutalist-card !p-0 flex flex-col overflow-hidden">
              <div class="p-4 bg-white/5 border-b-2 border-white/10 font-black uppercase text-xs">Pesan Masuk</div>
              <div class="flex-1 overflow-y-auto">
                <button v-for="s in chatSessions" :key="s.id" 
                  @click="selectChat(s)"
                  class="w-full p-4 border-b border-white/5 text-left hover:bg-white/5"
                  :class="selectedChat?.id === s.id ? 'bg-soft-purple/20 border-l-4 border-soft-purple' : ''"
                >
                  <p class="font-black">{{ s.visitorName }}</p>
                  <div class="flex items-center justify-between mt-1">
                    <p class="text-[10px] opacity-40">{{ formatChatTime(s.createdAt) }}</p>
                    <span v-if="s.unreadCount > 0" class="bg-accent text-black text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-black">
                      {{ s.unreadCount }} BARU
                    </span>
                  </div>
                </button>
              </div>
            </div>
            <div class="lg:col-span-2 brutalist-card !p-0 flex flex-col overflow-hidden">
              <template v-if="selectedChat">
                <div class="p-4 border-b-2 border-white/10 flex justify-between items-center">
                  <p class="font-black uppercase">{{ selectedChat.visitorName }}</p>
                  <span class="text-[10px] opacity-40 italic">ID: {{ selectedChat.id.slice(0,8) }}</span>
                </div>
                <div class="flex-1 p-6 space-y-4 overflow-y-auto bg-black/40">
                  <div v-for="m in chatMessages" :key="m.id" 
                    class="flex" :class="m.senderType === 'admin' ? 'justify-end' : 'justify-start'">
                    <div class="max-w-[80%] p-3 rounded-xl border-2 border-black"
                      :class="m.senderType === 'admin' ? 'bg-soft-purple text-black' : 'bg-white text-black'">
                      {{ m.content }}
                    </div>
                  </div>
                </div>
                <div class="p-4 border-t-2 border-white/10 flex gap-4">
                  <input v-model="adminReply" @keydown.enter="sendReply" class="cms-input !py-2" placeholder="Balas pesan..." />
                  <button @click="sendReply" class="brutalist-btn bg-accent text-black !py-2">KIRIM</button>
                </div>
              </template>
              <div v-else class="flex-1 flex items-center justify-center italic opacity-20">Pilih chat untuk membalas</div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- CENTRAL MODAL (Pop-up) -->
    <div v-if="isModalOpen" class="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="closeModal"></div>
      <div class="brutalist-card bg-neutral-950 border-white p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-[20px_20px_0px_0px_var(--accent)]">
        <div class="flex justify-between items-center mb-10 border-b-4 border-white/10 pb-6">
          <h3 class="text-3xl font-black uppercase tracking-tighter">
            {{ isNewItem ? 'Tambah' : 'Edit' }} {{ modalType.slice(0, -1) }}
          </h3>
          <button @click="closeModal" class="p-2 hover:bg-red-600 transition-colors border-2 border-white">
            <X :size="24" />
          </button>
        </div>

        <!-- Dynamic Form Content -->
        <div class="grid md:grid-cols-2 gap-8">
          <!-- PROJECTS FORM -->
          <template v-if="modalType === 'projects'">
            <div class="md:col-span-2 flex gap-4 mb-4">
              <button @click="modalData.category = 'web'" :class="modalData.category === 'web' ? 'bg-accent text-black' : 'bg-transparent text-white border-white/20'" class="flex-1 border-4 p-3 font-black uppercase transition-colors">Project Web/App</button>
              <button @click="modalData.category = 'video'" :class="modalData.category === 'video' ? 'bg-accent text-black' : 'bg-transparent text-white border-white/20'" class="flex-1 border-4 p-3 font-black uppercase transition-colors">Project Video</button>
            </div>

            <!-- Web/App Project Fields -->
            <template v-if="modalData.category === 'web'">
              <div class="space-y-4">
                <label class="cms-label">Judul Proyek</label>
                <input v-model="modalData.title" class="cms-input" />
                <label class="cms-label">Tech Stack</label>
                <input v-model="modalData.techs" class="cms-input" />
                <label class="cms-label">Demo URL</label>
                <input v-model="modalData.demoUrl" class="cms-input" />
                <label class="cms-label">GitHub URL</label>
                <input v-model="modalData.githubUrl" class="cms-input" />
              </div>
              <div class="space-y-4">
                <label class="cms-label text-soft-green">Thumbnail Proyek</label>
                <div class="border-4 border-white/10 p-4 rounded-xl bg-black flex flex-col gap-4">
                  <img v-if="modalData.imageUrl" :src="modalData.imageUrl" class="w-full aspect-video object-cover border-2 border-white" />
                  <input type="file" accept="image/*" @change="onProjectPhotoSelected" class="text-[10px] file:brutalist-btn file:!py-1" />
                </div>
                <label class="cms-label">Deskripsi</label>
                <textarea v-model="modalData.description" class="cms-input h-32"></textarea>
              </div>
              <div class="md:col-span-2 space-y-4 border-t-2 border-white/10 pt-4">
                 <label class="cms-label italic opacity-40">Features (JSON Array)</label>
                 <textarea v-model="modalData.features" class="cms-input h-20 font-mono text-xs"></textarea>
              </div>
            </template>

            <!-- Video Project Fields -->
            <template v-else>
              <div class="space-y-4 md:col-span-2">
                <label class="cms-label">Judul Video</label>
                <input v-model="modalData.title" class="cms-input" />
              </div>
              <div class="space-y-4">
                <label class="cms-label text-soft-green">Cover Thumbnail (Khusus TikTok/IG)</label>
                <div class="border-4 border-white/10 p-4 rounded-xl bg-black flex flex-col gap-4">
                  <img v-if="modalData.imageUrl" :src="modalData.imageUrl" class="w-full aspect-video object-cover border-2 border-white" />
                  <input type="file" accept="image/*" @change="onProjectPhotoSelected" class="text-[10px] file:brutalist-btn file:!py-1" />
                </div>
              </div>
              <div class="space-y-4">
                <label class="cms-label text-soft-purple">Link Video (YouTube / TikTok / Instagram / MP4)</label>
                <input v-model="modalData.videoUrl" placeholder="https://youtube.com/watch?v=..." class="cms-input mb-4" />
                
                <div class="border-4 border-white/10 p-6 rounded-xl bg-black flex flex-col items-center">
                  <template v-if="modalData.videoUrl">
                    <iframe v-if="parseVideoUrl(modalData.videoUrl).type === 'iframe'" :src="parseVideoUrl(modalData.videoUrl).src" class="w-full max-w-md aspect-video border-2 border-white bg-neutral-900" frameborder="0" allowfullscreen></iframe>
                    <video v-else :src="parseVideoUrl(modalData.videoUrl).src" controls class="w-full max-w-md aspect-video border-2 border-white bg-neutral-900"></video>
                  </template>
                  <p v-else class="text-xs font-black uppercase opacity-30 my-8">Belum ada link video.</p>
                </div>
              </div>
            </template>
          </template>

          <!-- EXPERIENCES FORM -->
          <template v-else-if="modalType === 'experiences'">
            <div class="space-y-4">
              <label class="cms-label">Perusahaan</label>
              <input v-model="modalData.company" class="cms-input" />
              <label class="cms-label">Jabatan</label>
              <input v-model="modalData.role" class="cms-input" />
            </div>
            <div class="space-y-4">
              <label class="cms-label">Periode</label>
              <input v-model="modalData.period" class="cms-input" />
              <label class="cms-label">Urutan (Order)</label>
              <input type="number" v-model="modalData.order" class="cms-input" />
            </div>
            <div class="md:col-span-2 space-y-4">
              <label class="cms-label">Deskripsi Pekerjaan</label>
              <textarea v-model="modalData.description" class="cms-input h-32"></textarea>
            </div>
          </template>

          <!-- EDUCATION FORM -->
          <template v-else-if="modalType === 'education'">
             <div class="space-y-4">
              <label class="cms-label">Institusi</label>
              <input v-model="modalData.institution" class="cms-input" />
              <label class="cms-label">Gelar / Jurusan</label>
              <input v-model="modalData.degree" class="cms-input" />
            </div>
            <div class="space-y-4">
              <label class="cms-label">Periode</label>
              <input v-model="modalData.period" class="cms-input" />
              <label class="cms-label">GPA (IPK)</label>
              <input v-model="modalData.gpa" class="cms-input" />
            </div>
          </template>

          <!-- SKILLS FORM -->
          <template v-else-if="modalType === 'skills'">
             <div class="space-y-4">
              <label class="cms-label">Nama Skill</label>
              <input v-model="modalData.name" class="cms-input" />
            </div>
            <div class="space-y-4">
              <label class="cms-label">Kategori</label>
              <select v-model="modalData.category" class="cms-input bg-neutral-900">
                <option value="hard">Hard Skill</option>
                <option value="software">Software / Tool</option>
              </select>
            </div>
          </template>

          <!-- ORGANIZATIONS FORM -->
          <template v-else-if="modalType === 'organizations'">
            <div class="space-y-4">
              <label class="cms-label">Nama Organisasi</label>
              <input v-model="modalData.org" class="cms-input" />
              <label class="cms-label">Jabatan</label>
              <input v-model="modalData.role" class="cms-input" />
            </div>
            <div class="space-y-4">
              <label class="cms-label">Periode</label>
              <input v-model="modalData.period" class="cms-input" />
            </div>
          </template>

          <!-- CERTIFICATIONS FORM -->
          <template v-else-if="modalType === 'certifications'">
            <div class="space-y-4">
              <label class="cms-label">Judul Sertifikasi</label>
              <input v-model="modalData.title" class="cms-input" />
              <label class="cms-label">Penerbit</label>
              <input v-model="modalData.issuer" class="cms-input" />
            </div>
            <div class="space-y-4">
              <label class="cms-label">Tanggal</label>
              <input v-model="modalData.date" class="cms-input" />
            </div>
          </template>
        </div>

        <div class="mt-12 flex gap-4">
          <button @click="handleSave" class="brutalist-btn bg-accent text-black flex-1 text-xl font-black">SIMPAN DATA</button>
          <button @click="closeModal" class="brutalist-btn bg-white text-black px-12 font-black">BATAL</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cms-input {
  @apply w-full bg-neutral-900 border-2 border-white/20 p-3 md:p-4 focus:border-accent focus:bg-black outline-none font-bold text-white transition-all rounded-xl;
}
.cms-label {
  @apply block text-[10px] uppercase font-black tracking-widest opacity-40 mb-2;
}
.brutalist-card {
  @apply bg-black border-4 border-white p-6 transition-all duration-300 rounded-3xl relative;
}
.brutalist-btn {
  @apply bg-white text-black font-black px-6 py-3 border-4 border-black transition-all uppercase inline-flex items-center justify-center rounded-xl shadow-[4px_4px_0px_0px_black];
}
.brutalist-btn:hover {
  @apply -translate-x-1 -translate-y-1 shadow-[8px_8px_0px_0px_black];
}
.brutalist-btn:active {
  @apply translate-x-0 translate-y-0 shadow-none;
}
.badge {
  @apply border-2 border-white px-3 py-1 text-[10px] font-black uppercase rounded-full bg-neutral-900;
}
</style>
