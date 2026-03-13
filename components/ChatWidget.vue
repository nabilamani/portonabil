<script setup>
import { MessageSquare, X, Send, User, ChevronDown, Rocket } from 'lucide-vue-next'

// --- State ---
const isOpen = ref(false)
const step = ref('idle') // 'idle' | 'name-input' | 'chatting'
const visitorName = ref('')
const nameInput = ref('')
const sessionId = ref(null)
const messages = ref([])
const inputText = ref('')
const isSending = ref(false)
const isStarting = ref(false)
const messagesEnd = ref(null)
const hasNewMessage = ref(false)

let pollTimer = null

// --- Restore session from localStorage ---
onMounted(() => {
  const savedSession = localStorage.getItem('chat_session')
  if (savedSession) {
    try {
      const parsed = JSON.parse(savedSession)
      sessionId.value = parsed.sessionId
      visitorName.value = parsed.visitorName
      step.value = 'chatting'
      startPolling()
    } catch {
      localStorage.removeItem('chat_session')
    }
  }
})

onUnmounted(() => stopPolling())

// --- Toggle chat open/close ---
function toggleChat() {
  isOpen.value = !isOpen.value
  hasNewMessage.value = false
  if (isOpen.value && step.value === 'idle') {
    step.value = 'name-input'
  }
  if (isOpen.value) {
    nextTick(() => scrollToBottom())
  }
}

// --- Start session with name ---
async function startChat() {
  if (!nameInput.value.trim()) return
  isStarting.value = true
  try {
    const res = await $fetch('/api/chat/sessions', {
      method: 'POST',
      body: { visitorName: nameInput.value.trim() }
    })
    sessionId.value = res.sessionId
    visitorName.value = res.visitorName
    step.value = 'chatting'
    localStorage.setItem('chat_session', JSON.stringify({ sessionId: res.sessionId, visitorName: res.visitorName }))
    
    // Send a greeting system message
    await sendSystemGreeting()
    startPolling()
  } catch (e) {
    console.error('Failed to start chat session:', e)
  } finally {
    isStarting.value = false
  }
}

async function sendSystemGreeting() {
  await $fetch('/api/chat/messages', {
    method: 'POST',
    body: {
      sessionId: sessionId.value,
      content: `Halo ${visitorName.value}! Terima kasih sudah menghubungi. Pesan Anda telah diterima dan saya akan segera membalas! - Nabil`,
      senderType: 'admin'
    }
  })
}

// --- Send a message ---
async function sendMessage() {
  if (!inputText.value.trim() || isSending.value) return
  isSending.value = true
  const content = inputText.value.trim()
  inputText.value = ''
  
  // Optimistic UI
  messages.value.push({
    id: Date.now(),
    sessionId: sessionId.value,
    content,
    senderType: 'visitor',
    createdAt: Math.floor(Date.now() / 1000)
  })
  nextTick(() => scrollToBottom())

  try {
    await $fetch('/api/chat/messages', {
      method: 'POST',
      body: { sessionId: sessionId.value, content, senderType: 'visitor' }
    })
  } catch (e) {
    console.error('Failed to send message:', e)
  } finally {
    isSending.value = false
  }
}

function handleKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

// --- Polling ---
function startPolling() {
  fetchMessages()
  pollTimer = setInterval(fetchMessages, 3000)
}

function stopPolling() {
  if (pollTimer) clearInterval(pollTimer)
}

async function fetchMessages() {
  if (!sessionId.value) return
  try {
    const res = await $fetch(`/api/chat/messages?sessionId=${sessionId.value}`)
    const oldCount = messages.value.length
    messages.value = res.messages || []
    
    // Show new message badge if chat is closed
    if (!isOpen.value && messages.value.length > oldCount) {
      hasNewMessage.value = true
    }
    nextTick(() => {
      if (isOpen.value) scrollToBottom()
    })
  } catch (e) {
    // Session might be gone
    if (e?.statusCode === 404) {
      localStorage.removeItem('chat_session')
      sessionId.value = null
      step.value = 'idle'
      stopPolling()
    }
  }
}

function scrollToBottom() {
  messagesEnd.value?.scrollIntoView({ behavior: 'smooth' })
}

// --- End session ---
function endSession() {
  if (confirm('Akhiri sesi chat ini?')) {
    stopPolling()
    localStorage.removeItem('chat_session')
    sessionId.value = null
    visitorName.value = ''
    nameInput.value = ''
    messages.value = []
    step.value = 'idle'
    isOpen.value = false
  }
}

