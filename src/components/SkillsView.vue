<template>
  <div class="space-y-6">
    <!-- Loading State Skeleton -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="i in 4" :key="i" class="glass-card rounded-2xl p-6 sm:p-8 animate-pulse space-y-4">
        <div class="h-4 bg-[#686A73]/10 rounded w-1/3"></div>
        <div class="flex flex-wrap gap-2 pt-2">
          <div v-for="j in 6" :key="j" class="h-8 w-20 bg-[#686A73]/10 rounded-md"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="glass-card rounded-2xl p-6 border border-red-300 text-xs sm:text-sm text-red-600 technical-label">
      <p class="font-bold">SYSTEM ERROR:</p>
      <p class="mt-1 text-[#686A73]">{{ error }}</p>
    </div>

    <!-- Skills Categories -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="(items, category) in groups"
        :key="category"
        class="glass-card rounded-2xl p-6 sm:p-8 space-y-4"
      >
        <div class="flex items-center justify-between border-b border-[#686A73]/15 pb-3">
          <h2 class="technical-label font-bold uppercase tracking-wider text-[#7f5be8]">
            // {{ category }}
          </h2>
          <span class="technical-label text-[#686A73] text-[11px]">{{ items.length }} skills</span>
        </div>

        <div class="flex flex-wrap gap-2 pt-1">
          <span
            v-for="tech in items"
            :key="tech.id"
            class="technical-label text-xs px-3 py-1.5 rounded-lg bg-white/70 text-[#24252A] border border-white hover:border-[#C8B6FF] hover:bg-[#C8B6FF]/20 transition-all cursor-default"
          >
            {{ tech.name }}
          </span>
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
    error.value = 'Could not load skills list from Laravel API.';
  } finally {
    loading.value = false;
  }
});
</script>
