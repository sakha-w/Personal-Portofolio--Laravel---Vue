<template>
  <div class="space-y-8">
    <!-- Category Filter Tabs -->
    <div class="flex flex-wrap items-center gap-2 pb-2">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selected = cat"
        :class="[
          'px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer',
          selected === cat
            ? 'glass-button-primary shadow-xs'
            : 'glass-subtle text-[#686A73] hover:text-[#24252A] hover:bg-white/70'
        ]"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="glass-card rounded-2xl p-6 min-h-[220px] animate-pulse space-y-4">
        <div class="h-4 bg-[#686A73]/10 rounded w-1/3"></div>
        <div class="h-6 bg-[#686A73]/15 rounded w-3/4"></div>
        <div class="h-3 bg-[#686A73]/10 rounded w-full"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="glass-card rounded-2xl p-6 border border-red-300 text-xs sm:text-sm text-red-600 font-mono">
      <p class="font-bold">SYSTEM ERROR:</p>
      <p class="mt-1 text-[#686A73]">{{ error }}</p>
    </div>

    <!-- Projects Grid with Rotating Accents: Lavender, Blue, Mint, Peach -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a
        v-for="(proj, idx) in filtered"
        :key="proj.slug"
        :href="`/projects/${proj.slug}`"
        class="glass-card rounded-2xl p-6 flex flex-col justify-between group cursor-pointer"
      >
        <div class="space-y-3">
          <div class="flex justify-between items-center technical-label">
            <span
              :class="[
                'px-2.5 py-0.5 rounded-full border font-medium',
                getColorClass(idx)
              ]"
            >
              {{ proj.category }}
            </span>
            <span class="text-[#686A73]">{{ proj.year }}</span>
          </div>

          <h3 class="card-heading group-hover:text-[#7f5be8] transition-colors">
            {{ proj.title }}
          </h3>

          <p class="small-text line-clamp-3">
            {{ proj.short_description }}
          </p>
        </div>

        <div class="pt-4 mt-4 border-t border-[#686A73]/15">
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in proj.technologies"
              :key="tech.id"
              class="technical-label text-[11px] px-2 py-0.5 rounded-md bg-white/70 text-[#24252A] border border-white"
            >
              {{ tech.name }}
            </span>
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

// Project 01 → Lavender, Project 02 → Blue, Project 03 → Mint, Project 04 → Peach
const colorClasses = [
  'bg-[#C8B6FF]/30 border-[#C8B6FF] text-[#24252A]',
  'bg-[#A9D6E5]/35 border-[#A9D6E5] text-[#24252A]',
  'bg-[#B8E0D2]/35 border-[#B8E0D2] text-[#24252A]',
  'bg-[#FFD6BA]/40 border-[#FFD6BA] text-[#24252A]',
];

function getColorClass(index) {
  return colorClasses[index % colorClasses.length];
}

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
