<script setup lang="ts">
import { ref } from 'vue';

const API_BASE = '/api';
const form = ref({ name: '', email: '', subject: '', message: '' });
const sending = ref(false);
const feedback = ref('');
const success = ref(false);

async function submit() {
  if (sending.value) return;
  feedback.value = '';
  success.value = false;
  sending.value = true;
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form.value),
    });
    const json = await res.json();
    if (res.ok && json.success) {
      success.value = true;
      feedback.value = "Thanks for the message. I'll get back to you by email.";
      form.value = { name: '', email: '', subject: '', message: '' };
    } else {
      feedback.value = res.status === 429
        ? 'A few too many messages at once. Please wait a minute and try again.'
        : json.message ?? "Your message wasn't sent. Please check the fields and try again.";
    }
  } catch {
    feedback.value = "I couldn't receive your message just now. Please try again, or email me directly.";
  } finally {
    sending.value = false;
  }
}
</script>

<template>
  <div class="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
    <aside class="glass-card flex flex-col p-7 sm:p-9" aria-label="Contact details">
      <span class="icon-box mb-7"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#mail" /></svg></span>
      <p class="eyebrow">A good place to start</p>
      <h2 class="mt-4 text-2xl font-medium tracking-tight">Tell me what you're working on.</h2>
      <p class="mt-4 text-sm text-muted">You do not need to have everything figured out. A brief description of the role or project is enough to start a real conversation. I am happy to share more about my own work too if that helps.</p>
      <div class="mt-9 space-y-6">
        <div><p class="mb-2 text-xs text-muted">Email</p><a href="mailto:sakhawibisono77@gmail.com" class="text-link break-all">sakhawibisono77@gmail.com</a></div>
        <div><p class="mb-2 text-xs text-muted">Phone</p><a href="tel:+6289614040447" class="text-link"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#phone" /></svg>+62 896-1404-0447</a></div>
        <div><p class="mb-2 text-xs text-muted">Elsewhere</p><a href="https://linkedin.com/in/sakha-wibisono/" class="text-link" target="_blank" rel="noopener noreferrer"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#linkedin" /></svg>Connect on LinkedIn <svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-up-right" /></svg></a></div>
      </div>
      <p class="mt-9 border-t border-line pt-6 text-xs text-muted">Indonesian or English, either works fine.</p>
    </aside>
    <section class="glass-card p-7 sm:p-9" aria-label="Contact form">
      <form @submit.prevent="submit" class="space-y-5" :aria-busy="sending">
        <div class="grid gap-5 sm:grid-cols-2">
          <div><label for="cf-name" class="field-label">Your name</label><input id="cf-name" v-model="form.name" class="field" name="name" autocomplete="name" maxlength="255" placeholder="e.g. Budi Santoso" required /></div>
          <div><label for="cf-email" class="field-label">Email address</label><input id="cf-email" v-model="form.email" class="field" name="email" type="email" autocomplete="email" maxlength="255" placeholder="you@example.com" required /></div>
        </div>
        <div><label for="cf-subject" class="field-label">Subject <span class="text-xs text-muted">(optional)</span></label><input id="cf-subject" v-model="form.subject" class="field" name="subject" maxlength="255" placeholder="What is this about?" /></div>
        <div><label for="cf-message" class="field-label">Your message</label><textarea id="cf-message" v-model="form.message" class="field resize-y" name="message" rows="6" maxlength="5000" placeholder="Tell me a bit about what you are working on..." required></textarea></div>
        <p v-if="feedback" :role="success ? 'status' : 'alert'" class="rounded-lg border border-line bg-white/5 p-4 text-sm" :class="success ? 'text-accent' : 'text-[#e4bdb4]'">{{ feedback }}</p>
        <button type="submit" class="button button-primary w-full sm:w-auto" :disabled="sending">{{ sending ? 'Sending...' : 'Send message' }}<svg class="icon" aria-hidden="true"><use :href="`/icons/tabler.svg#${success ? 'check' : 'arrow-up-right'}`" /></svg></button>
      </form>
    </section>
  </div>
</template>
