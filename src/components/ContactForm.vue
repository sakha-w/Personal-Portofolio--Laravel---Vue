<script setup lang="ts">
import { ref } from 'vue';
import { apiPost } from '@/shared/composables/useApi';
import { BaseCard, BaseInput, BaseButton, BaseTag } from '@/components/ui';

const form = ref({ name: '', email: '', subject: '', message: '' });
const sending = ref(false);
const feedback = ref('');
const success = ref(false);

async function submit() {
  feedback.value = '';
  success.value = false;
  sending.value = true;
  try {
    const res = await apiPost<{ success: boolean; message: string }>('/contact', form.value);
    if (res.success) {
      success.value = true;
      feedback.value = res.message ?? 'Your transmission was received successfully.';
      form.value = { name: '', email: '', subject: '', message: '' };
    } else {
      feedback.value = res.message ?? 'Transmission rejected. Please verify input fields.';
    }
  } catch {
    feedback.value = 'Network transmission error. Ensure the backend Laravel API is active.';
  } finally {
    sending.value = false;
  }
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
    <BaseCard variant="default" class="lg:col-span-5 space-y-6 flex flex-col justify-between">
      <div class="space-y-4">
        <BaseTag variant="lavender" size="default" class="inline-flex items-center gap-2">
          COORDINATES // REACH_OUT
        </BaseTag>
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
    </BaseCard>

    <BaseCard variant="default" class="lg:col-span-7 space-y-6">
      <div class="border-b border-[#686A73]/15 pb-4">
        <BaseTag variant="lavender" class="block font-mono text-xs uppercase tracking-wider font-semibold mb-1">
          // TRANSMISSION
        </BaseTag>
        <h2 class="text-2xl font-bold text-ink mt-1">Send a Message</h2>
        <p class="text-sm text-muted mt-1">Data is processed through the Laravel REST API and stored securely.</p>
      </div>

      <form @submit.prevent="submit" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BaseInput
            id="cf-name"
            label="YOUR_NAME *"
            placeholder="e.g. Jane Doe"
            required
            v-model="form.name"
          />
          <BaseInput
            id="cf-email"
            label="YOUR_EMAIL *"
            type="email"
            placeholder="jane@company.com"
            required
            v-model="form.email"
          />
        </div>

        <BaseInput
          id="cf-subject"
          label="SUBJECT"
          placeholder="Opportunity / Collaboration Inquiry"
          v-model="form.subject"
        />

        <BaseInput
          id="cf-message"
          label="MESSAGE_CONTENT *"
          type="textarea"
          placeholder="Hi Sakha, I came across your portfolio and would like to connect regarding..."
          required
          :rows="5"
          v-model="form.message"
        />

        <div
          v-if="feedback"
          :class="[
            'p-3.5 rounded-xl font-mono text-xs border',
            success ? 'bg-mint/40 border-mint text-ink' : 'bg-peach/40 border-peach text-ink',
          ]"
        >
          <span class="font-bold">{{ success ? 'SUCCESS:' : 'ERROR:' }}</span> {{ feedback }}
        </div>

        <BaseButton
          type="submit"
          variant="primary"
          class="w-full sm:w-auto px-6 py-3 rounded-full"
          :loading="sending"
        >
          <span>{{ sending ? 'Transmitting...' : 'Send Message' }}</span>
          <span class="font-mono text-xs">→</span>
        </BaseButton>
      </form>
    </BaseCard>
  </div>
</template>