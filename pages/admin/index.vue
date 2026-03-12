<script setup>
definePageMeta({
  middleware: 'auth'
})

const { data: portfolio, refresh, pending } = await useFetch('/api/portfolio')
const activeTab = ref('profile')
const isSaving = ref(false)

async function updateProfile() {
  isSaving.value = true
  try {
    await $fetch('/api/profile', {
      method: 'PATCH',
      body: portfolio.value.profile
    })
    await refresh()
  } finally {
    isSaving.value = false
  }
}

async function onPhotoSelected(e) {
  const file = e.target.files[0]
  if (!file) return
  
  if (file.size > 2 * 1024 * 1024) {
    alert('File terlalu besar! Maksimal 2MB.')
    return
  }

  const reader = new FileReader()
  reader.onload = async (event) => {
    portfolio.value.profile.photoUrl = event.target.result
    // Auto save photo URL to DB
    await updateProfile()
  }
  reader.readAsDataURL(file)
}

async function saveExperience(exp) {
    isSaving.value = true
    try {
        if (exp.id) {
            await $fetch('/api/experiences', { method: 'PATCH', body: exp })
        } else {
            await $fetch('/api/experiences', { method: 'POST', body: exp })
        }
        await refresh()
    } finally {
        isSaving.value = false
    }
}

async function deleteExperience(id) {
    if (confirm('Delete this experience?')) {
        isSaving.value = true
        try {
            await $fetch(`/api/experiences?id=${id}`, { method: 'DELETE' })
            await refresh()
        } finally {
            isSaving.value = false
        }
    }
}

async function addSkill(category) {
    const name = prompt(`Add new ${category} skill:`)
    if (name) {
        isSaving.value = true
        try {
            await $fetch('/api/skills', { method: 'POST', body: { name, category } })
            await refresh()
        } finally {
            isSaving.value = false
        }
    }
}

async function deleteSkill(id) {
    isSaving.value = true
    try {
        await $fetch(`/api/skills?id=${id}`, { method: 'DELETE' })
        await refresh()
    } finally {
        isSaving.value = false
    }
}

async function saveEducation(item) {
    isSaving.value = true
    try {
        if (item.id) {
            await $fetch('/api/education', { method: 'PATCH', body: item })
        } else {
            await $fetch('/api/education', { method: 'POST', body: item })
        }
        await refresh()
    } finally {
        isSaving.value = false
    }
}

async function deleteEducation(id) {
    if (confirm('Delete this education entry?')) {
        isSaving.value = true
        try {
            await $fetch(`/api/education?id=${id}`, { method: 'DELETE' })
            await refresh()
        } finally {
            isSaving.value = false
        }
    }
}

async function saveOrg(item) {
    isSaving.value = true
    try {
        if (item.id) {
            await $fetch('/api/organizations', { method: 'PATCH', body: item })
        } else {
            await $fetch('/api/organizations', { method: 'POST', body: item })
        }
        await refresh()
    } finally {
        isSaving.value = false
    }
}

async function deleteOrg(id) {
    if (confirm('Delete this organization entry?')) {
        isSaving.value = true
        try {
            await $fetch(`/api/organizations?id=${id}`, { method: 'DELETE' })
            await refresh()
        } finally {
            isSaving.value = false
        }
    }
}

async function saveCert(item) {
    isSaving.value = true
    try {
        if (item.id) {
            await $fetch('/api/certifications', { method: 'PATCH', body: item })
        } else {
            await $fetch('/api/certifications', { method: 'POST', body: item })
        }
        await refresh()
    } finally {
        isSaving.value = false
    }
}

async function deleteCert(id) {
    if (confirm('Delete this certification?')) {
        isSaving.value = true
        try {
            await $fetch(`/api/certifications?id=${id}`, { method: 'DELETE' })
            await refresh()
        } finally {
            isSaving.value = false
        }
    }
}

async function saveProject(item) {
    isSaving.value = true
    try {
        if (item.id) {
            await $fetch('/api/projects', { method: 'PATCH', body: item })
        } else {
            await $fetch('/api/projects', { method: 'POST', body: item })
        }
        await refresh()
    } finally {
        isSaving.value = false
    }
}

