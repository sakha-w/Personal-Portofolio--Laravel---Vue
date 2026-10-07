<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const API_BASE = import.meta.env.PUBLIC_API_BASE ?? 'http://localhost:8000/api';

interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  short_description?: string;
  category: string;
  year?: string;
  featured: boolean;
  technologies: Array<{ id: number; name: string }>;
}

const projects = ref<ProjectItem[]>([]);
const categories = ref<string[]>(['All']);
const selected = ref('All');
const loading = ref(true);
const error = ref('');

const colorSets = [
  { bg: 'bg-lavender/30', border: 'border-lavender', text: 'text-ink' },
  { bg: 'bg-blue/35', border: 'border-blue', text: 'text-ink' },
  { bg: 'bg-mint/35', border: 'border-mint', text: 'text-ink' },
  { bg: 'bg-peach/40', border: 'border-peach', text: 'text-ink' },
];

function getColorSet(index: number) {
  return colorSets[index % colorSets.length];
}

const filtered = computed(() => {
  if (selected.value === 'All') return projects.value ?? [];
  return (projects.value ?? []).filter(p => p.category === selected.value);
});

async function fetchProjects() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${API_BASE}/projects?per_page=50`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const payload = await res.json();
    const data = payload?.data ?? payload ?? [];
    projects.value = data;
    const cats = [...new Set(data.map(p => p.category).filter(Boolean))];
    categories.value = ['All', ...cats];
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load projects';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProjects);
</script>

<template>
  <div class="space-y-8">
    <div class="flex flex-wrap items-center gap-2 pb-2">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selected = cat"
        class="px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer"
        :class="[
          'inline-flex items-center justify-center gap-2 font-medium rounded-full font-sans tracking-wide',
          selected === cat
            ? 'glass-button-primary shadow-xs'
            : 'glass-subtle text-muted hover:text-ink hover:bg-white/70'
        ]"
      >
        {{ cat }}
      </button>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="animate-pulse bg-[#686A73]/10 rounded h-5 w-1/2 space-y-3">
        <div class="h-4 bg-[#686A73]/10 rounded w-1/3"></div>
        <div class="h-6 bg-[#686A73]/15 rounded w-3/4"></div>
        <div class="h-3 bg-[#686A73]/10 rounded w-full"></div>
      </div>
    </div>

    <div v-else-if="error" class="glass-card rounded-2xl p-6 border border-red-300">
      <p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p>
      <p class="mt-1 text-muted font-mono text-xs">{{ error }}</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a
        v-for="(proj, idx) in filtered"
        :key="proj.slug"
        :href="`/projects/${proj.slug}`"
      >
        <div class="glass-card rounded-2xl group flex flex-col justify-between p-6 sm:p-8 space-y-6">
          <div class="space-y-3">
            <div class="flex justify-between items-center font-mono text-xs">
              <span
                class="inline-flex items-center gap-1 font-mono font-medium rounded-full border px-1.5 py-0.5 text-[10px]"
                :class="[
                  getColorSet(idx).bg,
                  getColorSet(idx).border,
                  getColorSet(idx).text,
                ]"
              >
                {{ proj.category }}
              </span>
              <span class="text-muted">{{ proj.year }}</span>
            </div>

            <h3 class="text-xl font-semibold text-ink group-hover:text-lavender-strong transition-colors">
              {{ proj.title }}
            </h3>

            <p class="text-sm text-muted line-clamp-3">{{ proj.short_description }}</p>
          </div>

          <div class="pt-4 mt-4 border-t border-[#686A73]/15">
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tech in proj.technologies"
                :key="tech.id"
                class="inline-flex items-center gap-1 font-mono font-medium rounded-full border px-1.5 py-0.5 text-[10px] bg-white/70 text-ink border-white"
              >
                {{ tech.name }}
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>