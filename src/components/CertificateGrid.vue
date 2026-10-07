<script setup lang="ts">
import { ref, onMounted } from 'vue';

const API_BASE = import.meta.env.PUBLIC_API_BASE ?? 'http://localhost:8000/api';

interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  year?: string;
  description?: string;
}

const certificates = ref<CertificateItem[]>([]);
const loading = ref(true);
const error = ref('');

const issuerColorSets = [
  { bg: 'bg-mint/40', border: 'border-mint', text: 'text-ink' },
  { bg: 'bg-blue/40', border: 'border-blue', text: 'text-ink' },
  { bg: 'bg-lavender/35', border: 'border-lavender', text: 'text-ink' },
  { bg: 'bg-peach/40', border: 'border-peach', text: 'text-ink' },
  { bg: 'bg-pink/40', border: 'border-pink', text: 'text-ink' },
];

function getIssuerColorSet(index: number) {
  return issuerColorSets[index % issuerColorSets.length];
}

async function fetchCertificates() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${API_BASE}/certificates`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const payload = await res.json();
    certificates.value = payload?.data ?? payload ?? [];
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load certificates';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchCertificates);
</script>

<template>
  <div class="space-y-6">
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="animate-pulse bg-[#686A73]/10 rounded p-6 min-h-[160px] space-y-3">
        <div class="h-4 bg-[#686A73]/10 rounded w-1/3"></div>
        <div class="h-5 bg-[#686A73]/15 rounded w-3/4"></div>
        <div class="h-3 bg-[#686A73]/10 rounded w-full"></div>
      </div>
    </div>

    <div v-else-if="error" class="glass-card rounded-2xl p-6 border border-red-300">
      <p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p>
      <p class="mt-1 text-muted font-mono text-xs">{{ error }}</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a
        v-for="(cert, idx) in certificates"
        :key="cert.id"
      >
        <div class="glass-card rounded-2xl p-6 group flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-center justify-between font-mono text-xs">
              <span
                class="inline-flex items-center gap-1 font-mono font-medium rounded-full border px-2.5 py-0.5 text-xs"
                :class="[
                  getIssuerColorSet(idx).bg,
                  getIssuerColorSet(idx).border,
                  getIssuerColorSet(idx).text,
                ]"
              >
                {{ cert.issuer }}
              </span>
              <span class="text-muted">{{ cert.year }}</span>
            </div>

            <h3 class="text-xl font-semibold text-ink group-hover:text-lavender-strong transition-colors">
              {{ cert.title }}
            </h3>

            <p class="text-sm text-muted">{{ cert.description }}</p>
          </div>

          <div class="pt-4 mt-4 border-t border-[#686A73]/15 flex items-center justify-between font-mono text-xs text-muted">
            <span>CREDENTIAL #{{ cert.id }}</span>
            <span class="text-mint-strong font-semibold">VERIFIED</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>