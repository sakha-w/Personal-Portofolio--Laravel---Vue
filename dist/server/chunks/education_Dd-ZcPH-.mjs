import { tt as __exportAll } from "./errors_Co3p8A61.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_ofI-S-oh.mjs";
import { t as createComponent } from "./compiler_DHUFtTAy.mjs";
import { t as $$Layout } from "./Layout_DdsfYYDy.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { defineComponent, mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
//#region src/components/EducationList.vue
var _sfc_main = /* @__PURE__ */ defineComponent({
	__name: "EducationList",
	setup(__props, { expose: __expose }) {
		__expose();
		const API_BASE = "http://localhost:8000/api";
		const educations = ref([]);
		const loading = ref(true);
		const error = ref("");
		async function fetchEducations() {
			loading.value = true;
			error.value = "";
			try {
				const res = await fetch(`${API_BASE}/educations`, { headers: { Accept: "application/json" } });
				if (!res.ok) throw new Error();
				educations.value = (await res.json()).data;
			} catch {
				error.value = "My education details couldn't be loaded. Please try again.";
			} finally {
				loading.value = false;
			}
		}
		onMounted(fetchEducations);
		const __returned__ = {
			API_BASE,
			educations,
			loading,
			error,
			fetchEducations
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ "aria-busy": $setup.loading }, _attrs))}>`);
	if ($setup.loading) _push(`<p class="status-panel" role="status">Loading education…</p>`);
	else if ($setup.error) _push(`<div class="status-panel" role="alert"><p>${ssrInterpolate($setup.error)}</p><button class="text-link mt-3" type="button">Try again</button></div>`);
	else if (!$setup.educations.length) _push(`<p class="status-panel">I&#39;ll be adding my education details here soon.</p>`);
	else {
		_push(`<div class="grid gap-5 md:grid-cols-2"><!--[-->`);
		ssrRenderList($setup.educations, (education) => {
			_push(`<article class="glass-card flex flex-col p-7 sm:p-9"><div class="flex items-center justify-between gap-3"><span class="icon-box"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#school"></use></svg></span><span class="font-mono text-xs text-muted">${ssrInterpolate(education.period)}</span></div><p class="eyebrow mt-8 mb-3">${ssrInterpolate(education.institution)}</p><h2 class="text-2xl font-medium leading-snug tracking-tight">${ssrInterpolate(education.degree)}</h2><p class="mt-3 text-xs text-muted">${ssrInterpolate(education.location)}`);
			if (education.gpa) _push(`<span> · GPA ${ssrInterpolate(education.gpa)}</span>`);
			else _push(`<!---->`);
			_push(`</p>`);
			if (education.description) _push(`<p class="mt-5 text-sm text-muted">${ssrInterpolate(education.description)}</p>`);
			else _push(`<!---->`);
			if (education.thesis) _push(`<div class="mt-7 border-t border-line pt-5"><h3 class="mb-2 text-sm text-accent">My thesis</h3><p class="text-sm text-muted">${ssrInterpolate(education.thesis)}</p></div>`);
			else _push(`<!---->`);
			_push(`</article>`);
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
var EducationList_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main id="content" class="shell page"><header class="page-heading"><p class="eyebrow">Telkom University</p><h1>Where it started.</h1><p>A diploma in software engineering, followed by a bachelor's in Informatics. Two degrees, and plenty of learning through projects.</p></header>${renderComponent($$result, "EducationList", EducationList_default, {
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
