import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Yb4BXgHG.mjs";
import { t as createComponent } from "./compiler_CiuUEj2q.mjs";
import { t as $$Layout } from "./Layout_Bkz3qYVL.mjs";
import { t as useAsync } from "./useAsync_Bvh2avCm.mjs";
import { a as BaseCard_default, n as BaseTag_default, o as _plugin_vue_export_helper_default, s as apiGet, t as Skeleton_default } from "./ui_BAeaSMiE.mjs";
import { Fragment, createBlock, createTextVNode, createVNode, defineComponent, mergeProps, onMounted, openBlock, renderList, toDisplayString, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region src/components/SkillsView.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "SkillsView",
	setup(__props, { expose: __expose }) {
		__expose();
		const { data: groups, loading, error, execute } = useAsync();
		onMounted(() => {
			execute(apiGet("/skills"));
		});
		const __returned__ = {
			groups,
			loading,
			error,
			execute,
			get BaseCard() {
				return BaseCard_default;
			},
			get BaseTag() {
				return BaseTag_default;
			},
			get Skeleton() {
				return Skeleton_default;
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
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
	if ($setup.loading) _push(ssrRenderComponent($setup["Skeleton"], {
		variant: "card",
		count: 4
	}, null, _parent));
	else if ($setup.error) _push(`<div class="glass-card rounded-2xl p-6 border border-red-300"><p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p><p class="mt-1 text-muted font-mono text-xs">${ssrInterpolate($setup.error)}</p></div>`);
	else {
		_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
		ssrRenderList($setup.groups ?? {}, (items, category) => {
			_push(ssrRenderComponent($setup["BaseCard"], {
				key: category,
				variant: "default",
				class: "space-y-4"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex items-center justify-between border-b border-[#686A73]/15 pb-3"${_scopeId}><h2 class="font-mono text-xs font-bold uppercase tracking-wider text-lavender-strong"${_scopeId}> // ${ssrInterpolate(category)}</h2><span class="font-mono text-xs text-muted text-[11px]"${_scopeId}>${ssrInterpolate(items.length)} skills</span></div><div class="flex flex-wrap gap-2 pt-1"${_scopeId}><!--[-->`);
						ssrRenderList(items, (tech) => {
							_push(ssrRenderComponent($setup["BaseTag"], {
								key: tech.id,
								variant: "default",
								size: "sm",
								class: "hover:border-lavender hover:bg-lavender/20 transition-all cursor-default"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`${ssrInterpolate(tech.name)}`);
									else return [createTextVNode(toDisplayString(tech.name), 1)];
								}),
								_: 2
							}, _parent, _scopeId));
						});
						_push(`<!--]--></div>`);
					} else return [createVNode("div", { class: "flex items-center justify-between border-b border-[#686A73]/15 pb-3" }, [createVNode("h2", { class: "font-mono text-xs font-bold uppercase tracking-wider text-lavender-strong" }, " // " + toDisplayString(category), 1), createVNode("span", { class: "font-mono text-xs text-muted text-[11px]" }, toDisplayString(items.length) + " skills", 1)]), createVNode("div", { class: "flex flex-wrap gap-2 pt-1" }, [(openBlock(true), createBlock(Fragment, null, renderList(items, (tech) => {
						return openBlock(), createBlock($setup["BaseTag"], {
							key: tech.id,
							variant: "default",
							size: "sm",
							class: "hover:border-lavender hover:bg-lavender/20 transition-all cursor-default"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(tech.name), 1)]),
							_: 2
						}, 1024);
					}), 128))])];
				}),
				_: 2
			}, _parent));
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 space-y-8"><div class="border-b border-[#686A73]/15 pb-6"><span class="font-mono text-xs leading-normal tracking-normal uppercase text-lavender-strong tracking-wider block font-semibold">// TECHNICAL_INVENTORY</span><h1 class="text-3xl sm:text-4xl leading-tight font-bold tracking-normal text-ink mt-1">Skills & Tooling</h1><p class="text-sm leading-relaxed text-muted mt-1 max-w-xl">Classified catalog of languages, libraries, frameworks, machine learning toolkits, and DevOps utilities.</p></div>${renderComponent($$result, "SkillsView", SkillsView_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/var/www/src/components/SkillsView.vue",
		"client:component-export": "default"
	})}</main>` })}`;
}, "/var/www/src/pages/skills.astro", void 0);
var $$file = "/var/www/src/pages/skills.astro";
var $$url = "/skills";
//#endregion
//#region \0virtual:astro:page:src/pages/skills@_@astro
var page = () => skills_exports;
//#endregion
export { page };
