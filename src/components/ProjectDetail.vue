<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAsync } from '@/shared/composables/useAsync';
import { apiGet } from '@/shared/composables/useApi';
import { getColorSet, getIssuerColorSet } from '@/shared/constants/design';
import { BaseCard, BaseTag, BaseButton, Skeleton } from '@/components/ui';

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

const { data: project, loading, error, execute } = useAsync<ProjectDetailData>();

onMounted(() => {
  execute(apiGet<ProjectDetailData>(`/projects/${props.slug}`));
});
</script>

<template>
  <div class="space-y-8">
    <BaseButton variant="ghost" size="sm" class="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-ink" @click="$router.push('/projects')">
      <span>←</span>
      <span>Back to all projects</span>
    </BaseButton>

    <Skeleton v-if="loading" variant="cardFull" />

    <div v-else-if="error" class="glass-card rounded-2xl p-6 border border-red-300">
      <p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p>
      <p class="mt-1 text-muted font-mono text-xs">{{ error }}</p>
    </div>

    <div v-else-if="project" class="space-y-8">
      <BaseCard variant="default" class="space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <BaseTag :variant="getColorSet(0)" size="default">
              {{ project.category }}
            </BaseTag>
            <span class="font-mono text-xs text-muted">Year: {{ project.year }}</span>
          </div>

          <div class="flex items-center gap-2">
            <BaseButton
              v-if="project.github_url"
              variant="secondary"
              size="sm"
              tag="a"
              :href="project.github_url"
              target="_blank"
              rel="noopener noreferrer"
              class="font-mono text-xs"
            >
              <span>GitHub</span>
              <span class="text-[10px]">↗</span>
            </BaseButton>
            <BaseButton
              v-if="project.demo_url"
              variant="primary"
              size="sm"
              tag="a"
              :href="project.demo_url"
              target="_blank"
              rel="noopener noreferrer"
              class="font-semibold"
            >
              <span>Live Demo</span>
              <span class="text-[10px]">↗</span>
            </BaseButton>
          </div>
        </div>

        <h1 class="text-3xl sm:text-4xl font-bold text-ink">{{ project.title }}</h1>

        <p class="text-base text-muted max-w-3xl">{{ project.description }}</p>

        <div v-if="project.technologies && project.technologies.length" class="pt-6 mt-6 border-t border-[#686A73]/15">
          <p class="font-mono text-xs text-muted mb-2 uppercase tracking-wider">TECHNOLOGY STACK</p>
          <div class="flex flex-wrap gap-1.5">
            <BaseTag
              v-for="tech in project.technologies"
              :key="tech.id"
              variant="default"
              size="xs"
            >
              {{ tech.name }}
            </BaseTag>
          </div>
        </div>
      </BaseCard>

      <div class="space-y-4">
        <h2 class="font-mono text-xs uppercase tracking-wider text-muted font-semibold">// CASE_STUDY_ANALYSIS</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseCard v-if="project.architecture" variant="default" class="border-t-2 border-t-lavender space-y-2">
            <div class="flex items-center gap-2 font-mono text-xs text-lavender-strong">
              <span class="px-1.5 py-0.5 rounded bg-lavender/30 text-ink font-semibold">[01]</span>
              <span class="uppercase font-semibold">Architecture</span>
            </div>
            <p class="text-sm text-muted pt-1">{{ project.architecture }}</p>
          </BaseCard>

          <BaseCard v-if="project.challenge" variant="default" class="border-t-2 border-t-peach space-y-2">
            <div class="flex items-center gap-2 font-mono text-xs text-peach-strong">
              <span class="px-1.5 py-0.5 rounded bg-peach/40 text-ink font-semibold">[02]</span>
              <span class="uppercase font-semibold">Technical Challenge</span>
            </div>
            <p class="text-sm text-muted pt-1">{{ project.challenge }}</p>
          </BaseCard>

          <BaseCard v-if="project.solution" variant="default" class="border-t-2 border-t-blue space-y-2">
            <div class="flex items-center gap-2 font-mono text-xs text-blue-strong">
              <span class="px-1.5 py-0.5 rounded bg-blue/40 text-ink font-semibold">[03]</span>
              <span class="uppercase font-semibold">Solution Implementation</span>
            </div>
            <p class="text-sm text-muted pt-1">{{ project.solution }}</p>
          </BaseCard>

          <BaseCard v-if="project.result" variant="default" class="border-t-2 border-t-mint space-y-2">
            <div class="flex items-center gap-2 font-mono text-xs text-mint-strong">
              <span class="px-1.5 py-0.5 rounded bg-mint/40 text-ink font-semibold">[04]</span>
              <span class="uppercase font-semibold">Outcome & Results</span>
            </div>
            <p class="text-sm text-muted pt-1">{{ project.result }}</p>
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>