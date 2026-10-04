<template>
  <div>
    <div v-if="loading" class="glass rounded-2xl p-8 text-sm text-slate-400">Loading skills...</div>
    <div v-else-if="error" class="glass rounded-2xl p-8 text-sm text-red-400">{{ error }}</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="(items, category) in groups" :key="category" class="glass rounded-2xl p-6">
        <h2 class="text-sm font-bold uppercase tracking-wider text-indigo-400 capitalize">{{ category }}</h2>
        <div class="flex flex-wrap gap-2 mt-4">
          <span v-for="tech in items" :key="tech.id" class="text-sm px-3 py-1.5 rounded-full bg-white/5 text-slate-200 border border-white/10">{{ tech.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const API_BASE = 'http://localhost:8000/api';
const groups = ref({});
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE}/skills`);
    const json = await res.json();
    groups.value = json.data ?? {};
  } catch {
    error.value = 'Could not load skills. Make sure the Laravel API is running.';
  } finally {
    loading.value = false;
  }
});
</script>
