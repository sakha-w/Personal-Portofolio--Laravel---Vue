<script setup>
import { nextTick, ref } from 'vue';
import { request } from '../admin-api';

const email = ref('');
const password = ref('');
const saving = ref(false);
const error = ref('');
const errors = ref({});

async function login() {
    saving.value = true;
    error.value = '';
    errors.value = {};
    try {
        await request('/sanctum/csrf-cookie');
        await request('/auth/login', { method: 'POST', body: { email: email.value, password: password.value } });
        window.location.assign('/admin');
    } catch (failure) {
        error.value = failure.message;
        errors.value = failure.errors || {};
        password.value = '';
        await nextTick();
        document.getElementById('login-error')?.focus();
    } finally {
        saving.value = false;
    }
}
</script>

<template>
    <main id="main-content" class="mx-auto flex min-h-screen max-w-lg items-center px-4 py-12">
        <section class="glass-card w-full p-7 sm:p-10">
            <p class="eyebrow">PORTFOLIO / CONTENT STUDIO</p>
            <h1 class="mt-4 text-3xl font-medium tracking-tight">Welcome back.</h1>
            <p class="mt-3 text-sm text-muted">Sign in to manage your work, experience, and achievements.</p>
            <form class="mt-8 space-y-5" @submit.prevent="login" :aria-busy="saving">
                <div v-if="error" id="login-error" class="status-panel" role="alert" tabindex="-1">{{ error }}</div>
                <div>
                    <label for="email" class="field-label">Email address</label>
                    <input id="email" v-model="email" class="field" type="email" autocomplete="username" required maxlength="255" :aria-invalid="!!errors.email" aria-describedby="email-error" />
                    <p v-if="errors.email" id="email-error" class="field-error">{{ errors.email[0] }}</p>
                </div>
                <div>
                    <label for="password" class="field-label">Password</label>
                    <input id="password" v-model="password" class="field" type="password" autocomplete="current-password" required :aria-invalid="!!errors.password" aria-describedby="password-error" />
                    <p v-if="errors.password" id="password-error" class="field-error">{{ errors.password[0] }}</p>
                </div>
                <button class="button button-primary w-full" :disabled="saving">{{ saving ? 'Signing in…' : 'Sign in' }}</button>
            </form>
        </section>
    </main>
</template>
