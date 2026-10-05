import { defineComponent, mergeProps, useAttrs, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderSlot } from "vue/server-renderer";
//#region src/shared/constants/design.ts
var API_BASE = "http://localhost:8000/api";
var colorPalette = {
	lavender: {
		bg: "bg-lavender/30",
		border: "border-lavender",
		text: "text-ink",
		strong: "text-lavender-strong",
		subtle: "bg-lavender/25"
	},
	blue: {
		bg: "bg-blue/35",
		border: "border-blue",
		text: "text-ink",
		strong: "text-blue-strong",
		subtle: "bg-blue/25"
	},
	mint: {
		bg: "bg-mint/35",
		border: "border-mint",
		text: "text-ink",
		strong: "text-mint-strong",
		subtle: "bg-mint/25"
	},
	peach: {
		bg: "bg-peach/40",
		border: "border-peach",
		text: "text-ink",
		strong: "text-peach-strong",
		subtle: "bg-peach/25"
	},
	pink: {
		bg: "bg-pink/40",
		border: "border-pink",
		text: "text-ink",
		strong: "text-pink-strong",
		subtle: "bg-pink/25"
	}
};
var colorKeys = Object.keys(colorPalette);
function getColorSet(index) {
	return colorPalette[colorKeys[index % colorKeys.length]];
}
function getIssuerColorSet(index) {
	const issuerOrder = [
		"mint",
		"blue",
		"lavender",
		"peach",
		"pink"
	];
	return colorPalette[issuerOrder[index % issuerOrder.length]];
}
//#endregion
//#region src/shared/composables/useApi.ts
function buildUrl(endpoint, params) {
	const url = new URL(`${API_BASE}${endpoint}`);
	if (params) Object.entries(params).forEach(([key, value]) => {
		if (value !== void 0 && value !== null) url.searchParams.append(key, String(value));
	});
	return url.toString();
}
async function apiGet(endpoint, params) {
	const res = await fetch(buildUrl(endpoint, params), { headers: { Accept: "application/json" } });
	if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
	return res.json();
}
async function apiPost(endpoint, body) {
	const res = await fetch(`${API_BASE}${endpoint}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify(body)
	});
	if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
	return res.json();
}
//#endregion
//#region \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
//#endregion
//#region src/components/ui/BaseCard.vue
var _sfc_main$4 = /*@__PURE__*/ defineComponent({
	__name: "BaseCard",
	props: {
		variant: { default: "default" },
		padding: { default: "default" },
		rounded: { default: "2xl" },
		class: {}
	},
	setup(__props, { expose: __expose }) {
		__expose();
		const props = __props;
		const variantClasses = {
			default: "glass-card",
			subtle: "glass-subtle",
			hover: "glass-card group"
		};
		const paddingClasses = {
			default: "p-6 sm:p-8",
			sm: "p-5 sm:p-6",
			lg: "p-8 sm:p-10"
		};
		const roundedClasses = {
			default: "rounded-2xl",
			xl: "rounded-xl",
			"2xl": "rounded-2xl",
			"3xl": "rounded-3xl"
		};
		const { variant, padding, rounded, ...attrs } = props;
		const __returned__ = {
			props,
			variantClasses,
			paddingClasses,
			roundedClasses,
			variant,
			padding,
			rounded,
			attrs
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: [
		$setup.variantClasses[$setup.variant],
		$setup.paddingClasses[$setup.padding],
		$setup.roundedClasses[$setup.rounded]
	] }, $setup.attrs, _attrs))}>`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</div>`);
}
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/BaseCard.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var BaseCard_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4]]);
//#endregion
//#region src/components/ui/BaseButton.vue
var baseClasses = "inline-flex items-center justify-center gap-2 font-medium rounded-full font-sans tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
var _sfc_main$3 = /*@__PURE__*/ defineComponent({
	__name: "BaseButton",
	props: {
		variant: { default: "primary" },
		size: { default: "default" },
		fullWidth: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		class: {}
	},
	emits: ["click"],
	setup(__props, { expose: __expose, emit: __emit }) {
		__expose();
		const __returned__ = {
			props: __props,
			emit: __emit,
			variantClasses: {
				primary: "glass-button-primary",
				secondary: "glass-button-secondary",
				subtle: "glass-subtle text-muted hover:text-ink hover:bg-white/50",
				ghost: "text-muted hover:text-ink"
			},
			sizeClasses: {
				default: "px-5 py-2.5 text-sm",
				sm: "px-3.5 py-1.5 text-xs",
				lg: "px-6 py-3 text-base"
			},
			baseClasses
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<button${ssrRenderAttrs(mergeProps({
		class: [
			$setup.baseClasses,
			$setup.variantClasses[$props.variant],
			$setup.sizeClasses[$props.size],
			$props.fullWidth ? "w-full" : "",
			$props.loading && "opacity-50 cursor-wait"
		],
		disabled: $props.loading
	}, _attrs))}>`);
	if ($props.loading) _push(`<span class="animate-spin">⟳</span>`);
	else _push(`<!---->`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</button>`);
}
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/BaseButton.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var BaseButton_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
//#endregion
//#region src/components/ui/BaseInput.vue
var inputClasses = "w-full px-3.5 py-2.5 rounded-xl glass-input text-sm placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-lavender/50 disabled:opacity-50";
var _sfc_main$2 = /*@__PURE__*/ defineComponent({
	__name: "BaseInput",
	props: {
		modelValue: {},
		label: {},
		type: { default: "text" },
		error: {},
		rows: { default: 4 }
	},
	emits: ["update:modelValue"],
	setup(__props, { expose: __expose, emit: __emit }) {
		__expose();
		const __returned__ = {
			props: __props,
			emit: __emit,
			attrs: useAttrs(),
			inputClasses
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	let _temp0;
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-1.5" }, _attrs))}>`);
	if ($props.label) _push(`<label${ssrRenderAttr("for", _ctx.id)} class="block font-mono text-xs leading-normal tracking-normal text-muted mb-1.5 uppercase tracking-wider">${ssrInterpolate($props.label)}</label>`);
	else _push(`<!---->`);
	if ($props.type === "textarea") _push(`<textarea${ssrRenderAttrs(_temp0 = mergeProps({
		class: [$setup.inputClasses, $props.error && "border-peach border"],
		id: $setup.attrs.id,
		disabled: $setup.attrs.disabled,
		required: $setup.attrs.required,
		placeholder: $setup.attrs.placeholder,
		rows: $props.rows,
		value: $props.modelValue
	}, $setup.attrs), "textarea")}>${ssrInterpolate("value" in _temp0 ? _temp0.value : "")}</textarea>`);
	else _push(`<input${ssrRenderAttrs(mergeProps({
		type: $props.type,
		class: [$setup.inputClasses, $props.error && "border-peach border"],
		id: $setup.attrs.id,
		disabled: $setup.attrs.disabled,
		required: $setup.attrs.required,
		placeholder: $setup.attrs.placeholder,
		value: $props.modelValue
	}, $setup.attrs))}>`);
	if ($props.error) _push(`<p class="font-mono text-xs leading-normal tracking-normal text-peach-strong text-[11px] mt-1">${ssrInterpolate($props.error)}</p>`);
	else _push(`<!---->`);
	_push(`</div>`);
}
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/BaseInput.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var BaseInput_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
//#endregion
//#region src/components/ui/BaseTag.vue
var _sfc_main$1 = /*@__PURE__*/ defineComponent({
	__name: "BaseTag",
	props: {
		variant: { default: "default" },
		size: { default: "default" },
		class: {}
	},
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = {
			props: __props,
			colorClasses: {
				default: "bg-white/70 text-ink border-white",
				lavender: "bg-lavender/30 text-ink border-lavender",
				blue: "bg-blue/35 text-ink border-blue",
				mint: "bg-mint/35 text-ink border-mint",
				peach: "bg-peach/40 text-ink border-peach",
				pink: "bg-pink/40 text-ink border-pink",
				"mint-border": "bg-mint/40 text-ink border-mint",
				"blue-border": "bg-blue/40 text-ink border-blue",
				"lavender-border": "bg-lavender/35 text-ink border-lavender",
				"peach-border": "bg-peach/40 text-ink border-peach"
			},
			sizeClasses: {
				default: "px-2.5 py-0.5 text-xs",
				sm: "px-2 py-0.5 text-[11px]",
				xs: "px-1.5 py-0.5 text-[10px]"
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<span${ssrRenderAttrs(mergeProps({ class: [
		"inline-flex items-center gap-1 font-mono font-medium rounded-full border",
		$setup.sizeClasses[$props.size],
		$setup.colorClasses[$props.variant]
	] }, _ctx.$attrs, _attrs))}>`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</span>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/BaseTag.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var BaseTag_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
//#endregion
//#region src/components/ui/Skeleton.vue
var baseClass = "animate-pulse bg-[#686A73]/10 rounded";
var _sfc_main = /*@__PURE__*/ defineComponent({
	__name: "Skeleton",
	props: {
		variant: { default: "card" },
		count: { default: 1 }
	},
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = {
			props: __props,
			baseClass,
			variantClasses: {
				card: `${baseClass} h-5 w-1/2`,
				text: `${baseClass} h-3 w-full`,
				title: `${baseClass} h-4 w-1/3`,
				subtitle: `${baseClass} h-6 w-3/4`,
				cardFull: `${baseClass} min-h-[160px]`
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
	if ($props.count > 1) {
		_push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, _attrs))}><!--[-->`);
		ssrRenderList($props.count, (i) => {
			_push(`<div class="${ssrRenderClass([$setup.variantClasses[$props.variant], "space-y-3"])}">`);
			if ($props.variant === "card" || $props.variant === "cardFull") _push(`<div class="space-y-3"><div class="${ssrRenderClass(["title", $setup.baseClass])}"></div><div class="${ssrRenderClass(["subtitle", $setup.baseClass])}"></div><div class="${ssrRenderClass(["text", $setup.baseClass])}"></div></div>`);
			else _push(`<div class="${ssrRenderClass([$props.variant, $setup.baseClass])}"></div>`);
			_push(`</div>`);
		});
		_push(`<!--]--></div>`);
	} else {
		_push(`<div${ssrRenderAttrs(mergeProps({ class: [$setup.variantClasses[$props.variant], "space-y-3"] }, _attrs))}>`);
		if ($props.variant === "card" || $props.variant === "cardFull") _push(`<div class="space-y-3"><div class="${ssrRenderClass(["title", $setup.baseClass])}"></div><div class="${ssrRenderClass(["subtitle", $setup.baseClass])}"></div><div class="${ssrRenderClass(["text", $setup.baseClass])}"></div></div>`);
		else _push(`<!---->`);
		_push(`</div>`);
	}
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/Skeleton.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Skeleton_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
export { BaseCard_default as a, apiPost as c, BaseButton_default as i, getColorSet as l, BaseTag_default as n, _plugin_vue_export_helper_default as o, BaseInput_default as r, apiGet as s, Skeleton_default as t, getIssuerColorSet as u };
