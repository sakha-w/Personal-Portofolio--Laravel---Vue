import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Yb4BXgHG.mjs";
import { t as createComponent } from "./compiler_CiuUEj2q.mjs";
import { t as $$Layout } from "./Layout_Cac2gvWi.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { mergeProps, ref, useSSRContext } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass } from "vue/server-renderer";
//#region src/components/ContactForm.vue
var API_BASE = "http://localhost:8000/api";
var _sfc_main = {
	__name: "ContactForm",
	setup(__props, { expose: __expose }) {
		__expose();
		const form = ref({
			name: "",
			email: "",
			subject: "",
			message: ""
		});
		const sending = ref(false);
		const feedback = ref("");
		const success = ref(false);
		async function submit() {
			feedback.value = "";
			success.value = false;
			sending.value = true;
			try {
				const res = await fetch(`${API_BASE}/contact`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json"
					},
					body: JSON.stringify(form.value)
				});
				const json = await res.json();
				if (res.ok && (json.success ?? true)) {
					success.value = true;
					feedback.value = json.message ?? "Your transmission was received successfully.";
					form.value = {
						name: "",
						email: "",
						subject: "",
						message: ""
					};
				} else feedback.value = json.message ?? "Transmission rejected. Please verify input fields.";
			} catch {
				feedback.value = "Network transmission error. Ensure the backend Laravel API is active.";
			} finally {
				sending.value = false;
			}
		}
		const __returned__ = {
			API_BASE,
			form,
			sending,
			feedback,
			success,
			submit,
			ref
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 lg:grid-cols-12 gap-8" }, _attrs))}><div class="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between"><div class="space-y-4"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8B6FF]/30 border border-[#C8B6FF] text-[#24252A] technical-label"><span>COORDINATES // REACH_OUT</span></div><h2 class="card-heading text-2xl font-bold">Direct Information</h2><p class="body-text text-sm"> I am actively available for software engineering roles, technical internships, and innovative projects. Feel free to contact me directly. </p><div class="space-y-3 pt-2 technical-label"><div class="p-3.5 rounded-xl glass-subtle border border-white space-y-0.5"><span class="text-[11px] text-[#686A73] uppercase tracking-wider block font-semibold">Email Address</span><a href="mailto:sakhawibisono77@gmail.com" class="text-[#24252A] hover:text-[#7f5be8] transition-colors font-sans font-medium text-sm"> sakhawibisono77@gmail.com </a></div><div class="p-3.5 rounded-xl glass-subtle border border-white space-y-0.5"><span class="text-[11px] text-[#686A73] uppercase tracking-wider block font-semibold">Phone &amp; WhatsApp</span><p class="text-[#24252A] font-sans font-medium text-sm">(+62) 896-1404-0447</p></div><div class="p-3.5 rounded-xl glass-subtle border border-white space-y-0.5"><span class="text-[11px] text-[#686A73] uppercase tracking-wider block font-semibold">LinkedIn Profile</span><a href="https://linkedin.com/in/sakha-wibisono" target="_blank" rel="noopener noreferrer" class="text-[#7f5be8] hover:opacity-80 transition-opacity font-sans font-medium text-sm flex items-center gap-1"><span>linkedin.com/in/sakha-wibisono</span><span class="text-xs">↗</span></a></div><div class="p-3.5 rounded-xl glass-subtle border border-white space-y-0.5"><span class="text-[11px] text-[#686A73] uppercase tracking-wider block font-semibold">Base Location</span><p class="text-[#24252A] font-sans font-medium text-sm">Bandung, West Java, Indonesia</p></div></div></div><div class="pt-4 border-t border-[#686A73]/15 flex items-center gap-2 technical-label text-[#3b8c72]"><span class="w-2 h-2 rounded-full bg-[#3b8c72] animate-pulse"></span><span>Standard Response Time: &lt; 24 Hours</span></div></div><div class="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 space-y-6"><div class="border-b border-[#686A73]/15 pb-4"><span class="technical-label uppercase text-[#7f5be8] tracking-wider block font-semibold">// TRANSMISSION</span><h2 class="card-heading text-2xl font-bold mt-1">Send a Message</h2><p class="small-text mt-1">Data is processed through the Laravel REST API and stored securely.</p></div><form class="space-y-4"><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label class="block technical-label text-[#686A73] mb-1.5" for="cf-name">YOUR_NAME *</label><input id="cf-name"${ssrRenderAttr("value", $setup.form.name)} required placeholder="e.g. Jane Doe" class="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm placeholder:text-[#686A73]/60"></div><div><label class="block technical-label text-[#686A73] mb-1.5" for="cf-email">YOUR_EMAIL *</label><input id="cf-email"${ssrRenderAttr("value", $setup.form.email)} type="email" required placeholder="jane@company.com" class="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm placeholder:text-[#686A73]/60"></div></div><div><label class="block technical-label text-[#686A73] mb-1.5" for="cf-subject">SUBJECT</label><input id="cf-subject"${ssrRenderAttr("value", $setup.form.subject)} placeholder="Opportunity / Collaboration Inquiry" class="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm placeholder:text-[#686A73]/60"></div><div><label class="block technical-label text-[#686A73] mb-1.5" for="cf-message">MESSAGE_CONTENT *</label><textarea id="cf-message" required rows="5" placeholder="Hi Sakha, I came across your portfolio and would like to connect regarding..." class="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm placeholder:text-[#686A73]/60">${ssrInterpolate($setup.form.message)}</textarea></div>`);
	if ($setup.feedback) _push(`<div class="${ssrRenderClass(["p-3.5 rounded-xl technical-label border", $setup.success ? "bg-[#B8E0D2]/40 border-[#B8E0D2] text-[#24252A]" : "bg-[#FFD6BA]/40 border-[#FFD6BA] text-[#24252A]"])}"><span class="font-bold">${ssrInterpolate($setup.success ? "SUCCESS:" : "ERROR:")}</span> ${ssrInterpolate($setup.feedback)}</div>`);
	else _push(`<!---->`);
	_push(`<button type="submit"${ssrIncludeBooleanAttr($setup.sending) ? " disabled" : ""} class="w-full sm:w-auto px-6 py-3 rounded-full glass-button-primary text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"><span>${ssrInterpolate($setup.sending ? "Transmitting..." : "Send Message")}</span><span class="technical-label">→</span></button></form></div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ContactForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ContactForm_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/contact.astro
var contact_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Contact,
	file: () => $$file,
	url: () => $$url
});
var $$Contact = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Contact | Sakha Wibisono",
		"description": "Get in touch with Sakha Wibisono for engineering opportunities or collaborations."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 space-y-8"><div class="border-b border-[#686A73]/15 pb-6"><span class="technical-label uppercase text-[#7f5be8] tracking-wider block font-semibold">// COMMUNICATIONS</span><h1 class="section-heading mt-1">Get in Touch</h1><p class="small-text mt-1 max-w-xl">Send a direct message or connect through professional channels. Inquiries are stored and processed via the Laravel API.</p></div>${renderComponent($$result, "ContactForm", ContactForm_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "D:/Project/learn-docker/src/components/ContactForm.vue",
		"client:component-export": "default"
	})}</main>` })}`;
}, "D:/Project/learn-docker/src/pages/contact.astro", void 0);
var $$file = "D:/Project/learn-docker/src/pages/contact.astro";
var $$url = "/contact";
//#endregion
//#region \0virtual:astro:page:src/pages/contact@_@astro
var page = () => contact_exports;
//#endregion
export { page };
