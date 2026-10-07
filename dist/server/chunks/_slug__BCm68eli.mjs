import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { S as createAstro, d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Yb4BXgHG.mjs";
import { t as createComponent } from "./compiler_CiuUEj2q.mjs";
import { t as $$Layout } from "./Layout_Bkz3qYVL.mjs";
import { t as useAsync } from "./useAsync_Bvh2avCm.mjs";
import { a as BaseCard_default, i as BaseButton_default, l as getColorSet, n as BaseTag_default, o as _plugin_vue_export_helper_default, s as apiGet, t as Skeleton_default } from "./ui_BAeaSMiE.mjs";
import { Fragment, createBlock, createCommentVNode, createTextVNode, createVNode, defineComponent, mergeProps, onMounted, openBlock, renderList, toDisplayString, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region src/components/ProjectDetail.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "ProjectDetail",
	props: { slug: {
		type: String,
		required: true
	} },
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const { data: project, loading, error, execute } = useAsync();
		onMounted(() => {
			execute(apiGet(`/projects/${props.slug}`));
		});
		const __returned__ = {
			props,
			project,
			loading,
			error,
			execute,
			get getColorSet() {
				return getColorSet;
			},
			get BaseCard() {
				return BaseCard_default;
			},
			get BaseTag() {
				return BaseTag_default;
			},
			get BaseButton() {
				return BaseButton_default;
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
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><a href="/projects" class="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-ink"><span>←</span><span>Back to all projects</span></a>`);
	if ($setup.loading) _push(ssrRenderComponent($setup["Skeleton"], { variant: "cardFull" }, null, _parent));
	else if ($setup.error) _push(`<div class="glass-card rounded-2xl p-6 border border-red-300"><p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p><p class="mt-1 text-muted font-mono text-xs">${ssrInterpolate($setup.error)}</p></div>`);
	else if ($setup.project) {
		_push(`<div class="space-y-8">`);
		_push(ssrRenderComponent($setup["BaseCard"], {
			variant: "default",
			class: "space-y-6"
		}, {
			default: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) {
					_push(`<div class="flex flex-wrap items-center justify-between gap-3"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
					_push(ssrRenderComponent($setup["BaseTag"], {
						variant: $setup.getColorSet(0),
						size: "default"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate($setup.project.category)}`);
							else return [createTextVNode(toDisplayString($setup.project.category), 1)];
						}),
						_: 1
					}, _parent, _scopeId));
					_push(`<span class="font-mono text-xs text-muted"${_scopeId}>Year: ${ssrInterpolate($setup.project.year)}</span></div><div class="flex items-center gap-2"${_scopeId}>`);
					if ($setup.project.github_url) _push(ssrRenderComponent($setup["BaseButton"], {
						variant: "secondary",
						size: "sm",
						tag: "a",
						href: $setup.project.github_url,
						target: "_blank",
						rel: "noopener noreferrer",
						class: "font-mono text-xs"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<span${_scopeId}>GitHub</span><span class="text-[10px]"${_scopeId}>↗</span>`);
							else return [createVNode("span", null, "GitHub"), createVNode("span", { class: "text-[10px]" }, "↗")];
						}),
						_: 1
					}, _parent, _scopeId));
					else _push(`<!---->`);
					if ($setup.project.demo_url) _push(ssrRenderComponent($setup["BaseButton"], {
						variant: "primary",
						size: "sm",
						tag: "a",
						href: $setup.project.demo_url,
						target: "_blank",
						rel: "noopener noreferrer",
						class: "font-semibold"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<span${_scopeId}>Live Demo</span><span class="text-[10px]"${_scopeId}>↗</span>`);
							else return [createVNode("span", null, "Live Demo"), createVNode("span", { class: "text-[10px]" }, "↗")];
						}),
						_: 1
					}, _parent, _scopeId));
					else _push(`<!---->`);
					_push(`</div></div><h1 class="text-3xl sm:text-4xl font-bold text-ink"${_scopeId}>${ssrInterpolate($setup.project.title)}</h1><p class="text-base text-muted max-w-3xl"${_scopeId}>${ssrInterpolate($setup.project.description)}</p>`);
					if ($setup.project.technologies && $setup.project.technologies.length) {
						_push(`<div class="pt-6 mt-6 border-t border-[#686A73]/15"${_scopeId}><p class="font-mono text-xs text-muted mb-2 uppercase tracking-wider"${_scopeId}>TECHNOLOGY STACK</p><div class="flex flex-wrap gap-1.5"${_scopeId}><!--[-->`);
						ssrRenderList($setup.project.technologies, (tech) => {
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
					createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [createVNode("div", { class: "flex items-center gap-2" }, [createVNode($setup["BaseTag"], {
						variant: $setup.getColorSet(0),
						size: "default"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString($setup.project.category), 1)]),
						_: 1
					}, 8, ["variant"]), createVNode("span", { class: "font-mono text-xs text-muted" }, "Year: " + toDisplayString($setup.project.year), 1)]), createVNode("div", { class: "flex items-center gap-2" }, [$setup.project.github_url ? (openBlock(), createBlock($setup["BaseButton"], {
						key: 0,
						variant: "secondary",
						size: "sm",
						tag: "a",
						href: $setup.project.github_url,
						target: "_blank",
						rel: "noopener noreferrer",
						class: "font-mono text-xs"
					}, {
						default: withCtx(() => [createVNode("span", null, "GitHub"), createVNode("span", { class: "text-[10px]" }, "↗")]),
						_: 1
					}, 8, ["href"])) : createCommentVNode("", true), $setup.project.demo_url ? (openBlock(), createBlock($setup["BaseButton"], {
						key: 1,
						variant: "primary",
						size: "sm",
						tag: "a",
						href: $setup.project.demo_url,
						target: "_blank",
						rel: "noopener noreferrer",
						class: "font-semibold"
					}, {
						default: withCtx(() => [createVNode("span", null, "Live Demo"), createVNode("span", { class: "text-[10px]" }, "↗")]),
						_: 1
					}, 8, ["href"])) : createCommentVNode("", true)])]),
					createVNode("h1", { class: "text-3xl sm:text-4xl font-bold text-ink" }, toDisplayString($setup.project.title), 1),
					createVNode("p", { class: "text-base text-muted max-w-3xl" }, toDisplayString($setup.project.description), 1),
					$setup.project.technologies && $setup.project.technologies.length ? (openBlock(), createBlock("div", {
						key: 0,
						class: "pt-6 mt-6 border-t border-[#686A73]/15"
					}, [createVNode("p", { class: "font-mono text-xs text-muted mb-2 uppercase tracking-wider" }, "TECHNOLOGY STACK"), createVNode("div", { class: "flex flex-wrap gap-1.5" }, [(openBlock(true), createBlock(Fragment, null, renderList($setup.project.technologies, (tech) => {
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
			_: 1
		}, _parent));
		_push(`<div class="space-y-4"><h2 class="font-mono text-xs uppercase tracking-wider text-muted font-semibold">// CASE_STUDY_ANALYSIS</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
		if ($setup.project.architecture) _push(ssrRenderComponent($setup["BaseCard"], {
			variant: "default",
			class: "border-t-2 border-t-lavender space-y-2"
		}, {
			default: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`<div class="flex items-center gap-2 font-mono text-xs text-lavender-strong"${_scopeId}><span class="px-1.5 py-0.5 rounded bg-lavender/30 text-ink font-semibold"${_scopeId}>[01]</span><span class="uppercase font-semibold"${_scopeId}>Architecture</span></div><p class="text-sm text-muted pt-1"${_scopeId}>${ssrInterpolate($setup.project.architecture)}</p>`);
				else return [createVNode("div", { class: "flex items-center gap-2 font-mono text-xs text-lavender-strong" }, [createVNode("span", { class: "px-1.5 py-0.5 rounded bg-lavender/30 text-ink font-semibold" }, "[01]"), createVNode("span", { class: "uppercase font-semibold" }, "Architecture")]), createVNode("p", { class: "text-sm text-muted pt-1" }, toDisplayString($setup.project.architecture), 1)];
			}),
			_: 1
		}, _parent));
		else _push(`<!---->`);
		if ($setup.project.challenge) _push(ssrRenderComponent($setup["BaseCard"], {
			variant: "default",
			class: "border-t-2 border-t-peach space-y-2"
		}, {
			default: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`<div class="flex items-center gap-2 font-mono text-xs text-peach-strong"${_scopeId}><span class="px-1.5 py-0.5 rounded bg-peach/40 text-ink font-semibold"${_scopeId}>[02]</span><span class="uppercase font-semibold"${_scopeId}>Technical Challenge</span></div><p class="text-sm text-muted pt-1"${_scopeId}>${ssrInterpolate($setup.project.challenge)}</p>`);
				else return [createVNode("div", { class: "flex items-center gap-2 font-mono text-xs text-peach-strong" }, [createVNode("span", { class: "px-1.5 py-0.5 rounded bg-peach/40 text-ink font-semibold" }, "[02]"), createVNode("span", { class: "uppercase font-semibold" }, "Technical Challenge")]), createVNode("p", { class: "text-sm text-muted pt-1" }, toDisplayString($setup.project.challenge), 1)];
			}),
			_: 1
		}, _parent));
		else _push(`<!---->`);
		if ($setup.project.solution) _push(ssrRenderComponent($setup["BaseCard"], {
			variant: "default",
			class: "border-t-2 border-t-blue space-y-2"
		}, {
			default: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`<div class="flex items-center gap-2 font-mono text-xs text-blue-strong"${_scopeId}><span class="px-1.5 py-0.5 rounded bg-blue/40 text-ink font-semibold"${_scopeId}>[03]</span><span class="uppercase font-semibold"${_scopeId}>Solution Implementation</span></div><p class="text-sm text-muted pt-1"${_scopeId}>${ssrInterpolate($setup.project.solution)}</p>`);
				else return [createVNode("div", { class: "flex items-center gap-2 font-mono text-xs text-blue-strong" }, [createVNode("span", { class: "px-1.5 py-0.5 rounded bg-blue/40 text-ink font-semibold" }, "[03]"), createVNode("span", { class: "uppercase font-semibold" }, "Solution Implementation")]), createVNode("p", { class: "text-sm text-muted pt-1" }, toDisplayString($setup.project.solution), 1)];
			}),
			_: 1
		}, _parent));
		else _push(`<!---->`);
		if ($setup.project.result) _push(ssrRenderComponent($setup["BaseCard"], {
			variant: "default",
			class: "border-t-2 border-t-mint space-y-2"
		}, {
			default: withCtx((_, _push, _parent, _scopeId) => {
				if (_push) _push(`<div class="flex items-center gap-2 font-mono text-xs text-mint-strong"${_scopeId}><span class="px-1.5 py-0.5 rounded bg-mint/40 text-ink font-semibold"${_scopeId}>[04]</span><span class="uppercase font-semibold"${_scopeId}>Outcome &amp; Results</span></div><p class="text-sm text-muted pt-1"${_scopeId}>${ssrInterpolate($setup.project.result)}</p>`);
				else return [createVNode("div", { class: "flex items-center gap-2 font-mono text-xs text-mint-strong" }, [createVNode("span", { class: "px-1.5 py-0.5 rounded bg-mint/40 text-ink font-semibold" }, "[04]"), createVNode("span", { class: "uppercase font-semibold" }, "Outcome & Results")]), createVNode("p", { class: "text-sm text-muted pt-1" }, toDisplayString($setup.project.result), 1)];
			}),
			_: 1
		}, _parent));
		else _push(`<!---->`);
		_push(`</div></div></div>`);
	} else _push(`<!---->`);
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ProjectDetail.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ProjectDetail_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/projects/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Slug = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Project Detail | Sakha Wibisono",
		"description": "Project case study."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-6"><a href="/projects" class="text-sm text-indigo-400 hover:text-indigo-300">← Back to projects</a>${renderComponent($$result, "ProjectDetail", ProjectDetail_default, {
		"client:load": true,
		"slug": slug,
		"client:component-hydration": "load",
		"client:component-path": "/var/www/src/components/ProjectDetail.vue",
		"client:component-export": "default"
	})}</main>` })}`;
}, "/var/www/src/pages/projects/[slug].astro", void 0);
var $$file = "/var/www/src/pages/projects/[slug].astro";
var $$url = "/projects/[slug]";
//#endregion
//#region \0virtual:astro:page:src/pages/projects/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
