<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAsync } from '@/shared/composables/useAsync';
import { apiGet } from '@/shared/composables/useApi';
import { getColorSet } from '@/shared/constants/design';
import { BaseCard, BaseTag, Skeleton, BaseButton } from '@/components/ui';

interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  short_description?: string;
  category: string;
  year?: string;
  featured: boolean;
  technologies: Array<{ id: number; name: string }>;
}

const { data: projects, loading, error, execute } = useAsync<ProjectItem[]>();
const categories = ref<string[]>(['All']);
const selected = ref('All');

const filtered = computed(() => {
  if (selected.value === 'All') return projects.value ?? [];
  return (projects.value ?? []).filter(p => p.category === selected.value);
});

onMounted(() => {
  execute(apiGet<ProjectItem[]>('/projects', { per_page: 50 })).then(() => {
    if (projects.value) {
      const cats = [...new Set(projects.value.map(p => p.category).filter(Boolean))];
      categories.value = ['All', ...cats];
    }
  });
});
</script>

<template>
  <div class="space-y-8">
    <div class="flex flex-wrap items-center gap-2 pb-2">
      <BaseButton
        v-for="cat in categories"
        :key="cat"
        variant="ghost"
        size="sm"
        class="px-3.5 py-1.5 rounded-full text-xs font-mono"
        :class="{ 'glass-button-primary': selected === cat, 'glass-subtle text-muted': selected !== cat }"
        @click="selected = cat"
      >
        {{ cat }}
      </BaseButton>
    </div>

    <Skeleton v-if="loading" variant="card" count="6" />

    <div v-else-if="error" class="glass-card rounded-2xl p-6 border border-red-300">
      <p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p>
      <p class="mt-1 text-muted font-mono text-xs">{{ error }}</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a
        v-for="(proj, idx) in filtered"
        :key="proj.slug"
        :href="`/projects/${proj.slug}`"
      >
        <BaseCard variant="hover" class="flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex justify-between items-center font-mono text-xs">
              <BaseTag :variant="getColorSet(idx)" size="xs">
                {{ proj.category }}
              </BaseTag>
              <span class="text-muted">{{ proj.year }}</span>
            </div>

            <h3 class="text-xl font-semibold text-ink group-hover:text-lavender-strong transition-colors">
              {{ proj.title }}
            </h3>

            <p class="text-sm text-muted line-clamp-3">{{ proj.short_description }}</p>
          </div>

          <div class="pt-4 mt-4 border-t border-[#686A73]/15">
            <div class="flex flex-wrap gap-1.5">
              <BaseTag
                v-for="tech in proj.technologies"
                :key="tech.id"
                variant="default"
                size="xs"
              >
                {{ tech.name }}
              </BaseTag>
            </div>
          </div>
        </BaseCard>
      </a>
    </div>
  </div>
</template>