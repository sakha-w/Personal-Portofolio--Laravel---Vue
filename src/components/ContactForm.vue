<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="glass rounded-2xl p-6 sm:p-8">
      <h2 class="text-sm font-bold uppercase tracking-wider text-indigo-400">Contact Information</h2>
      <div class="mt-4 space-y-3 text-sm text-slate-300">
        <p><span class="text-slate-500">Email:</span> sakhawibisono77@gmail.com</p>
        <p><span class="text-slate-500">Phone:</span> (+62) 896-1404-0447</p>
        <p><span class="text-slate-500">LinkedIn:</span> <a href="https://linkedin.com/in/sakha-wibisono" target="_blank" class="text-indigo-400">linkedin.com/in/sakha-wibisono ↗</a></p>
        <p><span class="text-slate-500">Location:</span> Bandung, Indonesia</p>
      </div>
    </div>
    <div class="glass rounded-2xl p-6 sm:p-8">
      <h2 class="text-sm font-bold uppercase tracking-wider text-indigo-400">Send a Message</h2>
      <form @submit.prevent="submit" class="mt-4 space-y-4">
        <div>
          <label class="text-xs text-slate-400" for="cf-name">Your Name *</label>
          <input id="cf-name" v-model="form.name" required placeholder="Enter your full name"
            class="mt-1 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500" />
        </div>
        <div>
          <label class="text-xs text-slate-400" for="cf-email">Email Address *</label>
          <input id="cf-email" v-model="form.email" type="email" required placeholder="name@company.com"
            class="mt-1 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500" />
        </div>
        <div>
          <label class="text-xs text-slate-400" for="cf-subject">Subject</label>
          <input id="cf-subject" v-model="form.subject" placeholder="Opportunity, collaboration, ..."
            class="mt-1 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500" />
        </div>
        <div>
          <label class="text-xs text-slate-400" for="cf-message">Message *</label>
          <textarea id="cf-message" v-model="form.message" required rows="4" placeholder="Hi Sakha, ..."
            class="mt-1 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"></textarea>
        </div>
        <p v-if="feedback" :class="['text-xs', success ? 'text-emerald-400' : 'text-red-400']">{{ feedback }}</p>
        <button type="submit" :disabled="sending"
          class="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium disabled:opacity-50">
          {{ sending ? 'Sending...' : 'Send Message' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const API_BASE = 'http://localhost:8000/api';
const form = ref({ name: '', email: '', subject: '', message: '' });
const sending = ref(false);
const feedback = ref('');
const success = ref(false);

async function submit() {
  feedback.value = '';
  success.value = false;
  sending.value = true;
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(form.value),
    });
    const json = await res.json();
    if (res.ok && (json.success ?? true)) {
      success.value = true;
      feedback.value = json.message ?? 'Your message has been sent successfully.';
      form.value = { name: '', email: '', subject: '', message: '' };
    } else {
      feedback.value = json.message ?? 'Failed to send message. Please check your input.';
    }
  } catch {
    feedback.value = 'Network error. Make sure the Laravel API is running.';
  } finally {
    sending.value = false;
  }
}
</script>
