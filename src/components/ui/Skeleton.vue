<script setup lang="ts">
interface Props {
  variant?: 'card' | 'text' | 'title' | 'subtitle' | 'cardFull';
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'card',
  count: 1,
});

const baseClass = 'animate-pulse bg-[#686A73]/10 rounded';

const variantClasses = {
  card: `${baseClass} h-5 w-1/2`,
  text: `${baseClass} h-3 w-full`,
  title: `${baseClass} h-4 w-1/3`,
  subtitle: `${baseClass} h-6 w-3/4`,
  cardFull: `${baseClass} min-h-[160px]`,
};
</script>

<template>
  <div v-if="count > 1" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div v-for="i in count" :key="i" :class="[variantClasses[variant], 'space-y-3']">
      <div v-if="variant === 'card' || variant === 'cardFull'" class="space-y-3">
        <div :class="['title', baseClass]"></div>
        <div :class="['subtitle', baseClass]"></div>
        <div :class="['text', baseClass]"></div>
      </div>
      <div v-else :class="[variant, baseClass]"></div>
    </div>
  </div>
  <div v-else :class="[variantClasses[variant], 'space-y-3']">
    <div v-if="variant === 'card' || variant === 'cardFull'" class="space-y-3">
      <div :class="['title', baseClass]"></div>
      <div :class="['subtitle', baseClass]"></div>
      <div :class="['text', baseClass]"></div>
    </div>
  </div>
</template>