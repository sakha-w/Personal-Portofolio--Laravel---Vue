<script setup>
import { onBeforeUnmount, ref } from 'vue';

const props = defineProps({ modelValue: { type: Array, required: true }, limit: { type: Number, required: true }, errors: { type: Object, default: () => ({}) } });
const emit = defineEmits(['update:modelValue']);
const error = ref('');
const urls = new Set();

function select(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    error.value = '';
    if (!files.length) return;
    if (files.length + (props.limit === 1 ? 0 : props.modelValue.length) > props.limit) {
        error.value = `Choose at most ${props.limit} images in total.`;
        return;
    }
    if (files.some(file => !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 2 * 1024 * 1024)) {
        error.value = 'Choose JPEG, PNG, or WebP images up to 2 MiB each.';
        return;
    }
    const entries = files.map(file => {
        const url = URL.createObjectURL(file);
        urls.add(url);
        return { file, url, alt: '' };
    });
    if (props.limit === 1) props.modelValue.forEach(release);
    emit('update:modelValue', props.limit === 1 ? entries : [...props.modelValue, ...entries]);
}

function release(entry) {
    if (urls.delete(entry.url)) URL.revokeObjectURL(entry.url);
}

function remove(index) {
    release(props.modelValue[index]);
    emit('update:modelValue', props.modelValue.filter((_, position) => position !== index));
}

function updateAlt(index, value) {
    emit('update:modelValue', props.modelValue.map((entry, position) => position === index ? { ...entry, alt: value } : entry));
}

onBeforeUnmount(() => urls.forEach(url => URL.revokeObjectURL(url)));
</script>

<template>
    <fieldset class="space-y-4 border-t border-line pt-6">
        <legend class="px-1 font-medium">{{ limit === 3 ? 'Experience evidence' : 'Cover / certificate image' }}</legend>
        <p id="upload-help" class="text-sm text-muted">JPEG, PNG, or WebP · 2 MiB per image · up to 4096 × 4096 pixels. {{ limit === 3 ? 'Maximum 3 evidence images.' : 'Choose a new image to replace the current one.' }}</p>
        <label for="content-images" class="field-label">{{ limit === 3 ? 'Add evidence images' : 'Upload image' }}</label>
        <input id="content-images" class="field" type="file" accept="image/jpeg,image/png,image/webp" :multiple="limit > 1" :disabled="limit > 1 && modelValue.length >= limit" aria-describedby="upload-help upload-error" @change="select" />
        <p v-if="error" id="upload-error" role="alert" class="field-error">{{ error }}</p>
        <div v-if="modelValue.length" class="grid gap-4" :class="{ 'md:grid-cols-3': limit === 3 }">
            <div v-for="(entry, index) in modelValue" :key="entry.id || entry.url" class="min-w-0 rounded-xl border border-line p-3">
                <img :src="entry.url" :alt="entry.alt || 'Selected image preview'" class="upload-preview" />
                <label :for="`image-alt-${index}`" class="field-label mt-4">Image {{ index + 1 }} description</label>
                <input :id="`image-alt-${index}`" :value="entry.alt" class="field" required maxlength="255" :aria-invalid="!!(errors.image_alt || errors[`evidence_images.${index}.alt`])" @input="updateAlt(index, $event.target.value)" />
                <button type="button" class="text-link danger-button mt-3 min-h-11" @click="remove(index)">Remove image {{ index + 1 }}</button>
            </div>
        </div>
        <p class="text-xs text-muted" aria-live="polite">{{ modelValue.length }} / {{ limit }} images selected. Changes apply when you save.</p>
        <p v-for="([field, messages]) in Object.entries(errors).filter(([field]) => field.startsWith('image') || field.startsWith('evidence') || field === 'remove_image')" :key="field" class="field-error" role="alert">{{ messages[0] }}</p>
    </fieldset>
</template>
