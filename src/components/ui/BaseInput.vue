<script setup lang="ts">
import { useAttrs } from 'vue';

interface Props {
  modelValue?: string;
  label?: string;
  type?: 'text' | 'email' | 'textarea' | 'password';
  error?: string;
  rows?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  rows: 4,
});

const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
const attrs = useAttrs();

const inputClasses = 'w-full px-3.5 py-2.5 rounded-xl glass-input text-sm placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-lavender/50 disabled:opacity-50';
</script>

<template>
  <div class="space-y-1.5">
    <label v-if="label" :for="id" class="block font-mono text-xs leading-normal tracking-normal text-muted mb-1.5 uppercase tracking-wider">
      {{ label }}
    </label>
    <textarea
      v-if="type === 'textarea'"
      :class="[inputClasses, error && 'border-peach border']"
      :id="attrs.id"
      :disabled="attrs.disabled"
      :required="attrs.required"
      :placeholder="attrs.placeholder"
      :rows="rows"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="attrs"
    />
    <input
      v-else
      :type="type"
      :class="[inputClasses, error && 'border-peach border']"
      :id="attrs.id"
      :disabled="attrs.disabled"
      :required="attrs.required"
      :placeholder="attrs.placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="attrs"
    />
    <p v-if="error" class="font-mono text-xs leading-normal tracking-normal text-peach-strong text-[11px] mt-1">{{ error }}</p>
  </div>
</template>