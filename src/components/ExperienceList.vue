<template>
  <div class="space-y-6">
    <!-- Loading State Skeleton -->
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="glass-card rounded-2xl p-6 sm:p-8 animate-pulse space-y-4">
        <div class="h-5 bg-[#686A73]/10 rounded w-1/3"></div>
        <div class="h-4 bg-[#686A73]/10 rounded w-1/4"></div>
        <div class="h-3 bg-[#686A73]/10 rounded w-full"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="glass-card rounded-2xl p-6 border border-red-300 text-xs sm:text-sm text-red-600 technical-label">
      <p class="font-bold">SYSTEM ERROR:</p>
      <p class="mt-1 text-[#686A73]">{{ error }}</p>
    </div>

    <!-- Experience List -->
    <div v-else class="space-y-6">
      <div
        v-for="exp in experiences"
        :key="exp.id"
        class="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group"
      >
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span class="technical-label uppercase text-[#7f5be8] tracking-wider font-semibold">{{ exp.company }}</span>
            <h3 class="card-heading mt-0.5">{{ exp.position }}</h3>
            <p class="technical-label text-[#686A73] mt-1">
              {{ exp.location }} · {{ formatDate(exp.start_date) }} — {{ formatDate(exp.end_date) }}
            </p>
          </div>
          <span
            v-if="exp.featured"
            class="technical-label text-[11px] px-2.5 py-1 rounded-full bg-[#B8E0D2]/40 text-[#24252A] border border-[#B8E0D2] font-medium"
          >
            ● Featured Role
          </span>
        </div>

        <p class="small-text mt-4">
          {{ exp.description }}
        </p>

        <div v-if="exp.technologies && exp.technologies.length" class="pt-4 mt-4 border-t border-[#686A73]/15">
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in exp.technologies"
              :key="tech.id"
              class="technical-label text-[11px] px-2.5 py-0.5 rounded-md bg-white/70 text-[#24252A] border border-white"
            >
              {{ tech.name }}
            </span>
          </div>
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
    error.value = 'Could not load experiences from Laravel backend API.';
  } finally {
    loading.value = false;
  }
});
</script>
