import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Yb4BXgHG.mjs";
import { t as createComponent } from "./compiler_CiuUEj2q.mjs";
import { t as $$Layout } from "./Layout_Bkz3qYVL.mjs";
import { t as useAsync } from "./useAsync_Bvh2avCm.mjs";
import { a as BaseCard_default, i as BaseButton_default, l as getColorSet, n as BaseTag_default, o as _plugin_vue_export_helper_default, s as apiGet, t as Skeleton_default } from "./ui_RCv8z31K.mjs";
import { Fragment, computed, createBlock, createTextVNode, createVNode, defineComponent, mergeProps, onMounted, openBlock, ref, renderList, toDisplayString, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region src/components/ProjectGrid.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "ProjectGrid",
	setup(__props, { expose: __expose }) {
		__expose();
		const { data: projects, loading, error, execute } = useAsync();
		const categories = ref(["All"]);
		const selected = ref("All");
		const filtered = computed(() => {
			if (selected.value === "All") return projects.value ?? [];
			return (projects.value ?? []).filter((p) => p.category === selected.value);
		});
		onMounted(() => {
			execute(apiGet("/projects", { per_page: 50 })).then(() => {
				if (projects.value) {
					const cats = [...new Set(projects.value.map((p) => p.category).filter(Boolean))];
					categories.value = ["All", ...cats];
				}
			});
		});
		const __returned__ = {
			projects,
			loading,
			error,
			execute,
			categories,
			selected,
			filtered,
			get getColorSet() {
				return getColorSet;
			},
			get BaseCard() {
				return BaseCard_default;
			},
			get BaseTag() {
				return BaseTag_default;
			},
			get Skeleton() {
				return Skeleton_default;
			},
			get BaseButton() {
				return BaseButton_default;
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="flex flex-wrap items-center gap-2 pb-2"><!--[-->`);
	ssrRenderList($setup.categories, (cat) => {
		_push(ssrRenderComponent($setup["BaseButton"], {
			key: cat,
			variant: "ghost",
			size: "sm",
			class: ["px-3.5 py-1.5 rounded-full text-xs font-mono", {
				"glass-button-primary": $setup.selected === cat,
				"glass-subtle text-muted": $setup.selected !== cat
			}],
			onClick: ($event) => $setup.selected = cat
		}, {
			default: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`${ssrInterpolate(cat)}`);
				else return [createTextVNode(toDisplayString(cat), 1)];
			}),
			_: 2
		}, _parent));
	});
	_push(`<!--]--></div>`);
	if ($setup.loading) _push(ssrRenderComponent($setup["Skeleton"], {
		variant: "card",
		count: "6"
	}, null, _parent));
	else if ($setup.error) _push(`<div class="glass-card rounded-2xl p-6 border border-red-300"><p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p><p class="mt-1 text-muted font-mono text-xs">${ssrInterpolate($setup.error)}</p></div>`);
	else {
		_push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
		ssrRenderList($setup.filtered, (proj, idx) => {
			_push(`<a${ssrRenderAttr("href", `/projects/${proj.slug}`)}>`);
			_push(ssrRenderComponent($setup["BaseCard"], {
				variant: "hover",
				class: "flex flex-col justify-between"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="space-y-3"${_scopeId}><div class="flex justify-between items-center font-mono text-xs"${_scopeId}>`);
						_push(ssrRenderComponent($setup["BaseTag"], {
							variant: $setup.getColorSet(idx),
							size: "xs"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(proj.category)}`);
								else return [createTextVNode(toDisplayString(proj.category), 1)];
							}),
							_: 2
						}, _parent, _scopeId));
						_push(`<span class="text-muted"${_scopeId}>${ssrInterpolate(proj.year)}</span></div><h3 class="text-xl font-semibold text-ink group-hover:text-lavender-strong transition-colors"${_scopeId}>${ssrInterpolate(proj.title)}</h3><p class="text-sm text-muted line-clamp-3"${_scopeId}>${ssrInterpolate(proj.short_description)}</p></div><div class="pt-4 mt-4 border-t border-[#686A73]/15"${_scopeId}><div class="flex flex-wrap gap-1.5"${_scopeId}><!--[-->`);
						ssrRenderList(proj.technologies, (tech) => {
							_push(ssrRenderComponent($setup["BaseTag"], {
								key: tech.id,
								variant: "default",
								size: "xs"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(tech.name)}`);
									else return [createTextVNode(toDisplayString(tech.name), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
						});
						_push(`<!--]--></div></div>`);
					} else return [createVNode("div", { class: "space-y-3" }, [
						createVNode("div", { class: "flex justify-between items-center font-mono text-xs" }, [createVNode($setup["BaseTag"], {
							variant: $setup.getColorSet(idx),
							size: "xs"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(proj.category), 1)]),
							_: 2
						}, 1032, ["variant"]), createVNode("span", { class: "text-muted" }, toDisplayString(proj.year), 1)]),
						createVNode("h3", { class: "text-xl font-semibold text-ink group-hover:text-lavender-strong transition-colors" }, toDisplayString(proj.title), 1),
						createVNode("p", { class: "text-sm text-muted line-clamp-3" }, toDisplayString(proj.short_description), 1)
					]), createVNode("div", { class: "pt-4 mt-4 border-t border-[#686A73]/15" }, [createVNode("div", { class: "flex flex-wrap gap-1.5" }, [(openBlock(true), createBlock(Fragment, null, renderList(proj.technologies, (tech) => {
						return openBlock(), createBlock($setup["BaseTag"], {
							key: tech.id,
							variant: "default",
							size: "xs"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(tech.name), 1)]),
							_: 2
						}, 1024);
					}), 128))])])];
				}),
				_: 2
			}, _parent));
			_push(`</a>`);
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 space-y-8"><div class="border-b border-[#686A73]/15 pb-6"><span class="font-mono text-xs leading-normal tracking-normal uppercase text-lavender-strong tracking-wider block font-semibold">// ENGINEERING_PORTFOLIO</span><h1 class="text-3xl sm:text-4xl leading-tight font-bold tracking-normal text-ink mt-1">Featured Projects</h1><p class="text-sm leading-relaxed text-muted mt-1 max-w-xl">Explore full-stack applications, machine learning projects, and enterprise systems with detailed architectural case studies.</p></div>${renderComponent($$result, "ProjectGrid", ProjectGrid_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/var/www/src/components/ProjectGrid.vue",
		"client:component-export": "default"
	})}</main>` })}`;
}, "/var/www/src/pages/projects.astro", void 0);
var $$file = "/var/www/src/pages/projects.astro";
var $$url = "/projects";
//#endregion
//#region \0virtual:astro:page:src/pages/projects@_@astro
var page = () => projects_exports;
//#endregion
export { page };
