import { tt as __exportAll } from "./errors_Co3p8A61.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_ofI-S-oh.mjs";
import { t as createComponent } from "./compiler_DHUFtTAy.mjs";
import { t as $$Layout } from "./Layout_DdsfYYDy.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { defineComponent, mergeProps, onMounted, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
//#region src/components/CertificateGrid.vue
var _sfc_main = /* @__PURE__ */ defineComponent({
	__name: "CertificateGrid",
	setup(__props, { expose: __expose }) {
		__expose();
		const API_BASE = "http://localhost:8000/api";
		const certificates = ref([]);
		const loading = ref(true);
		const error = ref("");
		async function fetchCertificates() {
			loading.value = true;
			error.value = "";
			try {
				const res = await fetch(`${API_BASE}/certificates`, { headers: { Accept: "application/json" } });
				if (!res.ok) throw new Error();
				certificates.value = (await res.json()).data;
			} catch {
				error.value = "My certificates couldn't be loaded. Please try again.";
			} finally {
				loading.value = false;
			}
			un;
		}
		onMounted(fetchCertificates);
		const __returned__ = {
			API_BASE,
			certificates,
			loading,
			error,
			fetchCertificates
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
	if ($setup.loading) _push(`<p class="status-panel" role="status">Loading certificates…</p>`);
	else if ($setup.error) _push(`<div class="status-panel" role="alert"><p>${ssrInterpolate($setup.error)}</p><button class="text-link mt-3" type="button">Try again</button></div>`);
	else if (!$setup.certificates.length) _push(`<p class="status-panel">I&#39;ll be adding my certificates here soon.</p>`);
	else {
		_push(`<div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
		ssrRenderList($setup.certificates, (certificate) => {
			_push(`<article class="glass-card flex flex-col p-7"><div class="mb-8 flex items-center justify-between"><span class="icon-box"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#certificate"></use></svg></span><span class="font-mono text-xs text-muted">${ssrInterpolate(certificate.year)}</span></div><p class="eyebrow mb-3">${ssrInterpolate(certificate.issuer)}</p><h2 class="text-xl font-medium leading-snug tracking-tight">${ssrInterpolate(certificate.title)}</h2>`);
			if (certificate.description) _push(`<p class="mt-4 text-sm text-muted">${ssrInterpolate(certificate.description)}</p>`);
			else _push(`<!---->`);
			if (certificate.credential_url) _push(`<div class="mt-auto pt-6"><a${ssrRenderAttr("href", certificate.credential_url)} class="text-link" target="_blank" rel="noopener noreferrer">View certificate <svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-up-right"></use></svg></a></div>`);
			else _push(`<!---->`);
			_push(`</article>`);
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
var CertificateGrid_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main id="content" class="shell page"><header class="page-heading"><p class="eyebrow">Continuing to learn</p><h1>Courses I've completed.</h1><p>Extra time spent learning React, backend development, machine learning, and cloud fundamentals.</p></header>${renderComponent($$result, "CertificateGrid", CertificateGrid_default, {
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
