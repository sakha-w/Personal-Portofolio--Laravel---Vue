<script setup>
import { computed, nextTick, reactive, ref, watch } from 'vue';
import { request } from '../admin-api';
import ContentImages from './ContentImages.vue';

const props = defineProps({ section: String, definition: Object, record: Object, technologies: Array });
const emit = defineEmits(['saved', 'cancel', 'dirty', 'saving']);
const form = reactive(Object.fromEntries(props.definition.fields.map(field => [field.name, props.record?.[field.name] ?? field.default ?? (field.type === 'checkbox' ? false : '')])));
form.technology_ids = props.record?.technologies?.map(technology => technology.id) || [];
const images = ref(props.section === 'experiences' ? (props.record?.evidence_images || []).map(image => ({ ...image })) : props.record?.image ? [{ ...props.record.image }] : []);
const saving = ref(false);
const error = ref('');
const status = ref(0);
const errors = ref({});
const heading = ref(null);
const imageErrors = computed(() => errors.value);
watch([form, images], () => emit('dirty', true), { deep: true });
nextTick(() => heading.value?.focus());

async function save() {
    if (saving.value) return;
    saving.value = true;
    emit('saving', true);
    error.value = '';
    errors.value = {};
    status.value = 0;
    const payload = Object.fromEntries(props.definition.fields.map(field => [field.name, typeof form[field.name] === 'string' ? form[field.name].trim() || null : form[field.name]]));
    if (props.definition.technologies) payload.technology_ids = form.technology_ids;
    const body = new FormData();
    if (props.record) body.append('_method', 'PUT');
    if (props.section === 'experiences') {
        let uploadIndex = 0;
        payload.evidence_images = images.value.map(image => {
            if (!image.file) return { id: image.id, alt: image.alt.trim() };
            const index = uploadIndex++;
            body.append(`evidence_files[${index}]`, image.file);
            return { upload_index: index, alt: image.alt.trim() };
        });
    } else if (props.definition.imageLimit) {
        const image = images.value[0];
        if (image) {
            payload.image_alt = image.alt.trim();
            if (image.file) body.append('image', image.file);
        } else if (props.record?.image || props.record?.thumbnail) payload.remove_image = true;
    }
    body.append('data', JSON.stringify(payload));
    try {
        const result = await request(`/api/${props.section}${props.record ? `/${props.record.id}` : ''}`, { method: 'POST', body });
        emit('dirty', false);
        emit('saved', result.data);
    } catch (failure) {
        error.value = failure.message;
        errors.value = failure.errors || {};
        status.value = failure.status;
        await nextTick();
        document.querySelector('[aria-invalid="true"]')?.focus();
        if (!Object.keys(errors.value).length) document.getElementById('save-error')?.focus();
    } finally {
        saving.value = false;
        emit('saving', false);
    }
}
</script>

<template>
    <section class="glass-card p-5 sm:p-8">
        <p class="eyebrow">{{ record ? 'EDIT CONTENT' : 'NEW CONTENT' }}</p>
        <h2 ref="heading" tabindex="-1" class="mt-3 text-2xl font-medium">{{ record ? 'Edit' : 'Add' }} {{ definition.singular }}</h2>
        <p class="mt-2 text-sm text-muted">Saved changes appear on the public portfolio. Fields marked * are required.</p>
        <form class="mt-7 space-y-7" :aria-busy="saving" @submit.prevent="save">
            <div v-if="error" id="save-error" class="status-panel" role="alert" tabindex="-1">
                <p>{{ error }}</p>
                <a v-if="[401, 419].includes(status)" class="text-link mt-3" href="/admin/login" target="_blank" rel="noopener">Sign in in a new tab</a>
            </div>
            <fieldset :disabled="saving" class="grid min-w-0 gap-5 sm:grid-cols-2">
                <div v-for="field in definition.fields" :key="field.name" :class="{ 'sm:col-span-2': ['textarea', 'checkbox'].includes(field.type) }" class="min-w-0">
                    <label :for="`field-${field.name}`" class="field-label">{{ field.label }}<span v-if="field.required || (record && field.name === 'slug')"> *</span></label>
                    <textarea v-if="field.type === 'textarea'" :id="`field-${field.name}`" v-model="form[field.name]" class="field" rows="4" :maxlength="field.max || 20000" :aria-invalid="!!errors[field.name]" :aria-describedby="`help-${field.name} error-${field.name}`"></textarea>
                    <select v-else-if="field.type === 'select'" :id="`field-${field.name}`" v-model="form[field.name]" class="field" :required="field.required" :aria-invalid="!!errors[field.name]" :aria-describedby="`help-${field.name} error-${field.name}`">
                        <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
                    </select>
                    <input v-else-if="field.type === 'checkbox'" :id="`field-${field.name}`" v-model="form[field.name]" type="checkbox" class="h-5 w-5 accent-accent" />
                    <input v-else :id="`field-${field.name}`" v-model="form[field.name]" :type="field.type || 'text'" class="field" :required="field.required || (!!record && field.name === 'slug')" :maxlength="field.max || (field.type === 'url' ? 2048 : 255)" :min="field.name === 'end_date' ? form.start_date : undefined" :aria-invalid="!!errors[field.name]" :aria-describedby="`help-${field.name} error-${field.name}`" />
                    <p v-if="field.hint" :id="`help-${field.name}`" class="mt-2 text-xs text-muted">{{ field.hint }}</p>
                    <p v-if="errors[field.name]" :id="`error-${field.name}`" class="field-error">{{ errors[field.name][0] }}</p>
                </div>
                <div v-if="definition.technologies" class="sm:col-span-2">
                    <label for="technology-ids" class="field-label">Technologies</label>
                    <select id="technology-ids" v-model="form.technology_ids" multiple size="6" class="field" aria-describedby="technology-help technology-error" :aria-invalid="Object.keys(errors).some(key => key.startsWith('technology_ids'))">
                        <option v-for="technology in technologies" :key="technology.id" :value="technology.id">{{ technology.name }}</option>
                    </select>
                    <p id="technology-help" class="mt-2 text-xs text-muted">Use Ctrl / Command to select multiple technologies. Manage the available choices in Skills & technologies.</p>
                    <button type="button" class="text-link mt-2 min-h-11" @click="form.technology_ids = []">Clear technology selection</button>
                    <p id="technology-error" class="field-error">{{ Object.entries(errors).find(([key]) => key.startsWith('technology_ids'))?.[1]?.[0] }}</p>
                </div>
            </fieldset>
            <fieldset v-if="definition.imageLimit" :disabled="saving" class="min-w-0">
                <ContentImages v-model="images" :limit="definition.imageLimit" :errors="imageErrors" />
            </fieldset>
            <div class="flex flex-wrap gap-3 border-t border-line pt-6">
                <button class="button button-primary" :disabled="saving">{{ saving ? 'Saving…' : 'Save changes' }}</button>
                <button class="button" type="button" :disabled="saving" @click="emit('cancel')">Cancel</button>
            </div>
        </form>
    </section>
</template>
