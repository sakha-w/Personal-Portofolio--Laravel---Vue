import { tt as __exportAll } from "./errors_Co3p8A61.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_ofI-S-oh.mjs";
import { t as createComponent } from "./compiler_DHUFtTAy.mjs";
import { t as $$Layout } from "./Layout_CIEVlOJU.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { defineComponent, mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
//#region src/components/SkillsView.vue
var _sfc_main = /* @__PURE__ */ defineComponent({
	__name: "SkillsView",
	setup(__props, { expose: __expose }) {
		__expose();
		const API_BASE = "http://localhost:8000/api";
		const groups = ref({});
		const loading = ref(true);
		const error = ref("");
		const categoryLabels = {
			frontend: "Frontend",
			backend: "Backend & APIs",
			data: "Data & AI",
			tools: "Tools I work with",
			other: "Other skills"
		};
		async function fetchSkills() {
			loading.value = true;
			error.value = "";
			try {
				const res = await fetch(`${API_BASE}/skills`, { headers: { Accept: "application/json" } });
				if (!res.ok) throw new Error();
				groups.value = (await res.json()).data;
			} catch {
				error.value = "My skills couldn't be loaded. Please try again.";
			} finally {
				loading.value = false;
			}
		}
		onMounted(fetchSkills);
		const __returned__ = {
			API_BASE,
			groups,
			loading,
			error,
			categoryLabels,
			fetchSkills
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
	if ($setup.loading) _push(`<p class="status-panel" role="status">Loading skills…</p>`);
	else if ($setup.error) _push(`<div class="status-panel" role="alert"><p>${ssrInterpolate($setup.error)}</p><button class="text-link mt-3" type="button">Try again</button></div>`);
	else if (!Object.keys($setup.groups).length) _push(`<p class="status-panel">I&#39;ll be adding my skills here soon.</p>`);
	else {
		_push(`<div class="grid gap-5 md:grid-cols-2"><!--[-->`);
		ssrRenderList($setup.groups, (items, category) => {
			_push(`<section class="glass-card p-7 sm:p-9"><div class="mb-7 flex items-center gap-4"><span class="icon-box"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#code"></use></svg></span><h2 class="text-xl font-medium tracking-tight">${ssrInterpolate($setup.categoryLabels[category] ?? category)}</h2></div><ul class="flex flex-wrap gap-2"><!--[-->`);
			ssrRenderList(items, (skill) => {
				_push(`<li class="tag px-3 py-2">${ssrInterpolate(skill.name)}</li>`);
			});
			_push(`<!--]--></ul></section>`);
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
var SkillsView_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main id="content" class="shell page"><header class="page-heading"><p class="eyebrow">My toolkit</p><h1>What I work with.</h1><p>Tools I've used in projects and study. Frontend development is my main focus; backend integration and data science are part of what I'm learning next.</p></header>${renderComponent($$result, "SkillsView", SkillsView_default, {
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
