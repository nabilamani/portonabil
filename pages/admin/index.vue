<script setup>
definePageMeta({
  middleware: 'auth'
})

const { data: portfolio, refresh } = await useFetch('/api/portfolio')
const activeTab = ref('profile')

async function updateProfile() {
  await $fetch('/api/profile', {
    method: 'PATCH',
    body: portfolio.value.profile
  })
  alert('Profile Updated!')
  refresh()
}

async function saveExperience(exp) {
    if (exp.id) {
        await $fetch('/api/experiences', { method: 'PATCH', body: exp })
    } else {
        await $fetch('/api/experiences', { method: 'POST', body: exp })
    }
    refresh()
}

async function deleteExperience(id) {
    if (confirm('Delete this experience?')) {
        await $fetch(`/api/experiences?id=${id}`, { method: 'DELETE' })
        refresh()
    }
}

async function addSkill(category) {
    const name = prompt(`Add new ${category} skill:`)
    if (name) {
        await $fetch('/api/skills', { method: 'POST', body: { name, category } })
        refresh()
    }
}

async function deleteSkill(id) {
    await $fetch(`/api/skills?id=${id}`, { method: 'DELETE' })
    refresh()
}

async function logout() {
    await $fetch('/api/logout', { method: 'POST' })
    navigateTo('/')
}
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <nav class="p-6 border-b-4 border-white flex justify-between items-center bg-neutral-950 sticky top-0 z-50">
        <h1 class="text-2xl font-black">MNA CMS</h1>
        <div class="flex gap-4">
            <button @click="logout" class="badge bg-red-600 border-red-600 text-white cursor-pointer">LOGOUT</button>
            <a href="/" target="_blank" class="badge bg-white text-black">VIEW PORTFOLIO</a>
        </div>
    </nav>

    <div class="p-8">
        <div class="flex flex-wrap gap-4 mb-12">
            <button v-for="tab in ['profile', 'experiences', 'skills', 'education']" 
                :key="tab"
                @click="activeTab = tab"
                class="brutalist-btn text-xs"
                :class="activeTab === tab ? 'bg-accent' : 'bg-white opacity-50'"
            >
                {{ tab }}
            </button>
        </div>

        <div v-if="portfolio" class="max-w-6xl">
            <!-- Profile Editor -->
            <section v-if="activeTab === 'profile'" class="brutalist-card">
                <h2 class="text-3xl mb-8 uppercase">Edit Profile</h2>
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="space-y-4">
                        <label class="block uppercase font-black">Name</label>
                        <input v-model="portfolio.profile.name" class="cms-input" />
                        
                        <label class="block uppercase font-black">Role</label>
                        <input v-model="portfolio.profile.role" class="cms-input" />

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
        </div>
    </div>
  </div>
</template>

<style scoped>
.cms-input {
    @apply w-full bg-black border-4 border-white p-3 focus:border-accent outline-none font-bold text-white transition-colors;
}
</style>
