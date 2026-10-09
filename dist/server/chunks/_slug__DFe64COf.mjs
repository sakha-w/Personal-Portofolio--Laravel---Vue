import { tt as __exportAll } from "./errors_Co3p8A61.mjs";
import { S as createAstro, d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_ofI-S-oh.mjs";
import { t as createComponent } from "./compiler_DHUFtTAy.mjs";
import { t as $$Layout } from "./Layout_CIEVlOJU.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { computed, defineComponent, mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
//#region src/components/ProjectDetail.vue
var _sfc_main = /* @__PURE__ */ defineComponent({
	__name: "ProjectDetail",
	props: { slug: {} },
	setup(__props, { expose: __expose }) {
		__expose();
		const API_BASE = "http://localhost:8000/api";
		const props = __props;
		const project = ref(null);
		const loading = ref(true);
		const error = ref("");
		const sections = computed(() => [
			{
				title: "How it fits together",
				text: project.value?.architecture
			},
			{
				title: "The challenge",
				text: project.value?.challenge
			},
			{
				title: "The approach",
				text: project.value?.solution
			},
			{
				title: "The outcome",
				text: project.value?.result
			}
		].filter((section) => section.text));
		async function fetchProject() {
			loading.value = true;
			error.value = "";
			try {
				const res = await fetch(`${API_BASE}/projects/${encodeURIComponent(props.slug)}`, { headers: { Accept: "application/json" } });
				if (res.status === 404) throw new Error("This project is no longer available. You can find my other work on the Projects page.");
				if (!res.ok) throw new Error("This project couldn't be loaded. Please try again.");
				const payload = await res.json();
				project.value = payload.data;
			} catch (e) {
				error.value = e instanceof Error ? e.message : "This project couldn't be loaded.";
			} finally {
				loading.value = false;
			}
		}
		onMounted(fetchProject);
		const __returned__ = {
			API_BASE,
			props,
			project,
			loading,
			error,
			sections,
			fetchProject
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
		class: "space-y-8",
		"aria-busy": $setup.loading
	}, _attrs))}><a href="/projects" class="text-link"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-left"></use></svg>Back to projects</a>`);
	if ($setup.loading) _push(`<p class="status-panel" role="status">Loading project…</p>`);
	else if ($setup.error) _push(`<div class="status-panel" role="alert"><p>${ssrInterpolate($setup.error)}</p><button class="text-link mt-3" type="button">Try again</button></div>`);
	else if ($setup.project) {
		_push(`<!--[--><article class="glass-card p-7 sm:p-12"><div class="flex flex-wrap items-center gap-3"><span class="eyebrow">${ssrInterpolate($setup.project.category)}</span><span class="text-xs text-muted">${ssrInterpolate($setup.project.year)}</span></div><h1 class="mt-5 max-w-3xl text-3xl font-medium leading-tight tracking-tight sm:text-5xl">${ssrInterpolate($setup.project.title)}</h1><p class="mt-6 max-w-3xl whitespace-pre-line text-muted">${ssrInterpolate($setup.project.description)}</p><div class="mt-7 flex flex-wrap gap-2"><!--[-->`);
		ssrRenderList($setup.project.technologies, (tech) => {
			_push(`<span class="tag">${ssrInterpolate(tech.name)}</span>`);
		});
		_push(`<!--]--></div>`);
		if ($setup.project.github_url || $setup.project.demo_url) {
			_push(`<div class="mt-9 flex flex-wrap gap-3 border-t border-line pt-7">`);
			if ($setup.project.github_url) _push(`<a${ssrRenderAttr("href", $setup.project.github_url)} class="button" target="_blank" rel="noopener noreferrer"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#code"></use></svg>View source</a>`);
			else _push(`<!---->`);
			if ($setup.project.demo_url) _push(`<a${ssrRenderAttr("href", $setup.project.demo_url)} class="button button-primary" target="_blank" rel="noopener noreferrer">Visit project <svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-up-right"></use></svg></a>`);
			else _push(`<!---->`);
			_push(`</div>`);
		} else _push(`<!---->`);
		_push(`</article>`);
		if ($setup.sections.length) {
			_push(`<div class="grid gap-5 md:grid-cols-2"><!--[-->`);
			ssrRenderList($setup.sections, (section) => {
				_push(`<section class="glass-card p-7"><h2 class="mb-4 text-xl font-medium tracking-tight">${ssrInterpolate(section.title)}</h2><p class="whitespace-pre-line text-sm text-muted">${ssrInterpolate(section.text)}</p></section>`);
			});
			_push(`<!--]--></div>`);
		} else _push(`<!---->`);
		_push(`<!--]-->`);
	} else _push(`<!---->`);
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ProjectDetail.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ProjectDetail_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/projects/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Slug = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Project Detail | Sakha Wibisono",
		"description": "Project case study."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main id="content" class="shell page">${renderComponent($$result, "ProjectDetail", ProjectDetail_default, {
		"client:load": true,
		"slug": slug,
		"client:component-hydration": "load",
		"client:component-path": "D:/Project/learn-docker/src/components/ProjectDetail.vue",
		"client:component-export": "default"
	})}</main>` })}`;
}, "D:/Project/learn-docker/src/pages/projects/[slug].astro", void 0);
var $$file = "D:/Project/learn-docker/src/pages/projects/[slug].astro";
var $$url = "/projects/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/projects/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
