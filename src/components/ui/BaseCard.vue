<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'default' | 'subtle' | 'hover';
  padding?: 'default' | 'sm' | 'lg';
  rounded?: 'default' | 'xl' | '2xl' | '3xl';
  class?: string;
}>(), {
  variant: 'default',
  padding: 'default',
  rounded: '2xl',
});

const variantClasses = {
  default: 'glass-card',
  subtle: 'glass-subtle',
  hover: 'glass-card group',
};

const paddingClasses = {
  default: 'p-6 sm:p-8',
  sm: 'p-5 sm:p-6',
  lg: 'p-8 sm:p-10',
};

const roundedClasses = {
  default: 'rounded-2xl',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
};

const { variant, padding, rounded, ...attrs } = props;
</script>

<template>
  <div
    :class="[
      variantClasses[variant],
      paddingClasses[padding],
      roundedClasses[rounded],
    ]"
    v-bind="attrs"
  >
    <slot />
  </div>
</template>