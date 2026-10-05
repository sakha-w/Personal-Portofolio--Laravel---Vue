<template>
  <div class="space-y-8">
    <!-- Back Navigation Link -->
    <a href="/projects" class="inline-flex items-center gap-2 technical-label text-[#686A73] hover:text-[#24252A] transition-colors">
      <span>←</span>
      <span>Back to all projects</span>
    </a>

    <!-- Loading State -->
    <div v-if="loading" class="glass-card rounded-3xl p-8 sm:p-12 animate-pulse space-y-4">
      <div class="h-4 bg-[#686A73]/10 rounded w-1/4"></div>
      <div class="h-8 bg-[#686A73]/15 rounded w-2/3"></div>
      <div class="h-4 bg-[#686A73]/10 rounded w-full"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="glass-card rounded-2xl p-6 border border-red-300 text-xs sm:text-sm text-red-600 technical-label">
      <p class="font-bold">SYSTEM ERROR:</p>
      <p class="mt-1 text-[#686A73]">{{ error }}</p>
    </div>

    <!-- Project Content -->
    <div v-else-if="project" class="space-y-8">
      <!-- Overview Card -->
      <div class="glass-card rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="technical-label px-3 py-1 rounded-full bg-[#C8B6FF]/30 text-[#24252A] border border-[#C8B6FF] font-medium">
              {{ project.category }}
            </span>
            <span class="technical-label text-[#686A73]">Year: {{ project.year }}</span>
          </div>

          <div class="flex items-center gap-2">
            <a
              v-if="project.github_url"
              :href="project.github_url"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 rounded-full glass-button-secondary text-xs technical-label flex items-center gap-1.5"
            >
              <span>GitHub</span>
              <span class="text-[10px]">↗</span>
            </a>
            <a
              v-if="project.demo_url"
              :href="project.demo_url"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 rounded-full glass-button-primary text-xs font-semibold flex items-center gap-1.5"
            >
              <span>Live Demo</span>
              <span class="text-[10px]">↗</span>
            </a>
          </div>
        </div>

        <h1 class="section-heading mt-4 text-3xl sm:text-4xl">
          {{ project.title }}
        </h1>

        <p class="body-text mt-4 max-w-3xl">
          {{ project.description }}
        </p>

        <div v-if="project.technologies && project.technologies.length" class="pt-6 mt-6 border-t border-[#686A73]/15">
          <p class="technical-label text-[#686A73] mb-2 uppercase tracking-wider">TECHNOLOGY STACK</p>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in project.technologies"
              :key="tech.id"
              class="technical-label text-xs px-2.5 py-1 rounded-md bg-white/70 text-[#24252A] border border-white"
            >
              {{ tech.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Case Study Breakdown Quadrant (Lavender, Peach, Blue, Mint) -->
      <div class="space-y-4">
        <h2 class="technical-label uppercase tracking-wider text-[#686A73] font-semibold">// CASE_STUDY_ANALYSIS</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-if="project.architecture" class="glass-card rounded-2xl p-6 sm:p-7 space-y-2 border-t-2 border-t-[#C8B6FF]">
            <div class="flex items-center gap-2 technical-label text-[#7f5be8]">
              <span class="px-1.5 py-0.5 rounded bg-[#C8B6FF]/30 text-[#24252A] font-semibold">[01]</span>
              <span class="uppercase font-semibold">Architecture</span>
            </div>
            <p class="small-text pt-1">
              {{ project.architecture }}
            </p>
          </div>

          <div v-if="project.challenge" class="glass-card rounded-2xl p-6 sm:p-7 space-y-2 border-t-2 border-t-[#FFD6BA]">
            <div class="flex items-center gap-2 technical-label text-[#c26d36]">
              <span class="px-1.5 py-0.5 rounded bg-[#FFD6BA]/40 text-[#24252A] font-semibold">[02]</span>
              <span class="uppercase font-semibold">Technical Challenge</span>
            </div>
            <p class="small-text pt-1">
              {{ project.challenge }}
            </p>
          </div>

          <div v-if="project.solution" class="glass-card rounded-2xl p-6 sm:p-7 space-y-2 border-t-2 border-t-[#A9D6E5]">
            <div class="flex items-center gap-2 technical-label text-[#2b7e9b]">
              <span class="px-1.5 py-0.5 rounded bg-[#A9D6E5]/40 text-[#24252A] font-semibold">[03]</span>
              <span class="uppercase font-semibold">Solution Implementation</span>
            </div>
            <p class="small-text pt-1">
              {{ project.solution }}
            </p>
          </div>

          <div v-if="project.result" class="glass-card rounded-2xl p-6 sm:p-7 space-y-2 border-t-2 border-t-[#B8E0D2]">
            <div class="flex items-center gap-2 technical-label text-[#3b8c72]">
              <span class="px-1.5 py-0.5 rounded bg-[#B8E0D2]/40 text-[#24252A] font-semibold">[04]</span>
              <span class="uppercase font-semibold">Outcome & Results</span>
            </div>
            <p class="small-text pt-1">
              {{ project.result }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({ slug: { type: String, required: true } });
const API_BASE = 'http://localhost:8000/api';
const project = ref(null);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE}/projects/${props.slug}`);
    if (!res.ok) throw new Error('not-found');
    const json = await res.json();
    project.value = json.data ?? null;
    if (!project.value) error.value = 'Project not found in system.';
  } catch {
    error.value = 'Could not load project details. Make sure the Laravel API is active.';
  } finally {
    loading.value = false;
  }
});
</script>
