import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Yb4BXgHG.mjs";
import { t as createComponent } from "./compiler_CiuUEj2q.mjs";
import { t as $$Layout } from "./Layout_Cac2gvWi.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { computed, mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
//#region src/components/ProjectGrid.vue
var API_BASE = "http://localhost:8000/api";
var _sfc_main = {
	__name: "ProjectGrid",
	setup(__props, { expose: __expose }) {
		__expose();
		const projects = ref([]);
		const categories = ref(["All"]);
		const selected = ref("All");
		const loading = ref(true);
		const error = ref("");
		const colorClasses = [
			"bg-[#C8B6FF]/30 border-[#C8B6FF] text-[#24252A]",
			"bg-[#A9D6E5]/35 border-[#A9D6E5] text-[#24252A]",
			"bg-[#B8E0D2]/35 border-[#B8E0D2] text-[#24252A]",
			"bg-[#FFD6BA]/40 border-[#FFD6BA] text-[#24252A]"
		];
		function getColorClass(index) {
			return colorClasses[index % colorClasses.length];
		}
		const filtered = computed(() => {
			if (selected.value === "All") return projects.value;
			return projects.value.filter((p) => p.category === selected.value);
		});
		onMounted(async () => {
			try {
				const json = await (await fetch(`${API_BASE}/projects?per_page=50`)).json();
				projects.value = json.data ?? [];
				const cats = [...new Set(projects.value.map((p) => p.category).filter(Boolean))];
				categories.value = ["All", ...cats];
			} catch {
				error.value = "Could not load projects. Make sure the Laravel API is running.";
			} finally {
				loading.value = false;
			}
		});
		const __returned__ = {
			API_BASE,
			projects,
			categories,
			selected,
			loading,
			error,
			colorClasses,
			getColorClass,
			filtered,
			ref,
			computed,
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
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="flex flex-wrap items-center gap-2 pb-2"><!--[-->`);
	ssrRenderList($setup.categories, (cat) => {
		_push(`<button class="${ssrRenderClass(["px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer", $setup.selected === cat ? "glass-button-primary shadow-xs" : "glass-subtle text-[#686A73] hover:text-[#24252A] hover:bg-white/70"])}">${ssrInterpolate(cat)}</button>`);
	});
	_push(`<!--]--></div>`);
	if ($setup.loading) {
		_push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
		ssrRenderList(6, (i) => {
			_push(`<div class="glass-card rounded-2xl p-6 min-h-[220px] animate-pulse space-y-4"><div class="h-4 bg-[#686A73]/10 rounded w-1/3"></div><div class="h-6 bg-[#686A73]/15 rounded w-3/4"></div><div class="h-3 bg-[#686A73]/10 rounded w-full"></div></div>`);
		});
		_push(`<!--]--></div>`);
	} else if ($setup.error) _push(`<div class="glass-card rounded-2xl p-6 border border-red-300 text-xs sm:text-sm text-red-600 font-mono"><p class="font-bold">SYSTEM ERROR:</p><p class="mt-1 text-[#686A73]">${ssrInterpolate($setup.error)}</p></div>`);
	else {
		_push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
		ssrRenderList($setup.filtered, (proj, idx) => {
			_push(`<a${ssrRenderAttr("href", `/projects/${proj.slug}`)} class="glass-card rounded-2xl p-6 flex flex-col justify-between group cursor-pointer"><div class="space-y-3"><div class="flex justify-between items-center technical-label"><span class="${ssrRenderClass(["px-2.5 py-0.5 rounded-full border font-medium", $setup.getColorClass(idx)])}">${ssrInterpolate(proj.category)}</span><span class="text-[#686A73]">${ssrInterpolate(proj.year)}</span></div><h3 class="card-heading group-hover:text-[#7f5be8] transition-colors">${ssrInterpolate(proj.title)}</h3><p class="small-text line-clamp-3">${ssrInterpolate(proj.short_description)}</p></div><div class="pt-4 mt-4 border-t border-[#686A73]/15"><div class="flex flex-wrap gap-1.5"><!--[-->`);
			ssrRenderList(proj.technologies, (tech) => {
				_push(`<span class="technical-label text-[11px] px-2 py-0.5 rounded-md bg-white/70 text-[#24252A] border border-white">${ssrInterpolate(tech.name)}</span>`);
			});
			_push(`<!--]--></div></div></a>`);
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
var ProjectGrid_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/projects.astro
var projects_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Projects,
	file: () => $$file,
	url: () => $$url
});
var $$Projects = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Projects | Sakha Wibisono",
		"description": "Project portfolio of Sakha Wibisono with technical case studies."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 space-y-8"><div class="border-b border-[#686A73]/15 pb-6"><span class="technical-label uppercase text-[#7f5be8] tracking-wider block font-semibold">// ENGINEERING_PORTFOLIO</span><h1 class="section-heading mt-1">Featured Projects</h1><p class="small-text mt-1 max-w-xl">Explore full-stack applications, machine learning projects, and enterprise systems with detailed architectural case studies.</p></div>${renderComponent($$result, "ProjectGrid", ProjectGrid_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "D:/Project/learn-docker/src/components/ProjectGrid.vue",
		"client:component-export": "default"
	})}</main>` })}`;
}, "D:/Project/learn-docker/src/pages/projects.astro", void 0);
var $$file = "D:/Project/learn-docker/src/pages/projects.astro";
var $$url = "/projects";
//#endregion
//#region \0virtual:astro:page:src/pages/projects@_@astro
var page = () => projects_exports;
//#endregion
export { page };
