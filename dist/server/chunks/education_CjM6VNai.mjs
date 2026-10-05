import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Yb4BXgHG.mjs";
import { t as createComponent } from "./compiler_CiuUEj2q.mjs";
import { t as $$Layout } from "./Layout_Cac2gvWi.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
//#region src/components/EducationList.vue
var API_BASE = "http://localhost:8000/api";
var _sfc_main = {
	__name: "EducationList",
	setup(__props, { expose: __expose }) {
		__expose();
		const educations = ref([]);
		const loading = ref(true);
		const error = ref("");
		onMounted(async () => {
			try {
				const json = await (await fetch(`${API_BASE}/educations`)).json();
				educations.value = json.data ?? [];
			} catch {
				error.value = "Could not load education records from Laravel API.";
			} finally {
				loading.value = false;
			}
		});
		const __returned__ = {
			API_BASE,
			educations,
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
		_push(`<div class="space-y-4"><!--[-->`);
		ssrRenderList(2, (i) => {
			_push(`<div class="glass-card rounded-2xl p-6 sm:p-8 animate-pulse space-y-4"><div class="h-5 bg-[#686A73]/10 rounded w-1/3"></div><div class="h-4 bg-[#686A73]/10 rounded w-1/4"></div><div class="h-3 bg-[#686A73]/10 rounded w-full"></div></div>`);
		});
		_push(`<!--]--></div>`);
	} else if ($setup.error) _push(`<div class="glass-card rounded-2xl p-6 border border-red-300 text-xs sm:text-sm text-red-600 technical-label"><p class="font-bold">SYSTEM ERROR:</p><p class="mt-1 text-[#686A73]">${ssrInterpolate($setup.error)}</p></div>`);
	else {
		_push(`<div class="space-y-6"><!--[-->`);
		ssrRenderList($setup.educations, (edu) => {
			_push(`<div class="glass-card rounded-2xl p-6 sm:p-8 space-y-3"><div class="flex flex-wrap items-start justify-between gap-3"><div><span class="technical-label uppercase text-[#7f5be8] tracking-wider font-semibold">${ssrInterpolate(edu.institution)}</span><h3 class="card-heading mt-0.5">${ssrInterpolate(edu.degree)}</h3><p class="technical-label text-[#686A73] mt-1">${ssrInterpolate(edu.location)} · ${ssrInterpolate(edu.period)}</p></div><div class="px-3 py-1 rounded-full bg-[#B8E0D2]/40 border border-[#B8E0D2] text-[#24252A] font-mono text-xs font-bold"> GPA ${ssrInterpolate(edu.gpa)}</div></div>`);
			if (edu.thesis) _push(`<div class="p-3.5 rounded-xl glass-subtle border border-white text-xs space-y-1"><p class="technical-label text-[#7f5be8] text-[11px] uppercase tracking-wider font-semibold">UNDERGRADUATE THESIS</p><p class="italic text-[#24252A]">&quot;${ssrInterpolate(edu.thesis)}&quot;</p></div>`);
			else _push(`<!---->`);
			if (edu.description) _push(`<p class="small-text pt-1">${ssrInterpolate(edu.description)}</p>`);
			else _push(`<!---->`);
			_push(`</div>`);
		});
		_push(`<!--]--></div>`);
	}
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/EducationList.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var EducationList_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/education.astro
var education_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Education,
	file: () => $$file,
	url: () => $$url
});
var $$Education = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Education | Sakha Wibisono",
		"description": "Academic background and credentials of Sakha Wibisono."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 space-y-8"><div class="border-b border-[#686A73]/15 pb-6"><span class="technical-label uppercase text-[#7f5be8] tracking-wider block font-semibold">// ACADEMIC_RECORD</span><h1 class="section-heading mt-1">Education</h1><p class="small-text mt-1 max-w-xl">Formal degree programs, academic milestones, thesis research, and cumulative grade point averages from Telkom University.</p></div>${renderComponent($$result, "EducationList", EducationList_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "D:/Project/learn-docker/src/components/EducationList.vue",
		"client:component-export": "default"
	})}</main>` })}`;
}, "D:/Project/learn-docker/src/pages/education.astro", void 0);
var $$file = "D:/Project/learn-docker/src/pages/education.astro";
var $$url = "/education";
//#endregion
//#region \0virtual:astro:page:src/pages/education@_@astro
var page = () => education_exports;
//#endregion
export { page };
