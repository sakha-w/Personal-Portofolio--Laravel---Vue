<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div class="lg:col-span-5 glass-card rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
      <div class="space-y-4">
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavender/30 border border-lavender text-ink font-mono text-xs">
          COORDINATES // REACH_OUT
        </span>
        <div>
          <h2 class="text-2xl font-bold text-ink">Direct Information</h2>
          <p class="text-sm text-muted mt-1">
            I am actively available for software engineering roles, technical internships, and innovative projects.
          </p>
        </div>

        <div class="space-y-3 pt-2 font-mono text-xs">
          <div class="p-3.5 rounded-xl glass-subtle border border-white space-y-0.5">
            <span class="text-[11px] text-muted uppercase tracking-wider block font-semibold">Email Address</span>
            <a href="mailto:sakhawibisono77@gmail.com" class="text-ink hover:text-lavender-strong transition-colors font-medium text-sm">
              sakhawibisono77@gmail.com
            </a>
          </div>

          <div class="p-3.5 rounded-xl glass-subtle border border-white space-y-0.5">
            <span class="text-[11px] text-muted uppercase tracking-wider block font-semibold">Phone & WhatsApp</span>
            <p class="text-ink font-medium text-sm">(+62) 896-1404-0447</p>
          </div>

          <div class="p-3.5 rounded-xl glass-subtle border border-white space-y-0.5">
            <span class="text-[11px] text-muted uppercase tracking-wider block font-semibold">LinkedIn Profile</span>
            <a href="https://linkedin.com/in/sakha-wibisono" target="_blank" rel="noopener noreferrer" class="text-lavender-strong hover:opacity-80 transition-opacity text-sm flex items-center gap-1">
              <span>linkedin.com/in/sakha-wibisono</span>
              <span class="text-xs">↗</span>
            </a>
          </div>

          <div class="p-3.5 rounded-xl glass-subtle border border-white space-y-0.5">
            <span class="text-[11px] text-muted uppercase tracking-wider block font-semibold">Base Location</span>
            <p class="text-ink font-medium text-sm">Bandung, West Java, Indonesia</p>
          </div>
        </div>
      </div>

      <div class="pt-4 border-t border-[#686A73]/15 flex items-center gap-2 font-mono text-xs text-mint-strong">
        <span class="w-2 h-2 rounded-full bg-mint animate-pulse"></span>
        <span>Standard Response Time: < 24 Hours</span>
      </div>
    </div>

    <div class="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 space-y-6">
      <div class="border-b border-[#686A73]/15 pb-4">
        <span class="block font-mono text-xs uppercase tracking-wider font-semibold text-lavender-strong mb-1">
          // TRANSMISSION
        </span>
        <h2 class="text-2xl font-bold text-ink mt-1">Send a Message</h2>
        <p class="text-sm text-muted mt-1">Data is processed through the Laravel REST API and stored securely.</p>
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-mono text-xs text-muted mb-1.5 uppercase tracking-wider" for="cf-name">YOUR_NAME *</label>
            <input
              id="cf-name"
              v-model="form.name"
              required
              placeholder="e.g. Jane Doe"
              class="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-lavender/50 disabled:opacity-50"
            />
          </div>
          <div>
            <label class="block font-mono text-xs text-muted mb-1.5 uppercase tracking-wider" for="cf-email">YOUR_EMAIL *</label>
            <input
              id="cf-email"
              v-model="form.email"
              type="email"
              required
              placeholder="jane@company.com"
              class="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-lavender/50 disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label class="block font-mono text-xs text-muted mb-1.5 uppercase tracking-wider" for="cf-subject">SUBJECT</label>
          <input
            id="cf-subject"
            v-model="form.subject"
            placeholder="Opportunity / Collaboration Inquiry"
            class="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-lavender/50"
          />
        </div>

        <div>
          <label class="block font-mono text-xs text-muted mb-1.5 uppercase tracking-wider" for="cf-message">MESSAGE_CONTENT *</label>
          <textarea
            id="cf-message"
            v-model="form.message"
            required
            rows="5"
            placeholder="Hi Sakha, I came across your portfolio and would like to connect regarding..."
            class="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-lavender/50"
          ></textarea>
        </div>

        <div
          v-if="feedback"
          :class="[
            'p-3.5 rounded-xl font-mono text-xs border',
            success ? 'bg-mint/40 border-mint text-ink' : 'bg-peach/40 border-peach text-ink',
          ]"
        >
          <span class="font-bold">{{ success ? 'SUCCESS:' : 'ERROR:' }}</span> {{ feedback }}
        </div>

        <button
          type="submit"
          :disabled="sending"
          class="w-full sm:w-auto px-6 py-3 rounded-full glass-button-primary text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          <span>{{ sending ? 'Transmitting...' : 'Send Message' }}</span>
          <span class="font-mono text-xs">→</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const API_BASE = import.meta.env.PUBLIC_API_BASE ?? 'http://localhost:8000/api';

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
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form.value),
    });
    const json = await res.json();
    if (res.ok && (json.success ?? true)) {
      success.value = true;
      feedback.value = json.message ?? 'Your transmission was received successfully.';
      form.value = { name: '', email: '', subject: '', message: '' };
    } else {
      feedback.value = json.message ?? 'Transmission rejected. Please verify input fields.';
    }
  } catch {
    feedback.value = 'Network transmission error. Ensure the backend Laravel API is active.';
  } finally {
    sending.value = false;
  }
}
</script>