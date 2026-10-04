<template>
  <div class="space-y-6">
    <div class="flex flex-wrap gap-2">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selected = cat"
        :class="[
          'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
          selected === cat ? 'bg-indigo-600 text-white' : 'glass text-slate-300 hover:text-white'
        ]"
      >
        {{ cat }}
      </button>
    </div>
    <div v-if="loading" class="glass rounded-2xl p-8 text-sm text-slate-400">Loading projects...</div>
    <div v-else-if="error" class="glass rounded-2xl p-8 text-sm text-red-400">{{ error }}</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a
        v-for="proj in filtered"
        :key="proj.slug"
        :href="`/projects/${proj.slug}`"
        class="glass rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-500/40 transition-colors"
      >
        <div class="space-y-3">
          <div class="flex justify-between items-start">
            <span class="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">{{ proj.category }}</span>
            <span class="text-xs text-slate-500">{{ proj.year }}</span>
          </div>
          <h3 class="font-bold text-white">{{ proj.title }}</h3>
          <p class="text-xs text-slate-400 leading-relaxed">{{ proj.short_description }}</p>
        </div>
        <div class="pt-4 mt-4 border-t border-white/10">
          <div class="flex flex-wrap gap-1">
            <span v-for="tech in proj.technologies" :key="tech.id" class="text-xs px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">{{ tech.name }}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const API_BASE = 'http://localhost:8000/api';
const projects = ref([]);
const categories = ref(['All']);
const selected = ref('All');
const loading = ref(true);
const error = ref('');

const filtered = computed(() => {
  if (selected.value === 'All') return projects.value;
  return projects.value.filter(p => p.category === selected.value);
});

onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE}/projects?per_page=50`);
    const json = await res.json();
    projects.value = json.data ?? [];
    const cats = [...new Set(projects.value.map(p => p.category).filter(Boolean))];
    categories.value = ['All', ...cats];
  } catch {
    error.value = 'Could not load projects. Make sure the Laravel API is running.';
  } finally {
    loading.value = false;
  }
});
</script>
