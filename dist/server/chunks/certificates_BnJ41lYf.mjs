import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Yb4BXgHG.mjs";
import { t as createComponent } from "./compiler_CiuUEj2q.mjs";
import { t as $$Layout } from "./Layout_Bkz3qYVL.mjs";
import { t as useAsync } from "./useAsync_Bvh2avCm.mjs";
import { a as BaseCard_default, n as BaseTag_default, o as _plugin_vue_export_helper_default, s as apiGet, t as Skeleton_default, u as getIssuerColorSet } from "./ui_RCv8z31K.mjs";
import { createTextVNode, createVNode, defineComponent, mergeProps, toDisplayString, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
//#region src/components/CertificateGrid.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "CertificateGrid",
	setup(__props, { expose: __expose }) {
		__expose();
		const { data: certificates, loading, error, execute } = useAsync();
		onMounted(() => {
			execute(apiGet("/certificates"));
		});
		const __returned__ = {
			certificates,
			loading,
			error,
			execute,
			get getIssuerColorSet() {
				return getIssuerColorSet;
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
		count: "6"
	}, null, _parent));
	else if ($setup.error) _push(`<div class="glass-card rounded-2xl p-6 border border-red-300"><p class="font-mono text-xs font-bold text-red-600">SYSTEM ERROR:</p><p class="mt-1 text-muted font-mono text-xs">${ssrInterpolate($setup.error)}</p></div>`);
	else {
		_push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
		ssrRenderList($setup.certificates ?? [], (cert, idx) => {
			_push(`<a>`);
			_push(ssrRenderComponent($setup["BaseCard"], {
				variant: "hover",
				class: "flex flex-col justify-between"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="space-y-3"${_scopeId}><div class="flex items-center justify-between font-mono text-xs"${_scopeId}>`);
						_push(ssrRenderComponent($setup["BaseTag"], {
							variant: $setup.getIssuerColorSet(idx),
							size: "default"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(cert.issuer)}`);
								else return [createTextVNode(toDisplayString(cert.issuer), 1)];
							}),
							_: 2
						}, _parent, _scopeId));
						_push(`<span class="text-muted"${_scopeId}>${ssrInterpolate(cert.year)}</span></div><h3 class="text-xl font-semibold text-ink group-hover:text-lavender-strong transition-colors"${_scopeId}>${ssrInterpolate(cert.title)}</h3><p class="text-sm text-muted"${_scopeId}>${ssrInterpolate(cert.description)}</p></div><div class="pt-4 mt-4 border-t border-[#686A73]/15 flex items-center justify-between font-mono text-xs text-muted"${_scopeId}><span${_scopeId}>CREDENTIAL #${ssrInterpolate(cert.id)}</span><span class="text-mint-strong font-semibold"${_scopeId}>VERIFIED</span></div>`);
					} else return [createVNode("div", { class: "space-y-3" }, [
						createVNode("div", { class: "flex items-center justify-between font-mono text-xs" }, [createVNode($setup["BaseTag"], {
							variant: $setup.getIssuerColorSet(idx),
							size: "default"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(cert.issuer), 1)]),
							_: 2
						}, 1032, ["variant"]), createVNode("span", { class: "text-muted" }, toDisplayString(cert.year), 1)]),
						createVNode("h3", { class: "text-xl font-semibold text-ink group-hover:text-lavender-strong transition-colors" }, toDisplayString(cert.title), 1),
						createVNode("p", { class: "text-sm text-muted" }, toDisplayString(cert.description), 1)
					]), createVNode("div", { class: "pt-4 mt-4 border-t border-[#686A73]/15 flex items-center justify-between font-mono text-xs text-muted" }, [createVNode("span", null, "CREDENTIAL #" + toDisplayString(cert.id), 1), createVNode("span", { class: "text-mint-strong font-semibold" }, "VERIFIED")])];
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/CertificateGrid.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var CertificateGrid_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/certificates.astro
var certificates_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Certificates,
	file: () => $$file,
	url: () => $$url
});
var $$Certificates = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Certificates | Sakha Wibisono",
		"description": "Professional certifications and credentials of Sakha Wibisono."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 space-y-8"><div class="border-b border-[#686A73]/15 pb-6"><span class="font-mono text-xs leading-normal tracking-normal uppercase text-lavender-strong tracking-wider block font-semibold">// VERIFIED_CREDENTIALS</span><h1 class="text-3xl sm:text-4xl leading-tight font-bold tracking-normal text-ink mt-1">Certifications</h1><p class="text-sm leading-relaxed text-muted mt-1 max-w-xl">Industry-recognized technical certificates covering modern backend development, machine learning, React applications, and cloud basics.</p></div>${renderComponent($$result, "CertificateGrid", CertificateGrid_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/var/www/src/components/CertificateGrid.vue",
		"client:component-export": "default"
	})}</main>` })}`;
}, "/var/www/src/pages/certificates.astro", void 0);
var $$file = "/var/www/src/pages/certificates.astro";
var $$url = "/certificates";
//#endregion
//#region \0virtual:astro:page:src/pages/certificates@_@astro
var page = () => certificates_exports;
//#endregion
export { page };
