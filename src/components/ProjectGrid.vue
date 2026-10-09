<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const props = defineProps<{ featured?: boolean }>();
const API_BASE = import.meta.env.PUBLIC_API_BASE ?? 'http://localhost:8000/api';

interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  short_description?: string;
  category: string;
  year?: string;
  technologies: Array<{ id: number; name: string }>;
}

const projects = ref<ProjectItem[]>([]);
const selected = ref('All');
const loading = ref(true);
const error = ref('');
const categories = computed(() => ['All', ...new Set(projects.value.map(project => project.category))]);
const filtered = computed(() => selected.value === 'All' ? projects.value : projects.value.filter(project => project.category === selected.value));

async function fetchProjects() {
  loading.value = true;
  error.value = '';
  try {
    // ponytail: filters cover the first API page (12 projects); use server-side filtering/pagination when it grows.
    const res = await fetch(`${API_BASE}/projects${props.featured ? '?featured=true' : ''}`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error('Request failed');
    const payload = await res.json();
    if (!Array.isArray(payload.data)) throw new Error('Unexpected response');
    projects.value = props.featured ? payload.data.slice(0, 3) : payload.data;
  } catch {
    error.value = "I couldn't load the projects just now. Please try again.";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProjects);
</script>

<template>
  <div class="space-y-6" :aria-busy="loading">
    <div v-if="!featured" class="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
      <button v-for="category in categories" :key="category" type="button" class="filter-button" :aria-pressed="selected === category" @click="selected = category">{{ category }}</button>
    </div>
    <p v-if="loading" class="status-panel" role="status">Loading projects…</p>
    <div v-else-if="error" class="status-panel" role="alert">
      <p>{{ error }}</p><button class="text-link mt-3" type="button" @click="fetchProjects">Try again</button>
    </div>
    <p v-else-if="!filtered.length" class="status-panel" role="status">No projects in this category yet.</p>
    <div v-else class="grid gap-5 md:grid-cols-2" :class="{ 'lg:grid-cols-3': featured }">
      <a v-for="project in filtered" :key="project.id" :href="`/projects/${encodeURIComponent(project.slug)}`" class="glass-card glass-link group flex h-full flex-col p-7">
        <div class="mb-9 flex items-center justify-between">
          <span class="icon-box"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#code" /></svg></span>
          <span class="font-mono text-xs text-muted">{{ project.year }}</span>
        </div>
        <p class="eyebrow mb-3">{{ project.category }}</p>
        <h3 class="text-xl font-medium leading-snug tracking-tight">{{ project.title }}</h3>
        <p class="mt-3 mb-7 text-sm text-muted">{{ project.short_description }}</p>
        <div class="mt-auto flex flex-wrap gap-1.5">
          <span v-for="tech in project.technologies" :key="tech.id" class="tag">{{ tech.name }}</span>
        </div>
        <div class="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm text-accent">
          <span>About this project</span><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-up-right" /></svg>
        </div>
      </a>
    </div>
  </div>
</template>
