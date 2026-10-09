<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const API_BASE = import.meta.env.PUBLIC_API_BASE ?? 'http://localhost:8000/api';
const props = defineProps<{ slug: string }>();

interface ProjectDetailData {
  title: string;
  category: string;
  year?: string;
  description?: string;
  github_url?: string;
  demo_url?: string;
  architecture?: string;
  challenge?: string;
  solution?: string;
  result?: string;
  technologies: Array<{ id: number; name: string }>;
}

const project = ref<ProjectDetailData | null>(null);
const loading = ref(true);
const error = ref('');
const sections = computed(() => [
  { title: 'How it fits together', text: project.value?.architecture },
  { title: 'The challenge', text: project.value?.challenge },
  { title: 'The approach', text: project.value?.solution },
  { title: 'The outcome', text: project.value?.result },
].filter(section => section.text));

async function fetchProject() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${API_BASE}/projects/${encodeURIComponent(props.slug)}`, { headers: { Accept: 'application/json' } });
    if (res.status === 404) throw new Error('This project is no longer available. You can find my other work on the Projects page.');
    if (!res.ok) throw new Error("This project couldn't be loaded. Please try again.");
    const payload = await res.json();
    project.value = payload.data;
  } catch (e) {
    error.value = e instanceof Error ? e.message : "This project couldn't be loaded.";
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProject);
</script>

<template>
  <div class="space-y-8" :aria-busy="loading">
    <a href="/projects" class="text-link"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-left" /></svg>Back to projects</a>
    <p v-if="loading" class="status-panel" role="status">Loading project…</p>
    <div v-else-if="error" class="status-panel" role="alert"><p>{{ error }}</p><button class="text-link mt-3" type="button" @click="fetchProject">Try again</button></div>
    <template v-else-if="project">
      <article class="glass-card p-7 sm:p-12">
        <div class="flex flex-wrap items-center gap-3"><span class="eyebrow">{{ project.category }}</span><span class="text-xs text-muted">{{ project.year }}</span></div>
        <h1 class="mt-5 max-w-3xl text-3xl font-medium leading-tight tracking-tight sm:text-5xl">{{ project.title }}</h1>
        <p class="mt-6 max-w-3xl whitespace-pre-line text-muted">{{ project.description }}</p>
        <div class="mt-7 flex flex-wrap gap-2"><span v-for="tech in project.technologies" :key="tech.id" class="tag">{{ tech.name }}</span></div>
        <div v-if="project.github_url || project.demo_url" class="mt-9 flex flex-wrap gap-3 border-t border-line pt-7">
          <a v-if="project.github_url" :href="project.github_url" class="button" target="_blank" rel="noopener noreferrer"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#code" /></svg>View source</a>
          <a v-if="project.demo_url" :href="project.demo_url" class="button button-primary" target="_blank" rel="noopener noreferrer">Visit project <svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-up-right" /></svg></a>
        </div>
      </article>
      <div v-if="sections.length" class="grid gap-5 md:grid-cols-2">
        <section v-for="section in sections" :key="section.title" class="glass-card p-7">
          <h2 class="mb-4 text-xl font-medium tracking-tight">{{ section.title }}</h2><p class="whitespace-pre-line text-sm text-muted">{{ section.text }}</p>
        </section>
      </div>
    </template>
  </div>
</template>
