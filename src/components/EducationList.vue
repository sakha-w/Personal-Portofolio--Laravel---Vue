<template>
  <div class="space-y-6">
    <!-- Loading State Skeleton -->
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 2" :key="i" class="glass-card rounded-2xl p-6 sm:p-8 animate-pulse space-y-4">
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

    <!-- Education Cards -->
    <div v-else class="space-y-6">
      <div
        v-for="edu in educations"
        :key="edu.id"
        class="glass-card rounded-2xl p-6 sm:p-8 space-y-3"
      >
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span class="technical-label uppercase text-[#7f5be8] tracking-wider font-semibold">{{ edu.institution }}</span>
            <h3 class="card-heading mt-0.5">{{ edu.degree }}</h3>
            <p class="technical-label text-[#686A73] mt-1">
              {{ edu.location }} · {{ edu.period }}
            </p>
          </div>
          <div class="px-3 py-1 rounded-full bg-[#B8E0D2]/40 border border-[#B8E0D2] text-[#24252A] font-mono text-xs font-bold">
            GPA {{ edu.gpa }}
          </div>
        </div>

        <div v-if="edu.thesis" class="p-3.5 rounded-xl glass-subtle border border-white text-xs space-y-1">
          <p class="technical-label text-[#7f5be8] text-[11px] uppercase tracking-wider font-semibold">UNDERGRADUATE THESIS</p>
          <p class="italic text-[#24252A]">"{{ edu.thesis }}"</p>
        </div>

        <p v-if="edu.description" class="small-text pt-1">
          {{ edu.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const API_BASE = 'http://localhost:8000/api';
const educations = ref([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE}/educations`);
    const json = await res.json();
    educations.value = json.data ?? [];
  } catch {
    error.value = 'Could not load education records from Laravel API.';
  } finally {
    loading.value = false;
  }
});
</script>
