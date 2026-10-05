<script setup lang="ts">
import { useAsync } from '@/shared/composables/useAsync';
import { formatDate } from '@/shared/composables/useDate';
import { apiGet } from '@/shared/composables/useApi';
import { BaseCard, BaseTag, Skeleton } from '@/components/ui';

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

const { data: educations, loading, error, execute } = useAsync<EducationItem[]>();

onMounted(() => {
  execute(apiGet<EducationItem[]>('/educations'));
});
</script>

<template>
  <div class="space-y-6">
    <Skeleton v-if="loading" variant="card" count="2" />

    <div v-else-if="error" class="glass-card rounded-2xl p-6 border border-red-300">
      <p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p>
      <p class="mt-1 text-muted font-mono text-xs">{{ error }}</p>
    </div>

    <div v-else class="space-y-6">
      <BaseCard
        v-for="edu in educations ?? []"
        :key="edu.id"
        variant="default"
        class="space-y-3"
      >
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span class="font-mono text-xs uppercase tracking-wider font-semibold text-lavender-strong">
              {{ edu.institution }}
            </span>
            <h3 class="text-xl font-semibold text-ink mt-0.5">{{ edu.degree }}</h3>
            <p class="font-mono text-xs text-muted mt-1">
              {{ edu.location }} · {{ edu.period }}
            </p>
          </div>
          <BaseTag
            v-if="edu.gpa"
            variant="mint-border"
            size="default"
            class="self-start"
          >
            GPA {{ edu.gpa }}
          </BaseTag>
        </div>

        <div v-if="edu.thesis" class="p-3.5 rounded-xl glass-subtle border border-white text-xs space-y-1">
          <p class="font-mono text-xs text-lavender-strong text-[11px] uppercase tracking-wider font-semibold">
            UNDERGRADUATE THESIS
          </p>
          <p class="italic text-ink">"{{ edu.thesis }}"</p>
        </div>

        <p v-if="edu.description" class="text-sm text-muted pt-1">{{ edu.description }}</p>
      </BaseCard>
    </div>
  </div>
</template>