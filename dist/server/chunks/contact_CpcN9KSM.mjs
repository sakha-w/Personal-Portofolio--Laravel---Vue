import { tt as __exportAll } from "./errors_Co3p8A61.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_ofI-S-oh.mjs";
import { t as createComponent } from "./compiler_DHUFtTAy.mjs";
import { t as $$Layout } from "./Layout_DdsfYYDy.mjs";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper_BOaGB7Aw.mjs";
import { defineComponent, mergeProps, ref, useSSRContext } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass } from "vue/server-renderer";
//#region src/components/ContactForm.vue
var _sfc_main = /* @__PURE__ */ defineComponent({
	__name: "ContactForm",
	setup(__props, { expose: __expose }) {
		__expose();
		const API_BASE = "http://localhost:8000/api";
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
			if (sending.value) return;
			feedback.value = "";
			success.value = false;
			sending.value = true;
			try {
				const res = await fetch(`${API_BASE}/contact`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json"
					},
					body: JSON.stringify(form.value)
				});
				const json = await res.json();
				if (res.ok && json.success) {
					success.value = true;
					feedback.value = "Thanks for the message. I'll get back to you by email.";
					form.value = {
						name: "",
						email: "",
						subject: "",
						message: ""
					};
				} else feedback.value = res.status === 429 ? "A few too many messages at once. Please wait a minute and try again." : json.message ?? "Your message wasn't sent. Please check the fields and try again.";
			} catch {
				feedback.value = "I couldn't receive your message just now. Please try again, or email me directly.";
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
			submit
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "grid gap-5 lg:grid-cols-[.85fr_1.15fr]" }, _attrs))}><aside class="glass-card flex flex-col p-7 sm:p-9" aria-label="Contact details"><span class="icon-box mb-7"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#mail"></use></svg></span><h2 class="text-2xl font-medium tracking-tight">A good place to start.</h2><p class="mt-4 text-sm text-muted">Tell me a bit about the role or project you have in mind. I&#39;m happy to share more about my work, too.</p><div class="mt-9 space-y-6"><div><p class="mb-2 text-xs text-muted">Email</p><a href="mailto:sakhawibisono77@gmail.com" class="text-link break-all">sakhawibisono77@gmail.com</a></div><div><p class="mb-2 text-xs text-muted">Phone</p><a href="tel:+6289614040447" class="text-link"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#phone"></use></svg>+62 896-1404-0447</a></div><div><p class="mb-2 text-xs text-muted">Elsewhere</p><a href="https://linkedin.com/in/sakha-wibisono/" class="text-link" target="_blank" rel="noopener noreferrer"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#linkedin"></use></svg>Connect on LinkedIn <svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-up-right"></use></svg></a></div></div><p class="mt-9 border-t border-line pt-6 text-xs text-muted">English or Bahasa Indonesia — either is welcome.</p></aside><section class="glass-card p-7 sm:p-9" aria-labelledby="message-title"><h2 id="message-title" class="text-2xl font-medium tracking-tight">Leave me a note</h2><p class="mt-2 mb-7 text-sm text-muted">Your name, email, and message are all I need.</p><form class="space-y-5"${ssrRenderAttr("aria-busy", $setup.sending)}><div class="grid gap-5 sm:grid-cols-2"><div><label for="cf-name" class="field-label">Your name</label><input id="cf-name"${ssrRenderAttr("value", $setup.form.name)} class="field" name="name" autocomplete="name" maxlength="255" placeholder="Alex" required></div><div><label for="cf-email" class="field-label">Email address</label><input id="cf-email"${ssrRenderAttr("value", $setup.form.email)} class="field" name="email" type="email" autocomplete="email" maxlength="255" placeholder="alex@company.com" required></div></div><div><label for="cf-subject" class="field-label">Subject <span class="text-xs text-muted">(optional)</span></label><input id="cf-subject"${ssrRenderAttr("value", $setup.form.subject)} class="field" name="subject" maxlength="255" placeholder="A role, a project, or a quick hello"></div><div><label for="cf-message" class="field-label">Your message</label><textarea id="cf-message" class="field resize-y" name="message" rows="6" maxlength="5000" placeholder="Hi Sakha, I&#39;d like to talk about…" required>${ssrInterpolate($setup.form.message)}</textarea></div>`);
	if ($setup.feedback) _push(`<p${ssrRenderAttr("role", $setup.success ? "status" : "alert")} class="${ssrRenderClass([$setup.success ? "text-accent" : "text-[#e4bdb4]", "rounded-lg border border-line bg-white/5 p-4 text-sm"])}">${ssrInterpolate($setup.feedback)}</p>`);
	else _push(`<!---->`);
	_push(`<button type="submit" class="button button-primary w-full sm:w-auto"${ssrIncludeBooleanAttr($setup.sending) ? " disabled" : ""}>${ssrInterpolate($setup.sending ? "Sending…" : "Send message")}<svg class="icon" aria-hidden="true"><use${ssrRenderAttr("href", `/icons/tabler.svg#${$setup.success ? "check" : "arrow-up-right"}`)}></use></svg></button></form></section></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ContactForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ContactForm_default = /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main id="content" class="shell page"><header class="page-heading"><p class="eyebrow">My inbox is open</p><h1>Let's have a conversation.</h1><p>Have a role or project in mind? Or just a question about something I've built? I'd like to hear from you.</p></header>${renderComponent($$result, "ContactForm", ContactForm_default, {
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
