import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Yb4BXgHG.mjs";
import { t as createComponent } from "./compiler_CiuUEj2q.mjs";
import { t as $$Layout } from "./Layout_Cac2gvWi.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
//#region src/components/ExperienceList.vue
var API_BASE = "http://localhost:8000/api";
var _sfc_main = {
	__name: "ExperienceList",
	setup(__props, { expose: __expose }) {
		__expose();
		const experiences = ref([]);
		const loading = ref(true);
		const error = ref("");
		function formatDate(value) {
			if (!value) return "Present";
			return new Date(value).toLocaleDateString("en-US", {
				month: "short",
				year: "numeric"
			});
		}
		onMounted(async () => {
			try {
				const json = await (await fetch(`${API_BASE}/experiences`)).json();
				experiences.value = json.data ?? [];
			} catch {
				error.value = "Could not load experiences from Laravel backend API.";
			} finally {
				loading.value = false;
			}
		});
		const __returned__ = {
			API_BASE,
			experiences,
			loading,
			error,
			formatDate,
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
		ssrRenderList(3, (i) => {
			_push(`<div class="glass-card rounded-2xl p-6 sm:p-8 animate-pulse space-y-4"><div class="h-5 bg-[#686A73]/10 rounded w-1/3"></div><div class="h-4 bg-[#686A73]/10 rounded w-1/4"></div><div class="h-3 bg-[#686A73]/10 rounded w-full"></div></div>`);
		});
		_push(`<!--]--></div>`);
	} else if ($setup.error) _push(`<div class="glass-card rounded-2xl p-6 border border-red-300 text-xs sm:text-sm text-red-600 technical-label"><p class="font-bold">SYSTEM ERROR:</p><p class="mt-1 text-[#686A73]">${ssrInterpolate($setup.error)}</p></div>`);
	else {
		_push(`<div class="space-y-6"><!--[-->`);
		ssrRenderList($setup.experiences, (exp) => {
			_push(`<div class="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group"><div class="flex flex-wrap items-start justify-between gap-3"><div><span class="technical-label uppercase text-[#7f5be8] tracking-wider font-semibold">${ssrInterpolate(exp.company)}</span><h3 class="card-heading mt-0.5">${ssrInterpolate(exp.position)}</h3><p class="technical-label text-[#686A73] mt-1">${ssrInterpolate(exp.location)} · ${ssrInterpolate($setup.formatDate(exp.start_date))} — ${ssrInterpolate($setup.formatDate(exp.end_date))}</p></div>`);
			if (exp.featured) _push(`<span class="technical-label text-[11px] px-2.5 py-1 rounded-full bg-[#B8E0D2]/40 text-[#24252A] border border-[#B8E0D2] font-medium"> ● Featured Role </span>`);
			else _push(`<!---->`);
			_push(`</div><p class="small-text mt-4">${ssrInterpolate(exp.description)}</p>`);
			if (exp.technologies && exp.technologies.length) {
				_push(`<div class="pt-4 mt-4 border-t border-[#686A73]/15"><div class="flex flex-wrap gap-1.5"><!--[-->`);
				ssrRenderList(exp.technologies, (tech) => {
					_push(`<span class="technical-label text-[11px] px-2.5 py-0.5 rounded-md bg-white/70 text-[#24252A] border border-white">${ssrInterpolate(tech.name)}</span>`);
				});
				_push(`<!--]--></div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		});
		_push(`<!--]--></div>`);
	}
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ExperienceList.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ExperienceList_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/experience.astro
var experience_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Experience,
	file: () => $$file,
	url: () => $$url
});
var $$Experience = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Experience | Sakha Wibisono",
		"description": "Professional experience timeline of Sakha Wibisono."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 space-y-8"><div class="border-b border-[#686A73]/15 pb-6"><span class="technical-label uppercase text-[#7f5be8] tracking-wider block font-semibold">// CAREER_TRACK</span><h1 class="section-heading mt-1">Work Experience</h1><p class="small-text mt-1 max-w-xl">Hands-on software development roles in enterprise and educational organizations, rendered dynamically from the Laravel API.</p></div>${renderComponent($$result, "ExperienceList", ExperienceList_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "D:/Project/learn-docker/src/components/ExperienceList.vue",
		"client:component-export": "default"
	})}</main>` })}`;
}, "D:/Project/learn-docker/src/pages/experience.astro", void 0);
var $$file = "D:/Project/learn-docker/src/pages/experience.astro";
var $$url = "/experience";
//#endregion
//#region \0virtual:astro:page:src/pages/experience@_@astro
var page = () => experience_exports;
//#endregion
export { page };
