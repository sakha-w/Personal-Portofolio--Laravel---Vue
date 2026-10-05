<script setup lang="ts">
interface Props {
  variant?: 'default' | 'lavender' | 'blue' | 'mint' | 'peach' | 'pink' | 'mint-border' | 'blue-border' | 'lavender-border' | 'peach-border';
  size?: 'default' | 'sm' | 'xs';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
});

const colorClasses = {
  default: 'bg-white/70 text-ink border-white',
  lavender: 'bg-lavender/30 text-ink border-lavender',
  blue: 'bg-blue/35 text-ink border-blue',
  mint: 'bg-mint/35 text-ink border-mint',
  peach: 'bg-peach/40 text-ink border-peach',
  pink: 'bg-pink/40 text-ink border-pink',
  'mint-border': 'bg-mint/40 text-ink border-mint',
  'blue-border': 'bg-blue/40 text-ink border-blue',
  'lavender-border': 'bg-lavender/35 text-ink border-lavender',
  'peach-border': 'bg-peach/40 text-ink border-peach',
};

const sizeClasses = {
  default: 'px-2.5 py-0.5 text-xs',
  sm: 'px-2 py-0.5 text-[11px]',
  xs: 'px-1.5 py-0.5 text-[10px]',
};
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1 font-mono font-medium rounded-full border',
      sizeClasses[size],
      colorClasses[variant],
    ]"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>