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
  technologies: Array<{ id: number; name: string }>;
}
const experiences = ref<ExperienceItem[]>([]);
const loading = ref(true);
const error = ref('');
const formatDate = (value: string | null) => value ? new Date(value).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : 'Present';

async function fetchExperiences() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${API_BASE}/experiences`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error();
    experiences.value = (await res.json()).data;
  } catch {
    error.value = "My experience couldn't be loaded. Please try again.";
  } finally {
    loading.value = false;
  }
}
onMounted(fetchExperiences);
</script>

<template>
  <div :aria-busy="loading">
    <p v-if="loading" class="status-panel" role="status">Loading experience…</p>
    <div v-else-if="error" class="status-panel" role="alert"><p>{{ error }}</p><button class="text-link mt-3" type="button" @click="fetchExperiences">Try again</button></div>
    <p v-else-if="!experiences.length" class="status-panel">I'll be adding my experience here soon.</p>
    <ol v-else class="space-y-5">
      <li v-for="experience in experiences" :key="experience.id" class="glass-card grid gap-6 p-7 sm:p-9 md:grid-cols-[13rem_1fr]">
        <div>
          <span class="icon-box mb-5"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#briefcase" /></svg></span>
          <p class="font-mono text-xs text-accent">{{ formatDate(experience.start_date) }} – {{ formatDate(experience.end_date) }}</p>
          <p class="mt-2 text-xs text-muted">{{ experience.location }}</p>
        </div>
        <div>
          <h2 class="text-2xl font-medium tracking-tight">{{ experience.company }}</h2>
          <p class="mt-2 text-sm text-accent">{{ experience.position }}</p>
          <p class="mt-5 whitespace-pre-line text-sm text-muted">{{ experience.description }}</p>
          <div class="mt-6 flex flex-wrap gap-2"><span v-for="tech in experience.technologies" :key="tech.id" class="tag">{{ tech.name }}</span></div>
        </div>
      </li>
    </ol>
  </div>
</template>