function formatTime(ts) {
  return new Date(ts * 1000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <!-- Floating Chat Button -->
  <div class="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">
    <!-- Chat Window -->
    <Transition name="chat-slide">
      <div v-if="isOpen" class="w-[340px] sm:w-[380px] bg-[#0a0a0a] border-[3px] border-white rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)]">
        
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 bg-black border-b-[3px] border-white">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-soft-green border-2 border-black flex items-center justify-center">
              <MessageSquare :size="18" class="text-black" />
            </div>
            <div>
              <p class="font-black text-sm text-white uppercase tracking-tight">Live Chat</p>
              <div class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-soft-green animate-pulse"></span>
                <p class="text-[10px] text-white/50 font-bold uppercase">Online</p>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button v-if="step === 'chatting'" @click="endSession" class="text-[10px] font-black uppercase text-white/30 hover:text-red-400 transition-colors">Akhiri</button>
            <button @click="isOpen = false" class="w-7 h-7 flex items-center justify-center text-white hover:text-soft-green transition-colors">
              <ChevronDown :size="18" />
            </button>
          </div>
        </div>

        <!-- STEP: Name Input -->
        <div v-if="step === 'name-input'" class="p-6 space-y-6">
          <div class="text-center space-y-2">
            <div class="w-16 h-16 mx-auto bg-soft-purple border-[3px] border-white rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
              <User :size="32" class="text-white" />
            </div>
            <p class="font-black text-white text-lg uppercase">Mulai Chat</p>
            <p class="text-white/60 text-sm font-medium">Masukkan nama Anda untuk melanjutkan</p>
          </div>

          <div class="space-y-3">
            <input
              v-model="nameInput"
              @keydown.enter="startChat"
              type="text"
              placeholder="Nama kamu..."
              maxlength="50"
              class="w-full bg-neutral-900 border-[3px] border-white/20 focus:border-soft-green rounded-xl px-4 py-3 text-white font-bold text-sm placeholder:text-white/30 outline-none transition-colors"
            />
            <button
              @click="startChat"
              :disabled="!nameInput.trim() || isStarting"
              class="w-full bg-soft-green text-black font-black uppercase py-3 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <template v-if="isStarting">
                Memulai...
              </template>
              <template v-else>
                <Rocket :size="18" />
                Mulai Chat
              </template>
            </button>
          </div>
        </div>

        <!-- STEP: Chat Window -->
        <div v-else-if="step === 'chatting'" class="flex flex-col h-[380px]">
          <!-- Visitor banner -->
          <div class="px-4 py-2 bg-neutral-900 border-b border-white/10 flex items-center gap-2">
            <div class="w-6 h-6 bg-soft-purple border-2 border-black rounded-full flex items-center justify-center">
              <User :size="12" class="text-white" />
            </div>
            <span class="text-xs font-black text-white/70 uppercase">{{ visitorName }}</span>
          </div>

          <!-- Messages -->
          <div class="flex-1 overflow-y-auto p-4 space-y-3 chat-scroll">
            <div v-if="messages.length === 0" class="h-full flex items-center justify-center">
              <p class="text-white/30 text-sm font-bold text-center">Belum ada pesan.<br>Kirim pesan pertama!</p>
            </div>

            <div v-for="msg in messages" :key="msg.id" class="flex" :class="msg.senderType === 'visitor' ? 'justify-end' : 'justify-start'">
              <div class="max-w-[80%] space-y-1">
                <div
                  :class="[
                    'px-4 py-2.5 rounded-2xl text-sm font-medium leading-relaxed',
                    msg.senderType === 'visitor'
                      ? 'bg-soft-purple text-white border-[2px] border-black rounded-tr-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]'
                      : 'bg-white text-black border-[2px] border-black rounded-tl-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]'
                  ]"
                >{{ msg.content }}</div>
                <p class="text-[10px] text-white/30 font-bold" :class="msg.senderType === 'visitor' ? 'text-right' : 'text-left'">
                  {{ msg.senderType === 'admin' ? 'Nabil' : visitorName }} · {{ formatTime(msg.createdAt) }}
                </p>
              </div>
            </div>
            <div ref="messagesEnd"></div>
          </div>

          <!-- Input -->
          <div class="border-t-[3px] border-white/20 p-3 flex gap-2">
            <input
              v-model="inputText"
              @keydown="handleKeydown"
              type="text"
              placeholder="Ketik pesan..."
              maxlength="500"
              class="flex-1 bg-neutral-900 border-[2px] border-white/20 focus:border-soft-green rounded-xl px-3 py-2.5 text-white text-sm font-medium placeholder:text-white/30 outline-none transition-colors"
            />
            <button
              @click="sendMessage"
              :disabled="!inputText.trim() || isSending"
              class="w-10 h-10 bg-soft-green border-[2px] border-black rounded-xl flex items-center justify-center hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <Send :size="16" class="text-black" />
            </button>
          </div>
        </div>

        <!-- STEP: Idle fallback (should not show, but just in case) -->
        <div v-else class="p-6 text-center">
          <button @click="step = 'name-input'" class="brutalist-btn">Mulai Chat</button>
        </div>
      </div>
    </Transition>

    <!-- Bubble Button -->
    <button
      @click="toggleChat"
      class="relative w-14 h-14 bg-soft-green border-[3px] border-black rounded-full flex items-center justify-center shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] transition-all"
    >
      <Transition name="icon-swap" mode="out-in">
        <X v-if="isOpen" :size="24" class="text-black" key="close" />
        <MessageSquare v-else :size="24" class="text-black" key="open" />
      </Transition>
      <!-- New message badge -->
      <span v-if="hasNewMessage && !isOpen" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-black rounded-full animate-bounce"></span>
    </button>
  </div>
</template>

<style scoped>
.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: bottom right;
}
.chat-slide-enter-from,
.chat-slide-leave-to {
  opacity: 0;
  transform: scale(0.85) translateY(16px);
}

.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: all 0.15s ease;
}
.icon-swap-enter-from,
.icon-swap-leave-to {
  opacity: 0;
  transform: scale(0.5) rotate(90deg);
}

.chat-scroll {
  scrollbar-width: thin;
  scrollbar-color: #333 transparent;
}
.chat-scroll::-webkit-scrollbar { width: 4px; }
.chat-scroll::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
</style>
