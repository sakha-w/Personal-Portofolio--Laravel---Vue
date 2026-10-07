<script setup lang="ts">
import { ref, onMounted } from 'vue';

const API_BASE = import.meta.env.PUBLIC_API_BASE ?? 'http://localhost:8000/api';

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  location?: string;
  period?: string;
  gpa?: string;
  thesis?: string;
  description?: string;
}

const educations = ref<EducationItem[]>([]);
const loading = ref(true);
const error = ref('');

function formatDate(value: string | Date | null | undefined): string {
  if (!value) return 'Present';
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

async function fetchEducations() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${API_BASE}/educations`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const payload = await res.json();
    educations.value = payload?.data ?? payload ?? [];
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load education';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchEducations);
</script>

<template>
  <div class="space-y-6">
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 2" :key="i" class="animate-pulse bg-[#686A73]/10 rounded p-6 sm:p-8 space-y-3">
        <div class="h-5 bg-[#686A73]/10 rounded w-1/3"></div>
        <div class="h-4 bg-[#686A73]/10 rounded w-1/4"></div>
        <div class="h-3 bg-[#686A73]/10 rounded w-full"></div>
      </div>
    </div>

    <div v-else-if="error" class="glass-card rounded-2xl p-6 border border-red-300">
      <p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p>
      <p class="mt-1 text-muted font-mono text-xs">{{ error }}</p>
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="edu in educations"
        :key="edu.id"
        class="glass-card rounded-2xl p-6 sm:p-8 space-y-3"
      >
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span class="font-mono text-xs uppercase tracking-wider font-semibold text-lavender-strong">
              {{ edu.institution }}
            </span>
            <h3 class="text-xl font-semibold text-ink mt-0.5">{{ edu.degree }}</h3>
            <p class="font-mono text-xs text-muted mt-1">
              {{ edu.location }} · {{ edu.period }}
            </p>
          </div>
          <span
            v-if="edu.gpa"
            class="inline-flex items-center gap-1 font-mono font-medium rounded-full border px-2.5 py-0.5 text-xs bg-mint/40 text-ink border-mint self-start"
          >
            GPA {{ edu.gpa }}
          </span>
        </div>

        <div v-if="edu.thesis" class="p-3.5 rounded-xl glass-subtle border border-white text-xs space-y-1">
          <p class="font-mono text-xs text-lavender-strong text-[11px] uppercase tracking-wider font-semibold">
            UNDERGRADUATE THESIS
          </p>
          <p class="italic text-ink">"{{ edu.thesis }}"</p>
        </div>

        <p v-if="edu.description" class="text-sm text-muted pt-1">{{ edu.description }}</p>
      </div>
    </div>
  </div>
</template>