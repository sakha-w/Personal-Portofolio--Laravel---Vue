<template>
  <div>
    <div v-if="loading" class="glass rounded-2xl p-8 text-sm text-slate-400">Loading experiences...</div>
    <div v-else-if="error" class="glass rounded-2xl p-8 text-sm text-red-400">{{ error }}</div>
    <div v-else class="space-y-6">
      <div v-for="exp in experiences" :key="exp.id" class="glass rounded-2xl p-6 sm:p-8">
        <div class="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 class="font-bold text-white text-lg">{{ exp.position }}</h3>
            <p class="text-sm font-medium text-indigo-400">{{ exp.company }}</p>
            <p class="text-xs text-slate-500 mt-1">{{ exp.location }} · {{ formatDate(exp.start_date) }} – {{ formatDate(exp.end_date) }}</p>
          </div>
          <span v-if="exp.featured" class="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Featured</span>
        </div>
        <p class="text-sm text-slate-300 leading-relaxed mt-3">{{ exp.description }}</p>
        <div class="flex flex-wrap gap-1.5 mt-4">
          <span v-for="tech in exp.technologies" :key="tech.id" class="text-xs px-2 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">{{ tech.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const API_BASE = 'http://localhost:8000/api';
const experiences = ref([]);
const loading = ref(true);
const error = ref('');

function formatDate(value) {
  if (!value) return 'Present';
  return new Date(value).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE}/experiences`);
    const json = await res.json();
    experiences.value = json.data ?? [];
  } catch {
    error.value = 'Could not load experiences. Make sure the Laravel API is running.';
  } finally {
    loading.value = false;
  }
});
</script>
