<template>
  <div>
    <div v-if="loading" class="glass rounded-2xl p-8 text-sm text-slate-400">Loading certificates...</div>
    <div v-else-if="error" class="glass rounded-2xl p-8 text-sm text-red-400">{{ error }}</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="cert in certificates" :key="cert.id" class="glass rounded-2xl p-6">
        <div class="flex justify-between items-center">
          <span class="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">{{ cert.issuer }}</span>
          <span class="text-xs text-slate-500">{{ cert.year }}</span>
        </div>
        <h3 class="font-bold text-white mt-3">{{ cert.title }}</h3>
        <p class="text-xs text-slate-400 mt-2 leading-relaxed">{{ cert.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const API_BASE = 'http://localhost:8000/api';
const certificates = ref([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE}/certificates`);
    const json = await res.json();
    certificates.value = json.data ?? [];
  } catch {
    error.value = 'Could not load certificates. Make sure the Laravel API is running.';
  } finally {
    loading.value = false;
  }
});
</script>
