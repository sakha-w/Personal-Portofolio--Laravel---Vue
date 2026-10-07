<script setup lang="ts">
import { ref, onMounted } from 'vue';

const API_BASE = import.meta.env.PUBLIC_API_BASE ?? 'http://localhost:8000/api';

const props = defineProps({ slug: { type: String, required: true } });

interface ProjectDetailData {
  id: number;
  title: string;
  slug: string;
  category: string;
  year?: string;
  description?: string;
  github_url?: string;
  demo_url?: string;
  architecture?: string;
  challenge?: string;
  solution?: string;
  result?: string;
  technologies: Array<{ id: number; name: string }>;
}

const project = ref<ProjectDetailData | null>(null);
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

async function fetchProject() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch(`${API_BASE}/projects/${props.slug}`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const payload = await res.json();
    project.value = payload?.data ?? payload ?? null;
    if (!project.value) error.value = 'Project not found';
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load project';
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProject);
</script>

<template>
  <div class="space-y-8">
    <a href="/projects" class="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-ink">
      <span>←</span>
      <span>Back to all projects</span>
    </a>

    <div v-if="loading" class="animate-pulse bg-[#686A73]/10 rounded min-h-[160px]"></div>

    <div v-else-if="error" class="glass-card rounded-2xl p-6 border border-red-300">
      <p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p>
      <p class="mt-1 text-muted font-mono text-xs">{{ error }}</p>
    </div>

    <div v-else-if="project" class="space-y-8">
      <div class="glass-card rounded-2xl p-6 sm:p-10 space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span
              class="inline-flex items-center gap-1 font-mono font-medium rounded-full border px-2.5 py-0.5 text-xs"
              :class="[getColorSet(0).bg, getColorSet(0).border, getColorSet(0).text]"
            >
              {{ project.category }}
            </span>
            <span class="font-mono text-xs text-muted">Year: {{ project.year }}</span>
          </div>

          <div class="flex items-center gap-2">
            <a
              v-if="project.github_url"
              :href="project.github_url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 font-medium rounded-full font-sans tracking-wide transition-all duration-200 px-3.5 py-1.5 text-xs glass-subtle text-muted hover:text-ink hover:bg-white/50"
            >
              <span>GitHub</span>
              <span class="text-[10px]">↗</span>
            </a>
            <a
              v-if="project.demo_url"
              :href="project.demo_url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 font-semibold rounded-full font-sans tracking-wide transition-all duration-200 px-5 py-2.5 text-sm glass-button-primary"
            >
              <span>Live Demo</span>
              <span class="text-[10px]">↗</span>
            </a>
          </div>
        </div>

        <h1 class="text-3xl sm:text-4xl font-bold text-ink">{{ project.title }}</h1>

        <p class="text-base text-muted max-w-3xl">{{ project.description }}</p>

        <div v-if="project.technologies && project.technologies.length" class="pt-6 mt-6 border-t border-[#686A73]/15">
          <p class="font-mono text-xs text-muted mb-2 uppercase tracking-wider">TECHNOLOGY STACK</p>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in project.technologies"
              :key="tech.id"
              class="inline-flex items-center gap-1 font-mono font-medium rounded-full border px-1.5 py-0.5 text-[10px] bg-white/70 text-ink border-white"
            >
              {{ tech.name }}
            </span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <h2 class="font-mono text-xs uppercase tracking-wider text-muted font-semibold">// CASE_STUDY_ANALYSIS</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-if="project.architecture" class="glass-card rounded-2xl p-6 sm:p-7 space-y-2 border-t-2 border-t-lavender">
            <div class="flex items-center gap-2 font-mono text-xs text-lavender-strong">
              <span class="px-1.5 py-0.5 rounded bg-lavender/30 text-ink font-semibold">[01]</span>
              <span class="uppercase font-semibold">Architecture</span>
            </div>
            <p class="text-sm text-muted pt-1">{{ project.architecture }}</p>
          </div>

          <div v-if="project.challenge" class="glass-card rounded-2xl p-6 sm:p-7 space-y-2 border-t-2 border-t-peach">
            <div class="flex items-center gap-2 font-mono text-xs text-peach-strong">
              <span class="px-1.5 py-0.5 rounded bg-peach/40 text-ink font-semibold">[02]</span>
              <span class="uppercase font-semibold">Technical Challenge</span>
            </div>
            <p class="text-sm text-muted pt-1">{{ project.challenge }}</p>
          </div>

          <div v-if="project.solution" class="glass-card rounded-2xl p-6 sm:p-7 space-y-2 border-t-2 border-t-blue">
            <div class="flex items-center gap-2 font-mono text-xs text-blue-strong">
              <span class="px-1.5 py-0.5 rounded bg-blue/40 text-ink font-semibold">[03]</span>
              <span class="uppercase font-semibold">Solution Implementation</span>
            </div>
            <p class="text-sm text-muted pt-1">{{ project.solution }}</p>
          </div>

          <div v-if="project.result" class="glass-card rounded-2xl p-6 sm:p-7 space-y-2 border-t-2 border-t-mint">
            <div class="flex items-center gap-2 font-mono text-xs text-mint-strong">
              <span class="px-1.5 py-0.5 rounded bg-mint/40 text-ink font-semibold">[04]</span>
              <span class="uppercase font-semibold">Outcome & Results</span>
            </div>
            <p class="text-sm text-muted pt-1">{{ project.result }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>