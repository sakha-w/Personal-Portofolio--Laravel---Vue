<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useCollection, type ContentImageData } from './portfolio';
import ContentImage from './ContentImage.vue';
import ContentPagination from './ContentPagination.vue';

const props = defineProps<{ featured?: boolean }>();

interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  short_description?: string;
  category: string;
  year?: string;
  image?: ContentImageData | null;
  technologies: Array<{ id: number; name: string }>;
}

const selected = ref('');
const { items: projects, meta, loading, error, load } = useCollection<ProjectItem>('projects', "I couldn't load the projects just now. Please try again.", () => {
  const params: Record<string, string> = {};
  if (props.featured) { params.featured = '1'; params.per_page = '3'; }
  if (selected.value) params.category = selected.value;
  return params;
});
const categories = computed(() => ['', ...(meta.value?.categories || [])]);
watch(selected, () => load());
</script>

<template>
  <div class="space-y-6" :aria-busy="loading">
    <div v-if="!featured" class="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
      <button v-for="category in categories" :key="category" type="button" class="filter-button" :aria-pressed="selected === category" @click="selected = category">{{ category || 'All projects' }}</button>
    </div>
    <p v-if="loading" class="status-panel" role="status">Loading projects…</p>
    <div v-else-if="error" class="status-panel" role="alert">
      <p>{{ error }}</p><button class="text-link mt-3" type="button" @click="load(meta?.current_page || 1)">Try again</button>
    </div>
    <p v-else-if="!projects.length" class="status-panel" role="status">No projects in this category yet.</p>
    <div v-else class="columns-1 gap-5 md:columns-2" :class="{ 'lg:columns-3': featured }">
      <a v-for="project in projects" :key="project.id" :href="`/projects/${encodeURIComponent(project.slug)}`" class="glass-card glass-link group mb-5 flex w-full break-inside-avoid flex-col p-7">
        <ContentImage v-if="project.image" :image="project.image" crop class="mb-6" />
        <div class="mb-9 flex items-center justify-between">
          <span class="icon-box"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#code" /></svg></span>
          <span class="font-mono text-xs text-muted">{{ project.year }}</span>
        </div>
        <p class="eyebrow mb-3">{{ project.category }}</p>
        <h3 class="text-xl font-medium leading-snug tracking-tight">{{ project.title }}</h3>
        <p class="mt-3 mb-7 text-sm text-muted">{{ project.short_description }}</p>
        <div class="mt-auto flex flex-wrap gap-1.5">
          <span v-for="tech in project.technologies" :key="tech.id" class="tag">{{ tech.name }}</span>
        </div>
        <div class="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm text-accent">
          <span>About this project</span><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-up-right" /></svg>
        </div>
      </a>
    </div>
    <ContentPagination v-if="!featured && !error" :meta="meta" :loading="loading" @change="load" />
  </div>
</template>
