import { ref, type Ref } from 'vue';

export interface AsyncState<T> {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
}

export function useAsync<T>() {
  const data = ref<T | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);

  async function execute(promise: Promise<T>): Promise<T | null> {
    loading.value = true;
    error.value = null;
    try {
      const result = await promise;
      data.value = result;
      return result;
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      error.value = message;
      return null;
    } finally {
      loading.value = false;
    }
  }

  function reset() {
    data.value = null;
    loading.value = true;
    error.value = null;
  }

  return { data, loading, error, execute, reset };
}

export function useAsyncImmediate<T>(fn: () => Promise<T>) {
  const state = useAsync<T>();
  state.execute(fn());
  return state;
}