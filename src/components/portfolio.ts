import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';

export interface ContentImageData {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface PageMeta {
  current_page: number;
  last_page: number;
  total: number;
  categories?: string[];
}

const API_BASE = '/api';

export function useCollection<T>(resource: string, message: string, query: () => Record<string, string> = () => ({})) {
  const items = shallowRef<T[]>([]);
  const meta = ref<PageMeta | null>(null);
  const loading = ref(true);
  const error = ref('');
  let controller: AbortController | undefined;

  async function load(page = 1) {
    controller?.abort();
    const active = new AbortController();
    controller = active;
    loading.value = true;
    error.value = '';
    try {
      const params = new URLSearchParams({ page: String(page), ...query() });
      const response = await fetch(`${API_BASE}/${resource}?${params}`, { headers: { Accept: 'application/json' }, signal: active.signal });
      if (!response.ok) throw new Error();
      const payload = await response.json();
      if (!Array.isArray(payload.data)) throw new Error();
      if (controller !== active) return;
      items.value = payload.data;
      meta.value = payload.meta;
    } catch (failure) {
      if (!active.signal.aborted && controller === active) error.value = message;
    } finally {
      if (controller === active) loading.value = false;
    }
  }

  onMounted(() => load());
  onBeforeUnmount(() => controller?.abort());
  return { items, meta, loading, error, load };
}
