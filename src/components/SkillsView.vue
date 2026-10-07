<script setup lang="ts">
import { ref, onMounted } from 'vue';

const API_BASE = import.meta.env.PUBLIC_API_BASE ?? 'http://localhost:8000/api';

interface SkillItem {
  id: number;
  name: string;
  slug: string;
}

const groups = ref<Record<string, SkillItem[]>>({});
const loading = ref(true);
const error = ref('');

async function fetchSkills() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${API_BASE}/skills`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const payload = await res.json();
    groups.value = payload?.data ?? payload ?? {};
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load skills';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchSkills);
</script>

<template>
  <div class="space-y-6">
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="i in 4" :key="i" class="animate-pulse bg-[#686A73]/10 rounded p-6 sm:p-8 space-y-4">
        <div class="h-4 bg-[#686A73]/10 rounded w-1/3"></div>
        <div class="flex flex-wrap gap-2 pt-2">
          <div v-for="j in 6" :key="j" class="h-8 w-20 bg-[#686A73]/10 rounded-md"></div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="glass-card rounded-2xl p-6 border border-red-300">
      <p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p>
      <p class="mt-1 text-muted font-mono text-xs">{{ error }}</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="(items, category) in groups"
        :key="category"
        class="glass-card rounded-2xl p-6 sm:p-8 space-y-4"
      >
        <div class="flex items-center justify-between border-b border-[#686A73]/15 pb-3">
          <h2 class="font-mono text-xs font-bold uppercase tracking-wider text-lavender-strong">
            // {{ category }}
          </h2>
          <span class="font-mono text-xs text-muted text-[11px]">{{ items.length }} skills</span>
        </div>

        <div class="flex flex-wrap gap-2 pt-1">
          <span
            v-for="tech in items"
            :key="tech.id"
            class="inline-flex items-center gap-1 font-mono font-medium rounded-full border px-2 py-1.5 text-xs bg-white/70 text-ink border-white hover:border-lavender hover:bg-lavender/20 transition-all cursor-default"
          >
            {{ tech.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>