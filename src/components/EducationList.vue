<script setup lang="ts">
import { useCollection } from './portfolio';
import ContentPagination from './ContentPagination.vue';

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  location?: string;
  period?: string;
  gpa?: string;
  thesis?: string;
  description?: string;
}
const { items: educations, meta, loading, error, load } = useCollection<EducationItem>('educations', "My education details couldn't be loaded. Please try again.");
</script>

<template>
  <div :aria-busy="loading">
    <p v-if="loading" class="status-panel" role="status">Loading education…</p>
    <div v-else-if="error" class="status-panel" role="alert"><p>{{ error }}</p><button class="text-link mt-3" type="button" @click="load(meta?.current_page || 1)">Try again</button></div>
    <p v-else-if="!educations.length" class="status-panel">I'll be adding my education details here soon.</p>
    <div v-else class="grid gap-5 md:grid-cols-2">
      <article v-for="education in educations" :key="education.id" class="glass-card flex flex-col p-7 sm:p-9">
        <div class="flex items-center justify-between gap-3"><span class="icon-box"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#school" /></svg></span><span class="font-mono text-xs text-muted">{{ education.period }}</span></div>
        <p class="eyebrow mt-8 mb-3">{{ education.institution }}</p>
        <h2 class="text-2xl font-medium leading-snug tracking-tight">{{ education.degree }}</h2>
        <p class="mt-3 text-xs text-muted">{{ education.location }}<span v-if="education.gpa"> · GPA {{ education.gpa }}</span></p>
        <p v-if="education.description" class="mt-5 whitespace-pre-line text-sm text-muted">{{ education.description }}</p>
        <div v-if="education.thesis" class="mt-7 border-t border-line pt-5">
          <h3 class="mb-2 text-sm text-accent">My thesis</h3><p class="whitespace-pre-line text-sm text-muted">{{ education.thesis }}</p>
        </div>
      </article>
    </div>
    <ContentPagination v-if="!error" :meta="meta" :loading="loading" @change="load" />
  </div>
</template>
