<script setup>
const password = ref('')
const error = ref('')

const { fetch: refreshSession } = useUserSession()

async function login() {
  if (!password.value) {
    error.value = 'PASSWORD TIDAK BOLEH KOSONG!'
    return
  }

  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: { password: password.value }
    })
    await refreshSession()
    navigateTo('/admin')
  } catch (e) {
    if (e.statusCode === 401) {
      error.value = 'SALAH PASSWORD, COBA LAGI!'
    } else {
      error.value = 'TERJADI KESALAHAN, COBA LAGI!'
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
    <div class="brutalist-card max-w-md w-full">
      <h1 class="text-4xl mb-8 uppercase">Akses Management</h1>
      <div v-if="error" class="bg-red-600 text-white p-4 mb-6 font-black uppercase text-sm">
        {{ error }}
      </div>
      <div class="space-y-6">
        <div>
          <label class="block uppercase font-black mb-2">Password</label>
          <input 
            v-model="password" 
            type="password" 
            class="w-full bg-black border-4 border-white p-3 focus:border-accent outline-none font-bold"
            @keyup.enter="login"
          />
        </div>
        <button @click="login" class="brutalist-btn bg-accent text-black w-full">MASUK</button>
      </div>
      <div class="mt-8 text-xs opacity-50 font-mono text-center">
        PORTFOLIO MANAGEMENT SYSTEM v1.0
      </div>
    </div>
    <!-- Outside the card for subtle look -->
    <div class="mt-8 text-center">
        <NuxtLink to="/" class="text-xs uppercase font-black tracking-widest opacity-40 hover:opacity-100 transition-opacity underline decoration-1 underline-offset-4">
            ← Back to Portfolio
        </NuxtLink>
    </div>
  </div>
</template>
