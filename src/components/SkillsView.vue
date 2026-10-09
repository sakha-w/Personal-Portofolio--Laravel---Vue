<script setup lang="ts">
import { ref, onMounted } from 'vue';

const API_BASE = import.meta.env.PUBLIC_API_BASE ?? 'http://localhost:8000/api';
interface SkillItem { id: number; name: string; slug: string; }
const groups = ref<Record<string, SkillItem[]>>({});
const loading = ref(true);
const error = ref('');
const categoryLabels: Record<string, string> = { frontend: 'Frontend', backend: 'Backend & APIs', data: 'Data & AI', tools: 'Tools I work with', other: 'Other skills' };

async function fetchSkills() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${API_BASE}/skills`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error();
    groups.value = (await res.json()).data;
  } catch {
    error.value = "My skills couldn't be loaded. Please try again.";
  } finally {
    loading.value = false;
  }
}
onMounted(fetchSkills);
</script>

<template>
  <div :aria-busy="loading">
    <p v-if="loading" class="status-panel" role="status">Loading skills…</p>
    <div v-else-if="error" class="status-panel" role="alert"><p>{{ error }}</p><button class="text-link mt-3" type="button" @click="fetchSkills">Try again</button></div>
    <p v-else-if="!Object.keys(groups).length" class="status-panel">I'll be adding my skills here soon.</p>
    <div v-else class="grid gap-5 md:grid-cols-2">
      <section v-for="(items, category) in groups" :key="category" class="glass-card p-7 sm:p-9">
        <div class="mb-7 flex items-center gap-4"><span class="icon-box"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#code" /></svg></span><h2 class="text-xl font-medium tracking-tight">{{ categoryLabels[category] ?? category }}</h2></div>
        <ul class="flex flex-wrap gap-2"><li v-for="skill in items" :key="skill.id" class="tag px-3 py-2">{{ skill.name }}</li></ul>
      </section>
    </div>
  </div>
</template>
