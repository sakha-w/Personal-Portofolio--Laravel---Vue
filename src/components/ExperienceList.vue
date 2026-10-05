<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAsync } from '@/shared/composables/useAsync';
import { formatDate } from '@/shared/composables/useDate';
import { apiGet } from '@/shared/composables/useApi';
import { BaseCard, BaseTag, Skeleton } from '@/components/ui';
import type { Experience } from '@/types';

interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  location?: string;
  start_date: string | null;
  end_date: string | null;
  description?: string;
  featured: boolean;
  technologies: Array<{ id: number; name: string }>;
}

const { data: experiences, loading, error, execute } = useAsync<ExperienceItem[]>();

onMounted(() => {
  execute(apiGet<ExperienceItem[]>('/experiences'));
});
</script>

<template>
  <div class="space-y-6">
    <Skeleton v-if="loading" variant="card" count="3" />

    <div v-else-if="error" class="glass-card rounded-2xl p-6 border border-red-300">
      <p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p>
      <p class="mt-1 text-muted font-mono text-xs">{{ error }}</p>
    </div>

    <div v-else class="space-y-6">
      <BaseCard
        v-for="exp in experiences ?? []"
        :key="exp.id"
        variant="hover"
        class="space-y-4"
      >
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span class="font-mono text-xs uppercase tracking-wider font-semibold text-lavender-strong">
              {{ exp.company }}
            </span>
            <h3 class="text-xl font-semibold text-ink mt-0.5">{{ exp.position }}</h3>
            <p class="font-mono text-xs text-muted mt-1">
              {{ exp.location }} · {{ formatDate(exp.start_date) }} — {{ formatDate(exp.end_date) }}
            </p>
          </div>
          <BaseTag
            v-if="exp.featured"
            variant="mint-border"
            size="xs"
            class="self-start"
          >
            ● Featured
          </BaseTag>
        </div>

        <p class="text-sm text-muted">{{ exp.description }}</p>

        <div
          v-if="exp.technologies && exp.technologies.length"
          class="pt-4 mt-4 border-t border-[#686A73]/15"
        >
          <div class="flex flex-wrap gap-1.5">
            <BaseTag
              v-for="tech in exp.technologies"
              :key="tech.id"
              variant="default"
              size="xs"
            >
              {{ tech.name }}
            </BaseTag>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>