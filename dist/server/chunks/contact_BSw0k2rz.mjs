import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_Yb4BXgHG.mjs";
import { t as createComponent } from "./compiler_CiuUEj2q.mjs";
import { t as $$Layout } from "./Layout_Bkz3qYVL.mjs";
import { a as BaseCard_default, c as apiPost, i as BaseButton_default, n as BaseTag_default, o as _plugin_vue_export_helper_default, r as BaseInput_default } from "./ui_BAeaSMiE.mjs";
import { createBlock, createCommentVNode, createTextVNode, createVNode, defineComponent, mergeProps, openBlock, ref, toDisplayString, useSSRContext, withCtx, withModifiers } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
//#region src/components/ContactForm.vue
var _sfc_main = /*@__PURE__*/ defineComponent({
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
				const res = await apiPost("/contact", form.value);
				if (res.success) {
					success.value = true;
					feedback.value = res.message ?? "Your transmission was received successfully.";
					form.value = {
						name: "",
						email: "",
						subject: "",
						message: ""
					};
				} else feedback.value = res.message ?? "Transmission rejected. Please verify input fields.";
			} catch {
				feedback.value = "Network transmission error. Ensure the backend Laravel API is active.";
			} finally {
				sending.value = false;
			}
		}
		const __returned__ = {
			form,
			sending,
			feedback,
			success,
			submit,
			get BaseCard() {
				return BaseCard_default;
			},
			get BaseInput() {
				return BaseInput_default;
			},
			get BaseButton() {
				return BaseButton_default;
			},
			get BaseTag() {
				return BaseTag_default;
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
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 lg:grid-cols-12 gap-8" }, _attrs))}>`);
	_push(ssrRenderComponent($setup["BaseCard"], {
		variant: "default",
		class: "lg:col-span-5 space-y-6 flex flex-col justify-between"
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(`<div class="space-y-4"${_scopeId}>`);
				_push(ssrRenderComponent($setup["BaseTag"], {
					variant: "lavender",
					size: "default",
					class: "inline-flex items-center gap-2"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` COORDINATES // REACH_OUT `);
						else return [createTextVNode(" COORDINATES // REACH_OUT ")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`<div${_scopeId}><h2 class="text-2xl font-bold text-ink"${_scopeId}>Direct Information</h2><p class="text-sm text-muted mt-1"${_scopeId}> I am actively available for software engineering roles, technical internships, and innovative projects. </p></div><div class="space-y-3 pt-2 font-mono text-xs"${_scopeId}><div class="p-3.5 rounded-xl glass-subtle border border-white space-y-0.5"${_scopeId}><span class="text-[11px] text-muted uppercase tracking-wider block font-semibold"${_scopeId}>Email Address</span><a href="mailto:sakhawibisono77@gmail.com" class="text-ink hover:text-lavender-strong transition-colors font-medium text-sm"${_scopeId}> sakhawibisono77@gmail.com </a></div><div class="p-3.5 rounded-xl glass-subtle border border-white space-y-0.5"${_scopeId}><span class="text-[11px] text-muted uppercase tracking-wider block font-semibold"${_scopeId}>Phone &amp; WhatsApp</span><p class="text-ink font-medium text-sm"${_scopeId}>(+62) 896-1404-0447</p></div><div class="p-3.5 rounded-xl glass-subtle border border-white space-y-0.5"${_scopeId}><span class="text-[11px] text-muted uppercase tracking-wider block font-semibold"${_scopeId}>LinkedIn Profile</span><a href="https://linkedin.com/in/sakha-wibisono" target="_blank" rel="noopener noreferrer" class="text-lavender-strong hover:opacity-80 transition-opacity text-sm flex items-center gap-1"${_scopeId}><span${_scopeId}>linkedin.com/in/sakha-wibisono</span><span class="text-xs"${_scopeId}>↗</span></a></div><div class="p-3.5 rounded-xl glass-subtle border border-white space-y-0.5"${_scopeId}><span class="text-[11px] text-muted uppercase tracking-wider block font-semibold"${_scopeId}>Base Location</span><p class="text-ink font-medium text-sm"${_scopeId}>Bandung, West Java, Indonesia</p></div></div></div><div class="pt-4 border-t border-[#686A73]/15 flex items-center gap-2 font-mono text-xs text-mint-strong"${_scopeId}><span class="w-2 h-2 rounded-full bg-mint animate-pulse"${_scopeId}></span><span${_scopeId}>Standard Response Time: &lt; 24 Hours</span></div>`);
			} else return [createVNode("div", { class: "space-y-4" }, [
				createVNode($setup["BaseTag"], {
					variant: "lavender",
					size: "default",
					class: "inline-flex items-center gap-2"
				}, {
					default: withCtx(() => [createTextVNode(" COORDINATES // REACH_OUT ")]),
					_: 1
				}),
				createVNode("div", null, [createVNode("h2", { class: "text-2xl font-bold text-ink" }, "Direct Information"), createVNode("p", { class: "text-sm text-muted mt-1" }, " I am actively available for software engineering roles, technical internships, and innovative projects. ")]),
				createVNode("div", { class: "space-y-3 pt-2 font-mono text-xs" }, [
					createVNode("div", { class: "p-3.5 rounded-xl glass-subtle border border-white space-y-0.5" }, [createVNode("span", { class: "text-[11px] text-muted uppercase tracking-wider block font-semibold" }, "Email Address"), createVNode("a", {
						href: "mailto:sakhawibisono77@gmail.com",
						class: "text-ink hover:text-lavender-strong transition-colors font-medium text-sm"
					}, " sakhawibisono77@gmail.com ")]),
					createVNode("div", { class: "p-3.5 rounded-xl glass-subtle border border-white space-y-0.5" }, [createVNode("span", { class: "text-[11px] text-muted uppercase tracking-wider block font-semibold" }, "Phone & WhatsApp"), createVNode("p", { class: "text-ink font-medium text-sm" }, "(+62) 896-1404-0447")]),
					createVNode("div", { class: "p-3.5 rounded-xl glass-subtle border border-white space-y-0.5" }, [createVNode("span", { class: "text-[11px] text-muted uppercase tracking-wider block font-semibold" }, "LinkedIn Profile"), createVNode("a", {
						href: "https://linkedin.com/in/sakha-wibisono",
						target: "_blank",
						rel: "noopener noreferrer",
						class: "text-lavender-strong hover:opacity-80 transition-opacity text-sm flex items-center gap-1"
					}, [createVNode("span", null, "linkedin.com/in/sakha-wibisono"), createVNode("span", { class: "text-xs" }, "↗")])]),
					createVNode("div", { class: "p-3.5 rounded-xl glass-subtle border border-white space-y-0.5" }, [createVNode("span", { class: "text-[11px] text-muted uppercase tracking-wider block font-semibold" }, "Base Location"), createVNode("p", { class: "text-ink font-medium text-sm" }, "Bandung, West Java, Indonesia")])
				])
			]), createVNode("div", { class: "pt-4 border-t border-[#686A73]/15 flex items-center gap-2 font-mono text-xs text-mint-strong" }, [createVNode("span", { class: "w-2 h-2 rounded-full bg-mint animate-pulse" }), createVNode("span", null, "Standard Response Time: < 24 Hours")])];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent($setup["BaseCard"], {
		variant: "default",
		class: "lg:col-span-7 space-y-6"
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(`<div class="border-b border-[#686A73]/15 pb-4"${_scopeId}>`);
				_push(ssrRenderComponent($setup["BaseTag"], {
					variant: "lavender",
					class: "block font-mono text-xs uppercase tracking-wider font-semibold mb-1"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` // TRANSMISSION `);
						else return [createTextVNode(" // TRANSMISSION ")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`<h2 class="text-2xl font-bold text-ink mt-1"${_scopeId}>Send a Message</h2><p class="text-sm text-muted mt-1"${_scopeId}>Data is processed through the Laravel REST API and stored securely.</p></div><form class="space-y-4"${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}>`);
				_push(ssrRenderComponent($setup["BaseInput"], {
					id: "cf-name",
					label: "YOUR_NAME *",
					placeholder: "e.g. Jane Doe",
					required: "",
					modelValue: $setup.form.name,
					"onUpdate:modelValue": ($event) => $setup.form.name = $event
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent($setup["BaseInput"], {
					id: "cf-email",
					label: "YOUR_EMAIL *",
					type: "email",
					placeholder: "jane@company.com",
					required: "",
					modelValue: $setup.form.email,
					"onUpdate:modelValue": ($event) => $setup.form.email = $event
				}, null, _parent, _scopeId));
				_push(`</div>`);
				_push(ssrRenderComponent($setup["BaseInput"], {
					id: "cf-subject",
					label: "SUBJECT",
					placeholder: "Opportunity / Collaboration Inquiry",
					modelValue: $setup.form.subject,
					"onUpdate:modelValue": ($event) => $setup.form.subject = $event
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent($setup["BaseInput"], {
					id: "cf-message",
					label: "MESSAGE_CONTENT *",
					type: "textarea",
					placeholder: "Hi Sakha, I came across your portfolio and would like to connect regarding...",
					required: "",
					rows: 5,
					modelValue: $setup.form.message,
					"onUpdate:modelValue": ($event) => $setup.form.message = $event
				}, null, _parent, _scopeId));
				if ($setup.feedback) _push(`<div class="${ssrRenderClass(["p-3.5 rounded-xl font-mono text-xs border", $setup.success ? "bg-mint/40 border-mint text-ink" : "bg-peach/40 border-peach text-ink"])}"${_scopeId}><span class="font-bold"${_scopeId}>${ssrInterpolate($setup.success ? "SUCCESS:" : "ERROR:")}</span> ${ssrInterpolate($setup.feedback)}</div>`);
				else _push(`<!---->`);
				_push(ssrRenderComponent($setup["BaseButton"], {
					type: "submit",
					variant: "primary",
					class: "w-full sm:w-auto px-6 py-3 rounded-full",
					loading: $setup.sending
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<span${_scopeId}>${ssrInterpolate($setup.sending ? "Transmitting..." : "Send Message")}</span><span class="font-mono text-xs"${_scopeId}>→</span>`);
						else return [createVNode("span", null, toDisplayString($setup.sending ? "Transmitting..." : "Send Message"), 1), createVNode("span", { class: "font-mono text-xs" }, "→")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</form>`);
			} else return [createVNode("div", { class: "border-b border-[#686A73]/15 pb-4" }, [
				createVNode($setup["BaseTag"], {
					variant: "lavender",
					class: "block font-mono text-xs uppercase tracking-wider font-semibold mb-1"
				}, {
					default: withCtx(() => [createTextVNode(" // TRANSMISSION ")]),
					_: 1
				}),
				createVNode("h2", { class: "text-2xl font-bold text-ink mt-1" }, "Send a Message"),
				createVNode("p", { class: "text-sm text-muted mt-1" }, "Data is processed through the Laravel REST API and stored securely.")
			]), createVNode("form", {
				onSubmit: withModifiers($setup.submit, ["prevent"]),
				class: "space-y-4"
			}, [
				createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [createVNode($setup["BaseInput"], {
					id: "cf-name",
					label: "YOUR_NAME *",
					placeholder: "e.g. Jane Doe",
					required: "",
					modelValue: $setup.form.name,
					"onUpdate:modelValue": ($event) => $setup.form.name = $event
				}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode($setup["BaseInput"], {
					id: "cf-email",
					label: "YOUR_EMAIL *",
					type: "email",
					placeholder: "jane@company.com",
					required: "",
					modelValue: $setup.form.email,
					"onUpdate:modelValue": ($event) => $setup.form.email = $event
				}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
				createVNode($setup["BaseInput"], {
					id: "cf-subject",
					label: "SUBJECT",
					placeholder: "Opportunity / Collaboration Inquiry",
					modelValue: $setup.form.subject,
					"onUpdate:modelValue": ($event) => $setup.form.subject = $event
				}, null, 8, ["modelValue", "onUpdate:modelValue"]),
				createVNode($setup["BaseInput"], {
					id: "cf-message",
					label: "MESSAGE_CONTENT *",
					type: "textarea",
					placeholder: "Hi Sakha, I came across your portfolio and would like to connect regarding...",
					required: "",
					rows: 5,
					modelValue: $setup.form.message,
					"onUpdate:modelValue": ($event) => $setup.form.message = $event
				}, null, 8, ["modelValue", "onUpdate:modelValue"]),
				$setup.feedback ? (openBlock(), createBlock("div", {
					key: 0,
					class: ["p-3.5 rounded-xl font-mono text-xs border", $setup.success ? "bg-mint/40 border-mint text-ink" : "bg-peach/40 border-peach text-ink"]
				}, [createVNode("span", { class: "font-bold" }, toDisplayString($setup.success ? "SUCCESS:" : "ERROR:"), 1), createTextVNode(" " + toDisplayString($setup.feedback), 1)], 2)) : createCommentVNode("", true),
				createVNode($setup["BaseButton"], {
					type: "submit",
					variant: "primary",
					class: "w-full sm:w-auto px-6 py-3 rounded-full",
					loading: $setup.sending
				}, {
					default: withCtx(() => [createVNode("span", null, toDisplayString($setup.sending ? "Transmitting..." : "Send Message"), 1), createVNode("span", { class: "font-mono text-xs" }, "→")]),
					_: 1
				}, 8, ["loading"])
			], 32)];
		}),
		_: 1
	}, _parent));
	_push(`</div>`);
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
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 space-y-8"><div class="border-b border-[#686A73]/15 pb-6"><span class="font-mono text-xs leading-normal uppercase text-lavender-strong tracking-wider block font-semibold">// COMMUNICATIONS</span><h1 class="text-3xl sm:text-4xl leading-tight font-bold tracking-normal text-ink mt-1">Get in Touch</h1><p class="text-sm leading-relaxed text-muted mt-1 max-w-xl">Send a direct message or connect through professional channels. Inquiries are stored and processed via the Laravel API.</p></div>${renderComponent($$result, "ContactForm", ContactForm_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "/var/www/src/components/ContactForm.vue",
		"client:component-export": "default"
	})}</main>` })}`;
}, "/var/www/src/pages/contact.astro", void 0);
var $$file = "/var/www/src/pages/contact.astro";
var $$url = "/contact";
//#endregion
//#region \0virtual:astro:page:src/pages/contact@_@astro
var page = () => contact_exports;
//#endregion
export { page };
