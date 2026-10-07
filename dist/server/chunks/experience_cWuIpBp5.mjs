import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Yb4BXgHG.mjs";
import { t as createComponent } from "./compiler_CiuUEj2q.mjs";
import { t as $$Layout } from "./Layout_Bkz3qYVL.mjs";
import { t as useAsync } from "./useAsync_Bvh2avCm.mjs";
import { a as BaseCard_default, n as BaseTag_default, o as _plugin_vue_export_helper_default, s as apiGet, t as Skeleton_default } from "./ui_BAeaSMiE.mjs";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, defineComponent, mergeProps, onMounted, openBlock, renderList, toDisplayString, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region src/shared/composables/useDate.ts
function formatDate(value, options) {
	if (!value) return "Present";
	return (value instanceof Date ? value : new Date(value)).toLocaleDateString("en-US", {
		month: "short",
		year: "numeric",
		...options
	});
}
//#endregion
//#region src/components/ExperienceList.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "ExperienceList",
	setup(__props, { expose: __expose }) {
		__expose();
		const { data: experiences, loading, error, execute } = useAsync();
		onMounted(() => {
			execute(apiGet("/experiences"));
		});
		const __returned__ = {
			experiences,
			loading,
			error,
			execute,
			get formatDate() {
				return formatDate;
			},
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
		count: 3
	}, null, _parent));
	else if ($setup.error) _push(`<div class="glass-card rounded-2xl p-6 border border-red-300"><p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p><p class="mt-1 text-muted font-mono text-xs">${ssrInterpolate($setup.error)}</p></div>`);
	else {
		_push(`<div class="space-y-6"><!--[-->`);
		ssrRenderList($setup.experiences ?? [], (exp) => {
			_push(ssrRenderComponent($setup["BaseCard"], {
				key: exp.id,
				variant: "hover",
				class: "space-y-4"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-wrap items-start justify-between gap-3"${_scopeId}><div${_scopeId}><span class="font-mono text-xs uppercase tracking-wider font-semibold text-lavender-strong"${_scopeId}>${ssrInterpolate(exp.company)}</span><h3 class="text-xl font-semibold text-ink mt-0.5"${_scopeId}>${ssrInterpolate(exp.position)}</h3><p class="font-mono text-xs text-muted mt-1"${_scopeId}>${ssrInterpolate(exp.location)} · ${ssrInterpolate($setup.formatDate(exp.start_date))} — ${ssrInterpolate($setup.formatDate(exp.end_date))}</p></div>`);
						if (exp.featured) _push(ssrRenderComponent($setup["BaseTag"], {
							variant: "mint-border",
							size: "xs",
							class: "self-start"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` ● Featured `);
								else return [createTextVNode(" ● Featured ")];
							}),
							_: 2
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div><p class="text-sm text-muted"${_scopeId}>${ssrInterpolate(exp.description)}</p>`);
						if (exp.technologies && exp.technologies.length) {
							_push(`<div class="pt-4 mt-4 border-t border-[#686A73]/15"${_scopeId}><div class="flex flex-wrap gap-1.5"${_scopeId}><!--[-->`);
							ssrRenderList(exp.technologies, (tech) => {
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
						} else _push(`<!---->`);
					} else return [
						createVNode("div", { class: "flex flex-wrap items-start justify-between gap-3" }, [createVNode("div", null, [
							createVNode("span", { class: "font-mono text-xs uppercase tracking-wider font-semibold text-lavender-strong" }, toDisplayString(exp.company), 1),
							createVNode("h3", { class: "text-xl font-semibold text-ink mt-0.5" }, toDisplayString(exp.position), 1),
							createVNode("p", { class: "font-mono text-xs text-muted mt-1" }, toDisplayString(exp.location) + " · " + toDisplayString($setup.formatDate(exp.start_date)) + " — " + toDisplayString($setup.formatDate(exp.end_date)), 1)
						]), exp.featured ? (openBlock(), createBlock($setup["BaseTag"], {
							key: 0,
							variant: "mint-border",
							size: "xs",
							class: "self-start"
						}, {
							default: withCtx(() => [createTextVNode(" ● Featured ")]),
							_: 1
						})) : createCommentVNode("", true)]),
						createVNode("p", { class: "text-sm text-muted" }, toDisplayString(exp.description), 1),
						exp.technologies && exp.technologies.length ? (openBlock(), createBlock("div", {
							key: 0,
							class: "pt-4 mt-4 border-t border-[#686A73]/15"
						}, [createVNode("div", { class: "flex flex-wrap gap-1.5" }, [(openBlock(true), createBlock(Fragment, null, renderList(exp.technologies, (tech) => {
							return openBlock(), createBlock($setup["BaseTag"], {
								key: tech.id,
								variant: "default",
								size: "xs"
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(tech.name), 1)]),
								_: 2
							}, 1024);
						}), 128))])])) : createCommentVNode("", true)
					];
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 space-y-8"><div class="border-b border-[#686A73]/15 pb-6"><span class="font-mono text-xs leading-normal tracking-normal uppercase text-lavender-strong tracking-wider block font-semibold">// CAREER_TRACK</span><h1 class="text-3xl sm:text-4xl leading-tight font-bold tracking-normal text-ink mt-1">Work Experience</h1><p class="text-sm leading-relaxed text-muted mt-1 max-w-xl">Hands-on software development roles in enterprise and educational organizations, rendered dynamically from the Laravel API.</p></div>${renderComponent($$result, "ExperienceList", ExperienceList_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/var/www/src/components/ExperienceList.vue",
		"client:component-export": "default"
	})}</main>` })}`;
}, "/var/www/src/pages/experience.astro", void 0);
var $$file = "/var/www/src/pages/experience.astro";
var $$url = "/experience";
//#endregion
//#region \0virtual:astro:page:src/pages/experience@_@astro
var page = () => experience_exports;
//#endregion
export { page };
