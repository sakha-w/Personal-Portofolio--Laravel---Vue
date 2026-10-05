<script setup lang="ts">
import { useAsync } from '@/shared/composables/useAsync';
import { apiGet } from '@/shared/composables/useApi';
import { BaseCard, BaseTag, Skeleton } from '@/components/ui';

interface SkillItem {
  id: number;
  name: string;
  slug: string;
}

const { data: groups, loading, error, execute } = useAsync<Record<string, SkillItem[]>>();

onMounted(() => {
  execute(apiGet<Record<string, SkillItem[]>>('/skills'));
});
</script>

<template>
  <div class="space-y-6">
    <Skeleton v-if="loading" variant="card" count="4" />

    <div v-else-if="error" class="glass-card rounded-2xl p-6 border border-red-300">
      <p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p>
      <p class="mt-1 text-muted font-mono text-xs">{{ error }}</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BaseCard
        v-for="(items, category) in groups ?? {}"
        :key="category"
        variant="default"
        class="space-y-4"
      >
        <div class="flex items-center justify-between border-b border-[#686A73]/15 pb-3">
          <h2 class="font-mono text-xs font-bold uppercase tracking-wider text-lavender-strong">
            // {{ category }}
          </h2>
          <span class="font-mono text-xs text-muted text-[11px]">{{ items.length }} skills</span>
        </div>

        <div class="flex flex-wrap gap-2 pt-1">
          <BaseTag
            v-for="tech in items"
            :key="tech.id"
            variant="default"
            size="sm"
            class="hover:border-lavender hover:bg-lavender/20 transition-all cursor-default"
          >
            {{ tech.name }}
          </BaseTag>
        </div>
      </BaseCard>
    </div>
  </div>
</template>