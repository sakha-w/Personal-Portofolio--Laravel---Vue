<script setup lang="ts">
import { ref } from 'vue';

const API_BASE = import.meta.env.PUBLIC_API_BASE ?? 'http://localhost:8000/api';
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
      <h2 class="text-2xl font-medium tracking-tight">A good place to start.</h2>
      <p class="mt-4 text-sm text-muted">Tell me a bit about the role or project you have in mind. I'm happy to share more about my work, too.</p>
      <div class="mt-9 space-y-6">
        <div><p class="mb-2 text-xs text-muted">Email</p><a href="mailto:sakhawibisono77@gmail.com" class="text-link break-all">sakhawibisono77@gmail.com</a></div>
        <div><p class="mb-2 text-xs text-muted">Phone</p><a href="tel:+6289614040447" class="text-link"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#phone" /></svg>+62 896-1404-0447</a></div>
        <div><p class="mb-2 text-xs text-muted">Elsewhere</p><a href="https://linkedin.com/in/sakha-wibisono/" class="text-link" target="_blank" rel="noopener noreferrer"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#linkedin" /></svg>Connect on LinkedIn <svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-up-right" /></svg></a></div>
      </div>
      <p class="mt-9 border-t border-line pt-6 text-xs text-muted">English or Bahasa Indonesia — either is welcome.</p>
    </aside>
    <section class="glass-card p-7 sm:p-9" aria-labelledby="message-title">
      <h2 id="message-title" class="text-2xl font-medium tracking-tight">Leave me a note</h2>
      <p class="mt-2 mb-7 text-sm text-muted">Your name, email, and message are all I need.</p>
      <form @submit.prevent="submit" class="space-y-5" :aria-busy="sending">
        <div class="grid gap-5 sm:grid-cols-2">
          <div><label for="cf-name" class="field-label">Your name</label><input id="cf-name" v-model="form.name" class="field" name="name" autocomplete="name" maxlength="255" placeholder="Alex" required /></div>
          <div><label for="cf-email" class="field-label">Email address</label><input id="cf-email" v-model="form.email" class="field" name="email" type="email" autocomplete="email" maxlength="255" placeholder="alex@company.com" required /></div>
        </div>
        <div><label for="cf-subject" class="field-label">Subject <span class="text-xs text-muted">(optional)</span></label><input id="cf-subject" v-model="form.subject" class="field" name="subject" maxlength="255" placeholder="A role, a project, or a quick hello" /></div>
        <div><label for="cf-message" class="field-label">Your message</label><textarea id="cf-message" v-model="form.message" class="field resize-y" name="message" rows="6" maxlength="5000" placeholder="Hi Sakha, I'd like to talk about…" required></textarea></div>
        <p v-if="feedback" :role="success ? 'status' : 'alert'" class="rounded-lg border border-line bg-white/5 p-4 text-sm" :class="success ? 'text-accent' : 'text-[#e4bdb4]'">{{ feedback }}</p>
        <button type="submit" class="button button-primary w-full sm:w-auto" :disabled="sending">{{ sending ? 'Sending…' : 'Send message' }}<svg class="icon" aria-hidden="true"><use :href="`/icons/tabler.svg#${success ? 'check' : 'arrow-up-right'}`" /></svg></button>
      </form>
    </section>
  </div>
</template>