async function deleteProject(id) {
    if (confirm('Delete this project?')) {
        isSaving.value = true
        try {
            await $fetch(`/api/projects?id=${id}`, { method: 'DELETE' })
            await refresh()
        } finally {
            isSaving.value = false
        }
    }
}

async function onProjectPhotoSelected(e, project) {
  const file = e.target.files[0]
  if (!file) return
  
  if (file.size > 2 * 1024 * 1024) {
    alert('File terlalu besar! Maksimal 2MB.')
    return
  }

  const reader = new FileReader()
  reader.onload = async (event) => {
    project.imageUrl = event.target.result
  }
  reader.readAsDataURL(file)
}

const { clear: clearSession } = useUserSession()

async function logout() {
    await $fetch('/api/logout', { method: 'POST' })
    await clearSession()
    navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Full-page loading overlay -->
    <div v-if="isSaving" class="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center backdrop-blur-sm">
        <div class="text-4xl font-black animate-bounce tracking-widest text-accent">MENYIMPAN...</div>
    </div>

    <nav class="p-6 border-b-4 border-white flex justify-between items-center bg-neutral-950 sticky top-0 z-50">
        <h1 class="text-2xl font-black">MNA CMS</h1>
        <div class="flex gap-4">
            <button @click="logout" class="badge bg-red-600 border-red-600 text-white cursor-pointer">LOGOUT</button>
            <a href="/" target="_blank" class="badge bg-white text-black">VIEW PORTFOLIO</a>
        </div>
    </nav>

    <div class="p-8">
        <div class="flex flex-wrap gap-4 mb-12">
            <button v-for="tab in ['profile', 'projects', 'experiences', 'skills', 'education', 'organizations', 'certifications']" 
                :key="tab"
                @click="activeTab = tab"
                class="brutalist-btn text-xs"
                :class="activeTab === tab ? 'bg-accent' : 'bg-white opacity-50'"
            >
                {{ tab }}
            </button>
        </div>

        <div v-if="portfolio" class="max-w-6xl">
            <!-- Project Manager -->
            <section v-if="activeTab === 'projects'" class="space-y-8">
                <button @click="saveProject({ title: 'New Project', description: '', techs: '', order: 0, stats: '[]', features: '[]' })" class="brutalist-btn bg-soft-blue text-black font-black">+ ADD PROJECT</button>
                <div v-for="project in portfolio.projects" :key="project.id" class="brutalist-card bg-neutral-900 border-white/20">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <label class="block text-xs uppercase font-black text-white/40">Project Title</label>
                            <input v-model="project.title" class="cms-input" placeholder="Project Title" />
                            
                            <label class="block text-xs uppercase font-black text-white/40">Tech Stack (comma separated)</label>
                            <input v-model="project.techs" class="cms-input" placeholder="e.g. PHP, Laravel, Tailwind" />
                            
                            <label class="block text-xs uppercase font-black text-white/40">Demo URL</label>
                            <input v-model="project.demoUrl" class="cms-input" placeholder="https://..." />
                            
                            <label class="block text-xs uppercase font-black text-white/40">GitHub URL</label>
                            <input v-model="project.githubUrl" class="cms-input" placeholder="https://github.com/..." />
                        </div>
                        <div class="space-y-4">
                            <label class="block text-xs uppercase font-black text-white/40">Project Screenshot</label>
                            <div class="flex items-center gap-4">
                                <div v-if="project.imageUrl" class="w-24 h-16 border-2 border-white overflow-hidden bg-black">
                                    <img :src="project.imageUrl" class="w-full h-full object-cover" />
                                </div>
                                <input type="file" @change="(e) => onProjectPhotoSelected(e, project)" accept="image/*" class="text-xs file:brutalist-btn file:bg-white file:text-black file:mr-4" />
                            </div>

                            <label class="block text-xs uppercase font-black text-white/40">Admin Credentials</label>
                            <input v-model="project.credentials" class="cms-input" placeholder="Email: ... | Password: ..." />

                            <label class="block text-xs uppercase font-black text-white/40">Stats (JSON format)</label>
                            <textarea v-model="project.stats" class="cms-input h-20 font-mono text-xs" placeholder='[{"label": "DB", "value": "6", "icon": "database"}]'></textarea>
                        </div>

                        <div class="md:col-span-2 space-y-4">
                            <label class="block text-xs uppercase font-black text-white/40">Description</label>
                            <textarea v-model="project.description" class="cms-input h-24" placeholder="Description"></textarea>
                            
                            <label class="block text-xs uppercase font-black text-white/40">Features (JSON Array)</label>
                            <textarea v-model="project.features" class="cms-input h-24 font-mono text-xs" placeholder='["Feature 1", "Feature 2"]'></textarea>
                        </div>
                    </div>
                    <div class="flex gap-4 mt-8">
                        <button @click="saveProject(project)" class="brutalist-btn bg-accent text-black flex-1">UPDATE PROJECT</button>
                        <button @click="deleteProject(project.id)" class="brutalist-btn bg-red-600 text-white">DELETE</button>
                    </div>
                </div>
            </section>

            <!-- Profile Editor -->
            <section v-if="activeTab === 'profile'" class="brutalist-card">
                <h2 class="text-3xl mb-8 uppercase">Edit Profile</h2>
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="space-y-4">
                        <label class="block uppercase font-black">Name</label>
                        <input v-model="portfolio.profile.name" class="cms-input" />
                        
                        <label class="block uppercase font-black">Role</label>
                        <input v-model="portfolio.profile.role" class="cms-input" />

                        <label class="block uppercase font-black">Profile Photo</label>
                        <div class="flex items-center gap-4">
                            <div v-if="portfolio.profile.photoUrl" class="w-16 h-16 border-2 border-white overflow-hidden">
                                <img :src="portfolio.profile.photoUrl" class="w-full h-full object-cover" />
                            </div>
                            <input type="file" @change="onPhotoSelected" accept="image/*" class="text-xs file:brutalist-btn file:bg-white file:text-black file:mr-4" />
                        </div>

                        <label class="block uppercase font-black">Email</label>
                        <input v-model="portfolio.profile.email" class="cms-input" />
                    </div>
                    <div class="space-y-4">
                        <label class="block uppercase font-black">Description</label>
                        <textarea v-model="portfolio.profile.description" class="cms-input h-32"></textarea>

                        <label class="block uppercase font-black">Bio</label>
                        <textarea v-model="portfolio.profile.bio" class="cms-input h-32"></textarea>
                    </div>
                </div>
                <button @click="updateProfile" class="brutalist-btn bg-accent text-black w-full mt-8">SAVE PROFILE CHANGES</button>
            </section>

            <!-- Experience Manager -->
            <section v-if="activeTab === 'experiences'" class="space-y-8">
                <button @click="saveExperience({ company: 'New Company', role: 'Role', period: '2024', description: '' })" class="brutalist-btn bg-accent-yellow text-black font-black">+ ADD EXPERIENCE</button>
                <div v-for="exp in portfolio.experiences" :key="exp.id" class="brutalist-card bg-neutral-900">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <input v-model="exp.company" class="cms-input" placeholder="Company" />
                        <input v-model="exp.role" class="cms-input" placeholder="Role" />
                        <input v-model="exp.period" class="cms-input" placeholder="Period" />
                        <textarea v-model="exp.description" class="cms-input md:col-span-3 h-32" placeholder="Description"></textarea>
                    </div>
                    <div class="flex gap-4 mt-6">
                        <button @click="saveExperience(exp)" class="brutalist-btn bg-accent text-black flex-1">UPDATE</button>
                        <button @click="deleteExperience(exp.id)" class="brutalist-btn bg-red-600 text-white">DELETE</button>
                    </div>
                </div>
            </section>

            <!-- Skills Manager -->
            <section v-if="activeTab === 'skills'" class="grid md:grid-cols-2 gap-12">
                <div class="brutalist-card">
                    <h3 class="text-2xl mb-6 bg-accent text-black px-2 inline-block">HARD SKILLS</h3>
                    <div class="flex flex-wrap gap-2 mb-6">
                        <div v-for="skill in portfolio.skills.filter(s => s.category === 'hard')" :key="skill.id" class="group relative">
                            <span class="badge bg-neutral-800">{{ skill.name }}</span>
                            <button @click="deleteSkill(skill.id)" class="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                        </div>
                    </div>
                    <button @click="addSkill('hard')" class="text-xs underline hover:text-accent font-black">+ ADD HARD SKILL</button>
                </div>
                <div class="brutalist-card">
                    <h3 class="text-2xl mb-6 bg-accent-yellow text-black px-2 inline-block">SOFTWARE</h3>
                    <div class="flex flex-wrap gap-2 mb-6">
                        <div v-for="skill in portfolio.skills.filter(s => s.category === 'software')" :key="skill.id" class="group relative">
                            <span class="badge bg-neutral-800">{{ skill.name }}</span>
                            <button @click="deleteSkill(skill.id)" class="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                        </div>
                    </div>
                    <button @click="addSkill('software')" class="text-xs underline hover:text-accent-yellow font-black">+ ADD SOFTWARE</button>
                </div>
            </section>

            <!-- Education Manager -->
            <section v-if="activeTab === 'education'" class="space-y-8">
                <button @click="saveEducation({ institution: 'New Institution', degree: 'Degree', period: '2024' })" class="brutalist-btn bg-accent text-black font-black">+ ADD EDUCATION</button>
                <div v-for="edu in portfolio.education" :key="edu.id" class="brutalist-card bg-neutral-900">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <input v-model="edu.institution" class="cms-input" placeholder="Institution" />
                        <input v-model="edu.degree" class="cms-input" placeholder="Degree" />
                        <input v-model="edu.period" class="cms-input" placeholder="Period" />
                        <input v-model="edu.gpa" class="cms-input md:col-span-3" placeholder="GPA (optional)" />
                    </div>
                    <div class="flex gap-4 mt-6">
                        <button @click="saveEducation(edu)" class="brutalist-btn bg-accent text-black flex-1">UPDATE</button>
                        <button @click="deleteEducation(edu.id)" class="brutalist-btn bg-red-600 text-white">DELETE</button>
                    </div>
                </div>
            </section>

            <!-- Organizations Manager -->
            <section v-if="activeTab === 'organizations'" class="space-y-8">
                <button @click="saveOrg({ org: 'New Org', role: 'Role', period: '2024' })" class="brutalist-btn bg-accent-yellow text-black font-black">+ ADD ORGANIZATION</button>
                <div v-for="org in portfolio.organizations" :key="org.id" class="brutalist-card bg-neutral-900">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <input v-model="org.org" class="cms-input" placeholder="Organization" />
                        <input v-model="org.role" class="cms-input" placeholder="Role" />
                        <input v-model="org.period" class="cms-input" placeholder="Period" />
                    </div>
                    <div class="flex gap-4 mt-6">
                        <button @click="saveOrg(org)" class="brutalist-btn bg-accent text-black flex-1">UPDATE</button>
                        <button @click="deleteOrg(org.id)" class="brutalist-btn bg-red-600 text-white">DELETE</button>
                    </div>
                </div>
            </section>

            <!-- Certifications Manager -->
            <section v-if="activeTab === 'certifications'" class="space-y-8">
                <button @click="saveCert({ title: 'New Cert', issuer: 'Issuer', date: '2024' })" class="brutalist-btn bg-white text-black font-black">+ ADD CERTIFICATION</button>
                <div v-for="cert in portfolio.certifications" :key="cert.id" class="brutalist-card bg-neutral-900 font-mono">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <input v-model="cert.title" class="cms-input" placeholder="Title" />
                        <input v-model="cert.issuer" class="cms-input" placeholder="Issuer" />
                        <input v-model="cert.date" class="cms-input" placeholder="Date" />
                    </div>
                    <div class="flex gap-4 mt-6">
                        <button @click="saveCert(cert)" class="brutalist-btn bg-accent text-black flex-1 font-sans">UPDATE</button>
                        <button @click="deleteCert(cert.id)" class="brutalist-btn bg-red-600 text-white font-sans">DELETE</button>
                    </div>
                </div>
            </section>
        </div>
    </div>
  </div>
</template>

<style scoped>
.cms-input {
    @apply w-full bg-black border-4 border-white p-3 focus:border-accent outline-none font-bold text-white transition-colors;
}
</style>
