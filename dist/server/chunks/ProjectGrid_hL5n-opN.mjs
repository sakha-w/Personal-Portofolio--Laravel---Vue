import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { computed, defineComponent, mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
//#region src/components/ProjectGrid.vue
var _sfc_main = /* @__PURE__ */ defineComponent({
	__name: "ProjectGrid",
	props: { featured: { type: Boolean } },
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const API_BASE = "http://localhost:8000/api";
		const projects = ref([]);
		const selected = ref("All");
		const loading = ref(true);
		const error = ref("");
		const categories = computed(() => ["All", ...new Set(projects.value.map((project) => project.category))]);
		const filtered = computed(() => selected.value === "All" ? projects.value : projects.value.filter((project) => project.category === selected.value));
		async function fetchProjects() {
			loading.value = true;
			error.value = "";
			try {
				const res = await fetch(`${API_BASE}/projects${props.featured ? "?featured=true" : ""}`, { headers: { Accept: "application/json" } });
				if (!res.ok) throw new Error("Request failed");
				const payload = await res.json();
				if (!Array.isArray(payload.data)) throw new Error("Unexpected response");
				projects.value = props.featured ? payload.data.slice(0, 3) : payload.data;
			} catch {
				error.value = "I couldn't load the projects just now. Please try again.";
			} finally {
				loading.value = false;
			}
		}
		onMounted(fetchProjects);
		const __returned__ = {
			props,
			API_BASE,
			projects,
			selected,
			loading,
			error,
			categories,
			filtered,
			fetchProjects
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({
		class: "space-y-6",
		"aria-busy": $setup.loading
	}, _attrs))}>`);
	if (!$props.featured) {
		_push(`<div class="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category"><!--[-->`);
		ssrRenderList($setup.categories, (category) => {
			_push(`<button type="button" class="filter-button"${ssrRenderAttr("aria-pressed", $setup.selected === category)}>${ssrInterpolate(category)}</button>`);
		});
		_push(`<!--]--></div>`);
	} else _push(`<!---->`);
	if ($setup.loading) _push(`<p class="status-panel" role="status">Loading projects…</p>`);
	else if ($setup.error) _push(`<div class="status-panel" role="alert"><p>${ssrInterpolate($setup.error)}</p><button class="text-link mt-3" type="button">Try again</button></div>`);
	else if (!$setup.filtered.length) _push(`<p class="status-panel" role="status">No projects in this category yet.</p>`);
	else {
		_push(`<div class="${ssrRenderClass([{ "lg:grid-cols-3": $props.featured }, "grid gap-5 md:grid-cols-2"])}"><!--[-->`);
		ssrRenderList($setup.filtered, (project) => {
			_push(`<a${ssrRenderAttr("href", `/projects/${encodeURIComponent(project.slug)}`)} class="glass-card glass-link group flex h-full flex-col p-7"><div class="mb-9 flex items-center justify-between"><span class="icon-box"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#code"></use></svg></span><span class="font-mono text-xs text-muted">${ssrInterpolate(project.year)}</span></div><p class="eyebrow mb-3">${ssrInterpolate(project.category)}</p><h3 class="text-xl font-medium leading-snug tracking-tight">${ssrInterpolate(project.title)}</h3><p class="mt-3 mb-7 text-sm text-muted">${ssrInterpolate(project.short_description)}</p><div class="mt-auto flex flex-wrap gap-1.5"><!--[-->`);
			ssrRenderList(project.technologies, (tech) => {
				_push(`<span class="tag">${ssrInterpolate(tech.name)}</span>`);
			});
			_push(`<!--]--></div><div class="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm text-accent"><span>About this project</span><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-up-right"></use></svg></div></a>`);
		});
		_push(`<!--]--></div>`);
	}
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ProjectGrid.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ProjectGrid_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { ProjectGrid_default as t };
