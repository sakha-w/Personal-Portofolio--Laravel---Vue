<template>
  <div>
    <div v-if="loading" class="glass rounded-2xl p-8 text-sm text-slate-400">Loading project...</div>
    <div v-else-if="error" class="glass rounded-2xl p-8 text-sm text-red-400">{{ error }}</div>
    <div v-else-if="project" class="space-y-6">
      <div class="glass rounded-2xl p-8">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">{{ project.category }}</span>
          <span class="text-xs text-slate-500">{{ project.year }}</span>
        </div>
        <h1 class="text-3xl font-extrabold text-white mt-3">{{ project.title }}</h1>
        <p class="text-slate-300 text-sm leading-relaxed mt-3">{{ project.description }}</p>
        <div class="flex flex-wrap gap-1.5 mt-4">
          <span v-for="tech in project.technologies" :key="tech.id" class="text-xs px-2 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">{{ tech.name }}</span>
        </div>
        <div class="flex flex-wrap gap-3 mt-6 text-sm">
          <a v-if="project.github_url" :href="project.github_url" target="_blank" class="px-4 py-2 rounded-lg glass text-slate-200">GitHub ↗</a>
          <a v-if="project.demo_url" :href="project.demo_url" target="_blank" class="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium">Live Demo ↗</a>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-if="project.architecture" class="glass rounded-2xl p-6">
          <h2 class="text-sm font-bold uppercase tracking-wider text-indigo-400">Architecture</h2>
          <p class="text-sm text-slate-300 mt-2 leading-relaxed">{{ project.architecture }}</p>
        </div>
        <div v-if="project.challenge" class="glass rounded-2xl p-6">
          <h2 class="text-sm font-bold uppercase tracking-wider text-indigo-400">Challenge</h2>
          <p class="text-sm text-slate-300 mt-2 leading-relaxed">{{ project.challenge }}</p>
        </div>
        <div v-if="project.solution" class="glass rounded-2xl p-6">
          <h2 class="text-sm font-bold uppercase tracking-wider text-indigo-400">Solution</h2>
          <p class="text-sm text-slate-300 mt-2 leading-relaxed">{{ project.solution }}</p>
        </div>
        <div v-if="project.result" class="glass rounded-2xl p-6">
          <h2 class="text-sm font-bold uppercase tracking-wider text-indigo-400">Result</h2>
          <p class="text-sm text-slate-300 mt-2 leading-relaxed">{{ project.result }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({ slug: { type: String, required: true } });
const API_BASE = 'http://localhost:8000/api';
const project = ref(null);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE}/projects/${props.slug}`);
    if (!res.ok) throw new Error('not-found');
    const json = await res.json();
    project.value = json.data ?? null;
    if (!project.value) error.value = 'Project not found.';
  } catch {
    error.value = 'Could not load this project. Make sure the Laravel API is running.';
  } finally {
    loading.value = false;
  }
});
</script>
