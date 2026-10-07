<script setup lang="ts">
import { ref, onMounted } from 'vue';

const API_BASE = import.meta.env.PUBLIC_API_BASE ?? 'http://localhost:8000/api';

interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  location?: string;
  start_date: string | null;
  end_date: string | null;
  description?: string;
  featured: boolean;
  technologies: Array<{ id: number; name: string }>;
}

const experiences = ref<ExperienceItem[]>([]);
const loading = ref(true);
const error = ref('');

function formatDate(value: string | Date | null | undefined): string {
  if (!value) return 'Present';
  const date = value instanceof Date ? value : new Date(value);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

async function fetchExperiences() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${API_BASE}/experiences`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const payload = await res.json();
    experiences.value = payload?.data ?? payload ?? [];
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load experiences';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchExperiences);
</script>

<template>
  <div class="space-y-6">
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="animate-pulse bg-[#686A73]/10 rounded h-5 w-1/2 space-y-3 p-6 sm:p-8">
        <div class="h-4 bg-[#686A73]/10 rounded w-1/3"></div>
        <div class="h-6 bg-[#686A73]/15 rounded w-3/4"></div>
        <div class="h-3 bg-[#686A73]/10 rounded w-full"></div>
      </div>
    </div>

    <div v-else-if="error" class="glass-card rounded-2xl p-6 border border-red-300">
      <p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p>
      <p class="mt-1 text-muted font-mono text-xs">{{ error }}</p>
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="exp in experiences"
        :key="exp.id"
        class="glass-card rounded-2xl p-6 sm:p-8 space-y-4 group"
      >
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span class="font-mono text-xs uppercase tracking-wider font-semibold text-lavender-strong">
              {{ exp.company }}
            </span>
            <h3 class="text-xl font-semibold text-ink mt-0.5">{{ exp.position }}</h3>
            <p class="font-mono text-xs text-muted mt-1">
              {{ exp.location }} · {{ formatDate(exp.start_date) }} — {{ formatDate(exp.end_date) }}
            </p>
          </div>
          <span
            v-if="exp.featured"
            class="inline-flex items-center gap-1 font-mono font-medium rounded-full border px-1.5 py-0.5 text-[11px] bg-mint/40 text-ink border-mint self-start"
          >
            ● Featured
          </span>
        </div>

        <p class="text-sm text-muted">{{ exp.description }}</p>

        <div
          v-if="exp.technologies && exp.technologies.length"
          class="pt-4 mt-4 border-t border-[#686A73]/15"
        >
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in exp.technologies"
              :key="tech.id"
              class="inline-flex items-center gap-1 font-mono font-medium rounded-full border px-1.5 py-0.5 text-[10px] bg-white/70 text-ink border-white"
            >
              {{ tech.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>