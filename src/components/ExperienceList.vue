<script setup lang="ts">
import { useCollection, type ContentImageData } from './portfolio';
import ContentImage from './ContentImage.vue';
import ContentPagination from './ContentPagination.vue';

interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  location?: string;
  start_date: string | null;
  end_date: string | null;
  description?: string;
  evidence_images?: ContentImageData[];
  technologies: Array<{ id: number; name: string }>;
}
const { items: experiences, meta, loading, error, load } = useCollection<ExperienceItem>('experiences', "My experience couldn't be loaded. Please try again.");
const formatDate = (value: string | null) => value ? new Date(value).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : 'Present';

</script>

<template>
  <div :aria-busy="loading">
    <p v-if="loading" class="status-panel" role="status">Loading experience…</p>
    <div v-else-if="error" class="status-panel" role="alert"><p>{{ error }}</p><button class="text-link mt-3" type="button" @click="load(meta?.current_page || 1)">Try again</button></div>
    <p v-else-if="!experiences.length" class="status-panel">I'll be adding my experience here soon.</p>
    <ol v-else class="space-y-5">
      <li v-for="experience in experiences" :key="experience.id" class="glass-card grid gap-6 p-7 sm:p-9 md:grid-cols-[13rem_1fr]">
        <div>
          <span class="icon-box mb-5"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#briefcase" /></svg></span>
          <p class="font-mono text-xs text-accent">{{ experience.start_date ? formatDate(experience.start_date) : 'Date not specified' }} – {{ formatDate(experience.end_date) }}</p>
          <p class="mt-2 text-xs text-muted">{{ experience.location }}</p>
        </div>
        <div class="min-w-0">
          <h2 class="text-2xl font-medium tracking-tight">{{ experience.company }}</h2>
          <p class="mt-2 text-sm text-accent">{{ experience.position }}</p>
          <p class="mt-5 whitespace-pre-line text-sm text-muted">{{ experience.description }}</p>
          <div class="mt-6 flex flex-wrap gap-2"><span v-for="tech in experience.technologies" :key="tech.id" class="tag">{{ tech.name }}</span></div>
          <div v-if="experience.evidence_images?.length" class="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-label="Experience evidence">
            <ContentImage v-for="image in experience.evidence_images" :key="image.id" :image="image" linked />
          </div>
        </div>
      </li>
    </ol>
    <ContentPagination v-if="!error" :meta="meta" :loading="loading" @change="load" />
  </div>
</template>
