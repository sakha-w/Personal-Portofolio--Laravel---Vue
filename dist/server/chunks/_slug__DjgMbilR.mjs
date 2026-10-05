import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { S as createAstro, d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Yb4BXgHG.mjs";
import { t as createComponent } from "./compiler_CiuUEj2q.mjs";
import { t as $$Layout } from "./Layout_Cac2gvWi.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
//#region src/components/ProjectDetail.vue
var API_BASE = "http://localhost:8000/api";
var _sfc_main = {
	__name: "ProjectDetail",
	props: { slug: {
		type: String,
		required: true
	} },
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const project = ref(null);
		const loading = ref(true);
		const error = ref("");
		onMounted(async () => {
			try {
				const res = await fetch(`${API_BASE}/projects/${props.slug}`);
				if (!res.ok) throw new Error("not-found");
				const json = await res.json();
				project.value = json.data ?? null;
				if (!project.value) error.value = "Project not found in system.";
			} catch {
				error.value = "Could not load project details. Make sure the Laravel API is active.";
			} finally {
				loading.value = false;
			}
		});
		const __returned__ = {
			props,
			API_BASE,
			project,
			loading,
			error,
			ref,
			onMounted
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><a href="/projects" class="inline-flex items-center gap-2 technical-label text-[#686A73] hover:text-[#24252A] transition-colors"><span>←</span><span>Back to all projects</span></a>`);
	if ($setup.loading) _push(`<div class="glass-card rounded-3xl p-8 sm:p-12 animate-pulse space-y-4"><div class="h-4 bg-[#686A73]/10 rounded w-1/4"></div><div class="h-8 bg-[#686A73]/15 rounded w-2/3"></div><div class="h-4 bg-[#686A73]/10 rounded w-full"></div></div>`);
	else if ($setup.error) _push(`<div class="glass-card rounded-2xl p-6 border border-red-300 text-xs sm:text-sm text-red-600 technical-label"><p class="font-bold">SYSTEM ERROR:</p><p class="mt-1 text-[#686A73]">${ssrInterpolate($setup.error)}</p></div>`);
	else if ($setup.project) {
		_push(`<div class="space-y-8"><div class="glass-card rounded-3xl p-6 sm:p-10 relative overflow-hidden"><div class="flex flex-wrap items-center justify-between gap-3"><div class="flex items-center gap-2"><span class="technical-label px-3 py-1 rounded-full bg-[#C8B6FF]/30 text-[#24252A] border border-[#C8B6FF] font-medium">${ssrInterpolate($setup.project.category)}</span><span class="technical-label text-[#686A73]">Year: ${ssrInterpolate($setup.project.year)}</span></div><div class="flex items-center gap-2">`);
		if ($setup.project.github_url) _push(`<a${ssrRenderAttr("href", $setup.project.github_url)} target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-full glass-button-secondary text-xs technical-label flex items-center gap-1.5"><span>GitHub</span><span class="text-[10px]">↗</span></a>`);
		else _push(`<!---->`);
		if ($setup.project.demo_url) _push(`<a${ssrRenderAttr("href", $setup.project.demo_url)} target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-full glass-button-primary text-xs font-semibold flex items-center gap-1.5"><span>Live Demo</span><span class="text-[10px]">↗</span></a>`);
		else _push(`<!---->`);
		_push(`</div></div><h1 class="section-heading mt-4 text-3xl sm:text-4xl">${ssrInterpolate($setup.project.title)}</h1><p class="body-text mt-4 max-w-3xl">${ssrInterpolate($setup.project.description)}</p>`);
		if ($setup.project.technologies && $setup.project.technologies.length) {
			_push(`<div class="pt-6 mt-6 border-t border-[#686A73]/15"><p class="technical-label text-[#686A73] mb-2 uppercase tracking-wider">TECHNOLOGY STACK</p><div class="flex flex-wrap gap-1.5"><!--[-->`);
			ssrRenderList($setup.project.technologies, (tech) => {
				_push(`<span class="technical-label text-xs px-2.5 py-1 rounded-md bg-white/70 text-[#24252A] border border-white">${ssrInterpolate(tech.name)}</span>`);
			});
			_push(`<!--]--></div></div>`);
		} else _push(`<!---->`);
		_push(`</div><div class="space-y-4"><h2 class="technical-label uppercase tracking-wider text-[#686A73] font-semibold">// CASE_STUDY_ANALYSIS</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
		if ($setup.project.architecture) _push(`<div class="glass-card rounded-2xl p-6 sm:p-7 space-y-2 border-t-2 border-t-[#C8B6FF]"><div class="flex items-center gap-2 technical-label text-[#7f5be8]"><span class="px-1.5 py-0.5 rounded bg-[#C8B6FF]/30 text-[#24252A] font-semibold">[01]</span><span class="uppercase font-semibold">Architecture</span></div><p class="small-text pt-1">${ssrInterpolate($setup.project.architecture)}</p></div>`);
		else _push(`<!---->`);
		if ($setup.project.challenge) _push(`<div class="glass-card rounded-2xl p-6 sm:p-7 space-y-2 border-t-2 border-t-[#FFD6BA]"><div class="flex items-center gap-2 technical-label text-[#c26d36]"><span class="px-1.5 py-0.5 rounded bg-[#FFD6BA]/40 text-[#24252A] font-semibold">[02]</span><span class="uppercase font-semibold">Technical Challenge</span></div><p class="small-text pt-1">${ssrInterpolate($setup.project.challenge)}</p></div>`);
		else _push(`<!---->`);
		if ($setup.project.solution) _push(`<div class="glass-card rounded-2xl p-6 sm:p-7 space-y-2 border-t-2 border-t-[#A9D6E5]"><div class="flex items-center gap-2 technical-label text-[#2b7e9b]"><span class="px-1.5 py-0.5 rounded bg-[#A9D6E5]/40 text-[#24252A] font-semibold">[03]</span><span class="uppercase font-semibold">Solution Implementation</span></div><p class="small-text pt-1">${ssrInterpolate($setup.project.solution)}</p></div>`);
		else _push(`<!---->`);
		if ($setup.project.result) _push(`<div class="glass-card rounded-2xl p-6 sm:p-7 space-y-2 border-t-2 border-t-[#B8E0D2]"><div class="flex items-center gap-2 technical-label text-[#3b8c72]"><span class="px-1.5 py-0.5 rounded bg-[#B8E0D2]/40 text-[#24252A] font-semibold">[04]</span><span class="uppercase font-semibold">Outcome &amp; Results</span></div><p class="small-text pt-1">${ssrInterpolate($setup.project.result)}</p></div>`);
		else _push(`<!---->`);
		_push(`</div></div></div>`);
	} else _push(`<!---->`);
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ProjectDetail.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ProjectDetail_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-6"><a href="/projects" class="text-sm text-indigo-400 hover:text-indigo-300">← Back to projects</a>${renderComponent($$result, "ProjectDetail", ProjectDetail_default, {
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
