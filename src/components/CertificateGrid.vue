<script setup lang="ts">
import { useAsync } from '@/shared/composables/useAsync';
import { apiGet } from '@/shared/composables/useApi';
import { getIssuerColorSet } from '@/shared/constants/design';
import { BaseCard, BaseTag, Skeleton } from '@/components/ui';

interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  year?: string;
  description?: string;
}

const { data: certificates, loading, error, execute } = useAsync<CertificateItem[]>();

onMounted(() => {
  execute(apiGet<CertificateItem[]>('/certificates'));
});
</script>

<template>
  <div class="space-y-6">
    <Skeleton v-if="loading" variant="card" count="6" />

    <div v-else-if="error" class="glass-card rounded-2xl p-6 border border-red-300">
      <p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p>
      <p class="mt-1 text-muted font-mono text-xs">{{ error }}</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <a
        v-for="(cert, idx) in certificates ?? []"
        :key="cert.id"
      >
        <BaseCard variant="hover" class="flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-center justify-between font-mono text-xs">
              <BaseTag :variant="getIssuerColorSet(idx)" size="default">
                {{ cert.issuer }}
              </BaseTag>
              <span class="text-muted">{{ cert.year }}</span>
            </div>

            <h3 class="text-xl font-semibold text-ink group-hover:text-lavender-strong transition-colors">
              {{ cert.title }}
            </h3>

            <p class="text-sm text-muted">{{ cert.description }}</p>
          </div>

          <div class="pt-4 mt-4 border-t border-[#686A73]/15 flex items-center justify-between font-mono text-xs text-muted">
            <span>CREDENTIAL #{{ cert.id }}</span>
            <span class="text-mint-strong font-semibold">VERIFIED</span>
          </div>
        </BaseCard>
      </a>
    </div>
  </div>
</template>