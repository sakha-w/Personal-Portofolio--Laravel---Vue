import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Yb4BXgHG.mjs";
import { t as createComponent } from "./compiler_CiuUEj2q.mjs";
import { t as $$Layout } from "./Layout_Bkz3qYVL.mjs";
import { t as useAsync } from "./useAsync_Bvh2avCm.mjs";
import { a as BaseCard_default, n as BaseTag_default, o as _plugin_vue_export_helper_default, s as apiGet, t as Skeleton_default } from "./ui_RCv8z31K.mjs";
import { createBlock, createCommentVNode, createTextVNode, createVNode, defineComponent, mergeProps, openBlock, toDisplayString, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region src/components/EducationList.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "EducationList",
	setup(__props, { expose: __expose }) {
		__expose();
		const { data: educations, loading, error, execute } = useAsync();
		onMounted(() => {
			execute(apiGet("/educations"));
		});
		const __returned__ = {
			educations,
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
		count: "2"
	}, null, _parent));
	else if ($setup.error) _push(`<div class="glass-card rounded-2xl p-6 border border-red-300"><p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p><p class="mt-1 text-muted font-mono text-xs">${ssrInterpolate($setup.error)}</p></div>`);
	else {
		_push(`<div class="space-y-6"><!--[-->`);
		ssrRenderList($setup.educations ?? [], (edu) => {
			_push(ssrRenderComponent($setup["BaseCard"], {
				key: edu.id,
				variant: "default",
				class: "space-y-3"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex flex-wrap items-start justify-between gap-3"${_scopeId}><div${_scopeId}><span class="font-mono text-xs uppercase tracking-wider font-semibold text-lavender-strong"${_scopeId}>${ssrInterpolate(edu.institution)}</span><h3 class="text-xl font-semibold text-ink mt-0.5"${_scopeId}>${ssrInterpolate(edu.degree)}</h3><p class="font-mono text-xs text-muted mt-1"${_scopeId}>${ssrInterpolate(edu.location)} · ${ssrInterpolate(edu.period)}</p></div>`);
						if (edu.gpa) _push(ssrRenderComponent($setup["BaseTag"], {
							variant: "mint-border",
							size: "default",
							class: "self-start"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(` GPA ${ssrInterpolate(edu.gpa)}`);
								else return [createTextVNode(" GPA " + toDisplayString(edu.gpa), 1)];
							}),
							_: 2
						}, _parent, _scopeId));
						else _push(`<!---->`);
						_push(`</div>`);
						if (edu.thesis) _push(`<div class="p-3.5 rounded-xl glass-subtle border border-white text-xs space-y-1"${_scopeId}><p class="font-mono text-xs text-lavender-strong text-[11px] uppercase tracking-wider font-semibold"${_scopeId}> UNDERGRADUATE THESIS </p><p class="italic text-ink"${_scopeId}>&quot;${ssrInterpolate(edu.thesis)}&quot;</p></div>`);
						else _push(`<!---->`);
						if (edu.description) _push(`<p class="text-sm text-muted pt-1"${_scopeId}>${ssrInterpolate(edu.description)}</p>`);
						else _push(`<!---->`);
					} else return [
						createVNode("div", { class: "flex flex-wrap items-start justify-between gap-3" }, [createVNode("div", null, [
							createVNode("span", { class: "font-mono text-xs uppercase tracking-wider font-semibold text-lavender-strong" }, toDisplayString(edu.institution), 1),
							createVNode("h3", { class: "text-xl font-semibold text-ink mt-0.5" }, toDisplayString(edu.degree), 1),
							createVNode("p", { class: "font-mono text-xs text-muted mt-1" }, toDisplayString(edu.location) + " · " + toDisplayString(edu.period), 1)
						]), edu.gpa ? (openBlock(), createBlock($setup["BaseTag"], {
							key: 0,
							variant: "mint-border",
							size: "default",
							class: "self-start"
						}, {
							default: withCtx(() => [createTextVNode(" GPA " + toDisplayString(edu.gpa), 1)]),
							_: 2
						}, 1024)) : createCommentVNode("", true)]),
						edu.thesis ? (openBlock(), createBlock("div", {
							key: 0,
							class: "p-3.5 rounded-xl glass-subtle border border-white text-xs space-y-1"
						}, [createVNode("p", { class: "font-mono text-xs text-lavender-strong text-[11px] uppercase tracking-wider font-semibold" }, " UNDERGRADUATE THESIS "), createVNode("p", { class: "italic text-ink" }, "\"" + toDisplayString(edu.thesis) + "\"", 1)])) : createCommentVNode("", true),
						edu.description ? (openBlock(), createBlock("p", {
							key: 1,
							class: "text-sm text-muted pt-1"
						}, toDisplayString(edu.description), 1)) : createCommentVNode("", true)
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 space-y-8"><div class="border-b border-[#686A73]/15 pb-6"><span class="font-mono text-xs leading-normal tracking-normal uppercase text-lavender-strong tracking-wider block font-semibold">// ACADEMIC_RECORD</span><h1 class="text-3xl sm:text-4xl leading-tight font-bold tracking-normal text-ink mt-1">Education</h1><p class="text-sm leading-relaxed text-muted mt-1 max-w-xl">Formal degree programs, academic milestones, thesis research, and cumulative grade point averages from Telkom University.</p></div>${renderComponent($$result, "EducationList", EducationList_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/var/www/src/components/EducationList.vue",
		"client:component-export": "default"
	})}</main>` })}`;
}, "/var/www/src/pages/education.astro", void 0);
var $$file = "/var/www/src/pages/education.astro";
var $$url = "/education";
//#endregion
//#region \0virtual:astro:page:src/pages/education@_@astro
var page = () => education_exports;
//#endregion
export { page };
