<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <DashboardContent />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider, NMessageProvider } from 'naive-ui';
import DashboardContent from './DashboardContent.vue';

const themeOverrides = {
  common: {
    primaryColor: '#6366f1',
    primaryColorHover: '#4f46e5',
    primaryColorPressed: '#4338ca',
  }
};
</script>
