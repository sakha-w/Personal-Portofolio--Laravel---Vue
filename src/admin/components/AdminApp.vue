<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import { request } from '../admin-api';
import { sections } from '../admin-content';
import AdminLogin from './AdminLogin.vue';
import ContentEditor from './ContentEditor.vue';

const props = defineProps({ login: Boolean });
const user = ref(null);
const checking = ref(true);
const loginReady = ref(false);
const initial = new URLSearchParams(window.location.search).get('section');
const section = ref(Object.hasOwn(sections, initial) ? initial : 'projects');
const definition = computed(() => sections[section.value]);
const records = ref([]);
const technologies = ref([]);
const categories = ref([]);
const category = ref('');
const query = ref('');
const meta = ref({ current_page: 1, last_page: 1, total: 0 });
const loading = ref(false);
const busy = ref(false);
const error = ref('');
const status = ref(0);
const notice = ref('');
const editing = ref(false);
const record = ref(null);
const dirty = ref(false);
let controller;

function showError(failure) {
    error.value = failure.message || 'The request failed. Please try again.';
    status.value = failure.status || 0;
}

async function initialize() {
    checking.value = true;
    error.value = '';
    status.value = 0;
    try {
        user.value = (await request('/api/me')).data;
        if (props.login) window.location.replace('/admin');
        else await load();
    } catch (failure) {
        if (failure.status === 401) {
            if (props.login) loginReady.value = true;
            else window.location.replace('/admin/login');
        } else showError(failure);
    } finally {
        checking.value = false;
    }
}

async function load(page = 1) {
    controller?.abort();
    const active = new AbortController();
    controller = active;
    loading.value = true;
    error.value = '';
    status.value = 0;
    const params = new URLSearchParams({ page: String(page), per_page: '25' });
    if (query.value.trim()) params.set('q', query.value.trim());
    if (category.value) params.set('category', category.value);
    try {
        const [result, skills] = await Promise.all([
            request(`/api/${section.value}?${params}`, { signal: active.signal }),
            definition.value.technologies ? request('/api/skills', { signal: active.signal }) : null,
        ]);
        if (controller !== active) return;
        records.value = result.data;
        meta.value = result.meta;
        categories.value = result.meta.categories || [];
        if (skills) technologies.value = Object.values(skills.data).flat().sort((a, b) => a.name.localeCompare(b.name));
        if (!result.data.length && page > 1) await load(page - 1);
    } catch (failure) {
        if (failure.name !== 'AbortError' && controller === active) showError(failure);
    } finally {
        if (controller === active) loading.value = false;
    }
}

function discard() {
    if (dirty.value && !window.confirm('Discard your unsaved changes?')) return false;
    dirty.value = false;
    editing.value = false;
    record.value = null;
    nextTick(() => document.getElementById('content-heading')?.focus());
    return true;
}

function switchSection(key) {
    if (busy.value || !discard()) return;
    section.value = key;
    query.value = '';
    category.value = '';
    notice.value = '';
    window.history.replaceState(null, '', `/admin?section=${key}`);
    load();
}

async function edit(item = null) {
    busy.value = true;
    error.value = '';
    notice.value = '';
    try {
        record.value = item ? (await request(`/api/${section.value}/${section.value === 'projects' ? encodeURIComponent(item.slug) : item.id}`)).data : null;
        dirty.value = false;
        editing.value = true;
    } catch (failure) {
        showError(failure);
    } finally {
        busy.value = false;
    }
}

async function saved() {
    dirty.value = false;
    editing.value = false;
    record.value = null;
    notice.value = 'Saved. Your content is now available on the portfolio.';
    await load();
    await nextTick();
    document.getElementById('content-heading')?.focus();
}

async function remove(item) {
    const extra = section.value === 'technologies' ? ' This also removes it from project and experience selections.' : ' Its uploaded images will also be removed.';
    if (!window.confirm(`Delete “${item[definition.value.title]}”?${extra}`)) return;
    busy.value = true;
    error.value = '';
    try {
        await request(`/api/${section.value}/${item.id}`, { method: 'DELETE' });
        notice.value = 'Content deleted.';
        await load(meta.value.current_page);
    } catch (failure) {
        showError(failure);
    } finally {
        busy.value = false;
    }
}

async function logout() {
    if (!discard()) return;
    busy.value = true;
    try {
        await request('/sanctum/csrf-cookie');
        await request('/auth/logout', { method: 'POST' });
        window.location.assign('/admin/login');
    } catch (failure) {
        showError(failure);
        busy.value = false;
    }
}

function beforeUnload(event) {
    if (dirty.value) { event.preventDefault(); event.returnValue = ''; }
}
onMounted(() => {
    initialize();
    window.addEventListener('beforeunload', beforeUnload);
});
onBeforeUnmount(() => {
    controller?.abort();
    window.removeEventListener('beforeunload', beforeUnload);
});
</script>

