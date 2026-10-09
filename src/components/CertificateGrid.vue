<script setup lang="ts">
import { ref, onMounted } from 'vue';

const API_BASE = import.meta.env.PUBLIC_API_BASE ?? 'http://localhost:8000/api';
interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  year?: string;
  description?: string;
  credential_url?: string;
}
const certificates = ref<CertificateItem[]>([]);
const loading = ref(true);
const error = ref('');

async function fetchCertificates() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${API_BASE}/certificates`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error();
    certificates.value = (await res.json()).data;
  } catch {
    error.value = "My certificates couldn't be loaded. Please try again.";
  } finally {
    loading.value = false;
  }un
}
onMounted(fetchCertificates);
</script>

<template>
  <div :aria-busy="loading">
    <p v-if="loading" class="status-panel" role="status">Loading certificates…</p>
    <div v-else-if="error" class="status-panel" role="alert"><p>{{ error }}</p><button class="text-link mt-3" type="button" @click="fetchCertificates">Try again</button></div>
    <p v-else-if="!certificates.length" class="status-panel">I'll be adding my certificates here soon.</p>
    <div v-else class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <article v-for="certificate in certificates" :key="certificate.id" class="glass-card flex flex-col p-7">
        <div class="mb-8 flex items-center justify-between"><span class="icon-box"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#certificate" /></svg></span><span class="font-mono text-xs text-muted">{{ certificate.year }}</span></div>
        <p class="eyebrow mb-3">{{ certificate.issuer }}</p>
        <h2 class="text-xl font-medium leading-snug tracking-tight">{{ certificate.title }}</h2>
        <p v-if="certificate.description" class="mt-4 text-sm text-muted">{{ certificate.description }}</p>
        <div v-if="certificate.credential_url" class="mt-auto pt-6"><a :href="certificate.credential_url" class="text-link" target="_blank" rel="noopener noreferrer">View certificate <svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-up-right" /></svg></a></div>
      </article>
    </div>
  </div>
</template>
