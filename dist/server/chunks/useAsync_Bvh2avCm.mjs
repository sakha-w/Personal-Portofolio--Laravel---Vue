import { ref } from "vue";
//#region src/shared/composables/useAsync.ts
function useAsync() {
	const data = ref(null);
	const loading = ref(true);
	const error = ref(null);
	async function execute(promise) {
		loading.value = true;
		error.value = null;
		try {
			const result = await promise;
			data.value = result;
			return result;
		} catch (e) {
			const message = e instanceof Error ? e.message : "Unknown error";
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
	return {
		data,
		loading,
		error,
		execute,
		reset
	};
}
//#endregion
export { useAsync as t };
