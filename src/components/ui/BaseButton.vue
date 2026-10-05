<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'subtle' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'default',
  fullWidth: false,
  loading: false,
});

const emit = defineEmits<{ click: [event: MouseEvent] }>();

const variantClasses = {
  primary: 'glass-button-primary',
  secondary: 'glass-button-secondary',
  subtle: 'glass-subtle text-muted hover:text-ink hover:bg-white/50',
  ghost: 'text-muted hover:text-ink',
};

const sizeClasses = {
  default: 'px-5 py-2.5 text-sm',
  sm: 'px-3.5 py-1.5 text-xs',
  lg: 'px-6 py-3 text-base',
};

const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-full font-sans tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';
</script>

<template>
  <button
    :class="[
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? 'w-full' : '',
      loading && 'opacity-50 cursor-wait',
    ]"
    :disabled="loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="animate-spin">⟳</span>
    <slot />
  </button>
</template>