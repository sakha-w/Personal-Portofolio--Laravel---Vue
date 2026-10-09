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

async function fetchEducations() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${API_BASE}/educations`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error();
    educations.value = (await res.json()).data;
  } catch {
    error.value = "My education details couldn't be loaded. Please try again.";
  } finally {
    loading.value = false;
  }
}
onMounted(fetchEducations);
</script>

<template>
  <div :aria-busy="loading">
    <p v-if="loading" class="status-panel" role="status">Loading education…</p>
    <div v-else-if="error" class="status-panel" role="alert"><p>{{ error }}</p><button class="text-link mt-3" type="button" @click="fetchEducations">Try again</button></div>
    <p v-else-if="!educations.length" class="status-panel">I'll be adding my education details here soon.</p>
    <div v-else class="grid gap-5 md:grid-cols-2">
      <article v-for="education in educations" :key="education.id" class="glass-card flex flex-col p-7 sm:p-9">
        <div class="flex items-center justify-between gap-3"><span class="icon-box"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#school" /></svg></span><span class="font-mono text-xs text-muted">{{ education.period }}</span></div>
        <p class="eyebrow mt-8 mb-3">{{ education.institution }}</p>
        <h2 class="text-2xl font-medium leading-snug tracking-tight">{{ education.degree }}</h2>
        <p class="mt-3 text-xs text-muted">{{ education.location }}<span v-if="education.gpa"> · GPA {{ education.gpa }}</span></p>
        <p v-if="education.description" class="mt-5 text-sm text-muted">{{ education.description }}</p>
        <div v-if="education.thesis" class="mt-7 border-t border-line pt-5">
          <h3 class="mb-2 text-sm text-accent">My thesis</h3><p class="text-sm text-muted">{{ education.thesis }}</p>
        </div>
      </article>
    </div>
  </div>
</template>
