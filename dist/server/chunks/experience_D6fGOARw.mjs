import { tt as __exportAll } from "./errors_Co3p8A61.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_ofI-S-oh.mjs";
import { t as createComponent } from "./compiler_DHUFtTAy.mjs";
import { t as $$Layout } from "./Layout_CIEVlOJU.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { defineComponent, mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
//#region src/components/ExperienceList.vue
var _sfc_main = /* @__PURE__ */ defineComponent({
	__name: "ExperienceList",
	setup(__props, { expose: __expose }) {
		__expose();
		const API_BASE = "http://localhost:8000/api";
		const experiences = ref([]);
		const loading = ref(true);
		const error = ref("");
		const formatDate = (value) => value ? new Date(value).toLocaleDateString("en-US", {
			month: "short",
			year: "numeric",
			timeZone: "UTC"
		}) : "Present";
		async function fetchExperiences() {
			loading.value = true;
			error.value = "";
			try {
				const res = await fetch(`${API_BASE}/experiences`, { headers: { Accept: "application/json" } });
				if (!res.ok) throw new Error();
				experiences.value = (await res.json()).data;
			} catch {
				error.value = "My experience couldn't be loaded. Please try again.";
			} finally {
				loading.value = false;
			}
		}
		onMounted(fetchExperiences);
		const __returned__ = {
			API_BASE,
			experiences,
			loading,
			error,
			formatDate,
			fetchExperiences
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
	if ($setup.loading) _push(`<p class="status-panel" role="status">Loading experience…</p>`);
	else if ($setup.error) _push(`<div class="status-panel" role="alert"><p>${ssrInterpolate($setup.error)}</p><button class="text-link mt-3" type="button">Try again</button></div>`);
	else if (!$setup.experiences.length) _push(`<p class="status-panel">I&#39;ll be adding my experience here soon.</p>`);
	else {
		_push(`<ol class="space-y-5"><!--[-->`);
		ssrRenderList($setup.experiences, (experience) => {
			_push(`<li class="glass-card grid gap-6 p-7 sm:p-9 md:grid-cols-[13rem_1fr]"><div><span class="icon-box mb-5"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#briefcase"></use></svg></span><p class="font-mono text-xs text-accent">${ssrInterpolate($setup.formatDate(experience.start_date))} – ${ssrInterpolate($setup.formatDate(experience.end_date))}</p><p class="mt-2 text-xs text-muted">${ssrInterpolate(experience.location)}</p></div><div><h2 class="text-2xl font-medium tracking-tight">${ssrInterpolate(experience.company)}</h2><p class="mt-2 text-sm text-accent">${ssrInterpolate(experience.position)}</p><p class="mt-5 whitespace-pre-line text-sm text-muted">${ssrInterpolate(experience.description)}</p><div class="mt-6 flex flex-wrap gap-2"><!--[-->`);
			ssrRenderList(experience.technologies, (tech) => {
				_push(`<span class="tag">${ssrInterpolate(tech.name)}</span>`);
			});
			_push(`<!--]--></div></div></li>`);
		});
		_push(`<!--]--></ol>`);
	}
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ExperienceList.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ExperienceList_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main id="content" class="shell page"><header class="page-heading"><p class="eyebrow">Learning on the job</p><h1>Where I've worked.</h1><p>Teams I've joined, problems I've worked on, and a few things I've learned along the way.</p></header>${renderComponent($$result, "ExperienceList", ExperienceList_default, {
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
