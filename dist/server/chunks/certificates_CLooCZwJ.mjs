import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Yb4BXgHG.mjs";
import { t as createComponent } from "./compiler_CiuUEj2q.mjs";
import { t as $$Layout } from "./Layout_Cac2gvWi.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
//#region src/components/CertificateGrid.vue
var API_BASE = "http://localhost:8000/api";
var _sfc_main = {
	__name: "CertificateGrid",
	setup(__props, { expose: __expose }) {
		__expose();
		const certificates = ref([]);
		const loading = ref(true);
		const error = ref("");
		const issuerStyles = [
			"bg-[#B8E0D2]/40 border-[#B8E0D2] text-[#24252A]",
			"bg-[#A9D6E5]/40 border-[#A9D6E5] text-[#24252A]",
			"bg-[#C8B6FF]/35 border-[#C8B6FF] text-[#24252A]",
			"bg-[#FFD6BA]/40 border-[#FFD6BA] text-[#24252A]",
			"bg-[#F7C8E0]/40 border-[#F7C8E0] text-[#24252A]"
		];
		onMounted(async () => {
			try {
				const json = await (await fetch(`${API_BASE}/certificates`)).json();
				certificates.value = json.data ?? [];
			} catch {
				error.value = "Could not load certificates from Laravel API.";
			} finally {
				loading.value = false;
			}
		});
		const __returned__ = {
			API_BASE,
			certificates,
			loading,
			error,
			issuerStyles,
			ref,
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
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}>`);
	if ($setup.loading) {
		_push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
		ssrRenderList(6, (i) => {
			_push(`<div class="glass-card rounded-2xl p-6 min-h-[160px] animate-pulse space-y-3"><div class="h-4 bg-[#686A73]/10 rounded w-1/3"></div><div class="h-5 bg-[#686A73]/15 rounded w-3/4"></div><div class="h-3 bg-[#686A73]/10 rounded w-full"></div></div>`);
		});
		_push(`<!--]--></div>`);
	} else if ($setup.error) _push(`<div class="glass-card rounded-2xl p-6 border border-red-300 text-xs sm:text-sm text-red-600 technical-label"><p class="font-bold">SYSTEM ERROR:</p><p class="mt-1 text-[#686A73]">${ssrInterpolate($setup.error)}</p></div>`);
	else {
		_push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
		ssrRenderList($setup.certificates, (cert, idx) => {
			_push(`<div class="glass-card rounded-2xl p-6 flex flex-col justify-between group"><div class="space-y-3"><div class="flex items-center justify-between technical-label"><span class="${ssrRenderClass(["px-2.5 py-0.5 rounded-full border font-medium", $setup.issuerStyles[idx % $setup.issuerStyles.length]])}">${ssrInterpolate(cert.issuer)}</span><span class="text-[#686A73]">${ssrInterpolate(cert.year)}</span></div><h3 class="card-heading group-hover:text-[#7f5be8] transition-colors">${ssrInterpolate(cert.title)}</h3><p class="small-text">${ssrInterpolate(cert.description)}</p></div><div class="pt-4 mt-4 border-t border-[#686A73]/15 flex items-center justify-between text-[11px] technical-label text-[#686A73]"><span>CREDENTIAL_ID: #${ssrInterpolate(cert.id)}</span><span class="text-[#3b8c72] font-semibold">VERIFIED</span></div></div>`);
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 space-y-8"><div class="border-b border-[#686A73]/15 pb-6"><span class="technical-label uppercase text-[#7f5be8] tracking-wider block font-semibold">// VERIFIED_CREDENTIALS</span><h1 class="section-heading mt-1">Certifications</h1><p class="small-text mt-1 max-w-xl">Industry-recognized technical certificates covering modern backend development, machine learning, React applications, and cloud basics.</p></div>${renderComponent($$result, "CertificateGrid", CertificateGrid_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "D:/Project/learn-docker/src/components/CertificateGrid.vue",
		"client:component-export": "default"
	})}</main>` })}`;
}, "D:/Project/learn-docker/src/pages/certificates.astro", void 0);
var $$file = "D:/Project/learn-docker/src/pages/certificates.astro";
var $$url = "/certificates";
//#endregion
//#region \0virtual:astro:page:src/pages/certificates@_@astro
var page = () => certificates_exports;
//#endregion
export { page };
