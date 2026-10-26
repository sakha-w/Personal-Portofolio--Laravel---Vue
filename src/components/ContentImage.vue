<script setup lang="ts">
import type { ContentImageData } from './portfolio';

defineProps<{ image: ContentImageData; crop?: boolean; linked?: boolean; eager?: boolean }>();
</script>

<template>
  <component :is="linked ? 'a' : 'div'" :href="linked ? image.url : undefined" :target="linked ? '_blank' : undefined" :rel="linked ? 'noopener noreferrer' : undefined" :aria-label="linked ? `View full-size image: ${image.alt}` : undefined" class="block min-w-0">
    <img :src="image.url" :alt="image.alt" :width="image.width" :height="image.height" :loading="eager ? 'eager' : 'lazy'" decoding="async" class="w-full rounded-xl border border-line bg-black/20" :class="crop ? 'aspect-video object-cover' : 'h-auto max-h-[32rem] object-contain'" />
  </component>
</template>
