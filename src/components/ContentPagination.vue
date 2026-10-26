<script setup lang="ts">
import type { PageMeta } from './portfolio';

defineProps<{ meta: PageMeta | null; loading: boolean }>();
defineEmits<{ change: [page: number] }>();
</script>

<template>
  <nav v-if="meta && meta.last_page > 1" class="mt-8 flex flex-wrap items-center justify-between gap-4" aria-label="Pagination">
    <button class="button" :disabled="loading || meta.current_page <= 1" @click="$emit('change', meta.current_page - 1)">Previous</button>
    <span class="text-sm text-muted" aria-live="polite">Page {{ meta.current_page }} of {{ meta.last_page }}</span>
    <button class="button" :disabled="loading || meta.current_page >= meta.last_page" @click="$emit('change', meta.current_page + 1)">Next</button>
  </nav>
</template>