<template>
    <main v-if="checking" id="main-content" class="admin-shell" aria-busy="true">
        <p class="status-panel" role="status">Checking your owner session…</p>
    </main>
    <AdminLogin v-else-if="login && loginReady" />
    <div v-else-if="user && !login" class="admin-shell">
        <header class="mb-8 flex flex-wrap items-center justify-between gap-5">
            <div><p class="eyebrow">PORTFOLIO / OWNER WORKSPACE</p><h1 class="mt-2 text-3xl font-medium tracking-tight">Content studio</h1></div>
            <div class="flex flex-wrap items-center gap-3">
                <span class="text-sm text-muted">{{ user?.name }}</span>
                <a href="/" class="button" target="_blank" rel="noopener">View portfolio ↗</a>
                <button class="button" :disabled="busy" @click="logout">Sign out</button>
            </div>
        </header>
        <div class="admin-layout">
            <nav class="glass-nav admin-nav" aria-label="Content collections">
                <button v-for="(item, key) in sections" :key="key" class="nav-link" :aria-current="section === key ? 'page' : undefined" :disabled="busy" @click="switchSection(key)">{{ item.label }}</button>
            </nav>
            <main id="main-content" class="min-w-0 space-y-5">
                <div v-if="notice" class="status-panel" role="status">{{ notice }}</div>
                <div v-if="error" class="status-panel" role="alert">
                    <p>{{ error }}</p>
                    <a v-if="[401, 419].includes(status)" href="/admin/login" class="text-link mt-3" target="_blank" rel="noopener">Sign in in a new tab</a>
                    <button v-else type="button" class="text-link mt-3" @click="load(meta.current_page)">Try again</button>
                </div>
                <ContentEditor v-if="editing" :key="`${section}-${record?.id || 'new'}`" :section="section" :definition="definition" :record="record" :technologies="technologies" @dirty="dirty = $event" @saving="busy = $event" @saved="saved" @cancel="discard" />
                <section v-else class="glass-card overflow-hidden" :aria-busy="loading || busy">
                    <div class="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-7">
                        <div><h2 id="content-heading" tabindex="-1" class="text-2xl font-medium">{{ definition.label }}</h2><p class="mt-2 text-sm text-muted">{{ meta.total }} records · manage what visitors see.</p></div>
                        <button class="button button-primary" :disabled="loading || busy || !!error" @click="edit()">Add {{ definition.singular }}</button>
                    </div>
                    <form class="flex flex-wrap items-end gap-3 px-5 pb-5 sm:px-7" @submit.prevent="load()">
                        <div class="min-w-0 flex-1"><label for="content-search" class="field-label">Search {{ definition.label.toLowerCase() }}</label><input id="content-search" v-model="query" type="search" class="field" maxlength="100" /></div>
                        <div v-if="section === 'projects'"><label for="category-filter" class="field-label">Category</label><select id="category-filter" v-model="category" class="field"><option value="">All categories</option><option v-for="value in categories" :key="value">{{ value }}</option></select></div>
                        <button class="button" :disabled="loading || busy">Search</button>
                    </form>
                    <p v-if="loading" class="px-7 pb-7 text-muted" role="status">Loading content…</p>
                    <p v-else-if="!records.length && !error" class="px-7 pb-7 text-muted">No matching records. Add your first {{ definition.singular }} or change the search.</p>
                    <div v-else-if="!error" class="overflow-x-auto">
                        <table class="admin-table">
                            <thead><tr><th scope="col">Content</th><th scope="col">Details</th><th scope="col">Actions</th></tr></thead>
                            <tbody>
                                <tr v-for="item in records" :key="item.id">
                                    <td class="font-medium">{{ item[definition.title] }}</td>
                                    <td class="text-muted">{{ item[definition.subtitle] }}<span v-if="item.featured" class="tag ml-2">Featured</span></td>
                                    <td><div class="flex gap-2"><button class="button" :aria-label="`Edit ${item[definition.title]}`" :disabled="busy" @click="edit(item)">Edit</button><button class="button danger-button" :aria-label="`Delete ${item[definition.title]}`" :disabled="busy" @click="remove(item)">Delete</button></div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <nav v-if="meta.last_page > 1" class="flex flex-wrap items-center justify-between gap-3 border-t border-line p-5" aria-label="Content pagination">
                        <button class="button" :disabled="loading || meta.current_page <= 1" @click="load(meta.current_page - 1)">Previous</button>
                        <span class="text-sm text-muted">Page {{ meta.current_page }} of {{ meta.last_page }}</span>
                        <button class="button" :disabled="loading || meta.current_page >= meta.last_page" @click="load(meta.current_page + 1)">Next</button>
                    </nav>
                </section>
            </main>
        </div>
    </div>
    <main v-else id="main-content" class="admin-shell">
        <section class="glass-card space-y-4 p-7">
            <h1 class="text-2xl font-medium">Owner workspace</h1>
            <p v-if="error" role="alert">{{ error }}</p>
            <p v-else role="status">Opening your workspace…</p>
            <div v-if="error" class="flex flex-wrap gap-3">
                <button class="button" @click="initialize">Try again</button>
                <button v-if="status === 403" class="button" :disabled="busy" @click="logout">Sign out</button>
                <a class="button" href="/">Back to portfolio</a>
            </div>
        </section>
    </main>
</template>
