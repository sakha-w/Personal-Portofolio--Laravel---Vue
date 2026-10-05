<template>
  <div class="space-y-6">
    <!-- Loading State Skeleton -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="glass-card rounded-2xl p-6 min-h-[160px] animate-pulse space-y-3">
        <div class="h-4 bg-[#686A73]/10 rounded w-1/3"></div>
        <div class="h-5 bg-[#686A73]/15 rounded w-3/4"></div>
        <div class="h-3 bg-[#686A73]/10 rounded w-full"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="glass-card rounded-2xl p-6 border border-red-300 text-xs sm:text-sm text-red-600 technical-label">
      <p class="font-bold">SYSTEM ERROR:</p>
      <p class="mt-1 text-[#686A73]">{{ error }}</p>
    </div>

    <!-- Certificates Grid with Pastel Issuer Badges -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(cert, idx) in certificates"
        :key="cert.id"
        class="glass-card rounded-2xl p-6 flex flex-col justify-between group"
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between technical-label">
            <span
              :class="[
                'px-2.5 py-0.5 rounded-full border font-medium',
                issuerStyles[idx % issuerStyles.length]
              ]"
            >
              {{ cert.issuer }}
            </span>
            <span class="text-[#686A73]">{{ cert.year }}</span>
          </div>

          <h3 class="card-heading group-hover:text-[#7f5be8] transition-colors">
            {{ cert.title }}
          </h3>

          <p class="small-text">
            {{ cert.description }}
          </p>
        </div>

        <div class="pt-4 mt-4 border-t border-[#686A73]/15 flex items-center justify-between text-[11px] technical-label text-[#686A73]">
          <span>CREDENTIAL_ID: #{{ cert.id }}</span>
          <span class="text-[#3b8c72] font-semibold">VERIFIED</span>
        </div>
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

const issuerStyles = [
  'bg-[#B8E0D2]/40 border-[#B8E0D2] text-[#24252A]',
  'bg-[#A9D6E5]/40 border-[#A9D6E5] text-[#24252A]',
  'bg-[#C8B6FF]/35 border-[#C8B6FF] text-[#24252A]',
  'bg-[#FFD6BA]/40 border-[#FFD6BA] text-[#24252A]',
  'bg-[#F7C8E0]/40 border-[#F7C8E0] text-[#24252A]',
];

onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE}/certificates`);
    const json = await res.json();
    certificates.value = json.data ?? [];
  } catch {
    error.value = 'Could not load certificates from Laravel API.';
  } finally {
    loading.value = false;
  }
});
</script>
