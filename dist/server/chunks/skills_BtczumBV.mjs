import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Yb4BXgHG.mjs";
import { t as createComponent } from "./compiler_CiuUEj2q.mjs";
import { t as $$Layout } from "./Layout_Cac2gvWi.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
//#region src/components/SkillsView.vue
var API_BASE = "http://localhost:8000/api";
var _sfc_main = {
	__name: "SkillsView",
	setup(__props, { expose: __expose }) {
		__expose();
		const groups = ref({});
		const loading = ref(true);
		const error = ref("");
		onMounted(async () => {
			try {
				const json = await (await fetch(`${API_BASE}/skills`)).json();
				groups.value = json.data ?? {};
			} catch {
				error.value = "Could not load skills list from Laravel API.";
			} finally {
				loading.value = false;
			}
		});
		const __returned__ = {
			API_BASE,
			groups,
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
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
	if ($setup.loading) {
		_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
		ssrRenderList(4, (i) => {
			_push(`<div class="glass-card rounded-2xl p-6 sm:p-8 animate-pulse space-y-4"><div class="h-4 bg-[#686A73]/10 rounded w-1/3"></div><div class="flex flex-wrap gap-2 pt-2"><!--[-->`);
			ssrRenderList(6, (j) => {
				_push(`<div class="h-8 w-20 bg-[#686A73]/10 rounded-md"></div>`);
			});
			_push(`<!--]--></div></div>`);
		});
		_push(`<!--]--></div>`);
	} else if ($setup.error) _push(`<div class="glass-card rounded-2xl p-6 border border-red-300 text-xs sm:text-sm text-red-600 technical-label"><p class="font-bold">SYSTEM ERROR:</p><p class="mt-1 text-[#686A73]">${ssrInterpolate($setup.error)}</p></div>`);
	else {
		_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
		ssrRenderList($setup.groups, (items, category) => {
			_push(`<div class="glass-card rounded-2xl p-6 sm:p-8 space-y-4"><div class="flex items-center justify-between border-b border-[#686A73]/15 pb-3"><h2 class="technical-label font-bold uppercase tracking-wider text-[#7f5be8]"> // ${ssrInterpolate(category)}</h2><span class="technical-label text-[#686A73] text-[11px]">${ssrInterpolate(items.length)} skills</span></div><div class="flex flex-wrap gap-2 pt-1"><!--[-->`);
			ssrRenderList(items, (tech) => {
				_push(`<span class="technical-label text-xs px-3 py-1.5 rounded-lg bg-white/70 text-[#24252A] border border-white hover:border-[#C8B6FF] hover:bg-[#C8B6FF]/20 transition-all cursor-default">${ssrInterpolate(tech.name)}</span>`);
			});
			_push(`<!--]--></div></div>`);
		});
		_push(`<!--]--></div>`);
	}
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/SkillsView.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var SkillsView_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/skills.astro
var skills_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Skills,
	file: () => $$file,
	url: () => $$url
});
var $$Skills = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Skills | Sakha Wibisono",
		"description": "Technical stack and skills inventory of Sakha Wibisono."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 space-y-8"><div class="border-b border-[#686A73]/15 pb-6"><span class="technical-label uppercase text-[#7f5be8] tracking-wider block font-semibold">// TECHNICAL_INVENTORY</span><h1 class="section-heading mt-1">Skills & Tooling</h1><p class="small-text mt-1 max-w-xl">Classified catalog of languages, libraries, frameworks, machine learning toolkits, and DevOps utilities.</p></div>${renderComponent($$result, "SkillsView", SkillsView_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "D:/Project/learn-docker/src/components/SkillsView.vue",
		"client:component-export": "default"
	})}</main>` })}`;
}, "D:/Project/learn-docker/src/pages/skills.astro", void 0);
var $$file = "D:/Project/learn-docker/src/pages/skills.astro";
var $$url = "/skills";
//#endregion
//#region \0virtual:astro:page:src/pages/skills@_@astro
var page = () => skills_exports;
//#endregion
export { page };
