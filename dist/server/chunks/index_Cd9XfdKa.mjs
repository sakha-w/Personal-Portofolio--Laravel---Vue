import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
import { f as renderHead, i as renderComponent, s as renderSlot, u as renderTemplate, x as createAstro } from "./server_BlGQXW16.mjs";
import { t as createComponent } from "./compiler_x2KlOj5P.mjs";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, mergeProps, onMounted, openBlock, ref, renderList, resolveComponent, toDisplayString, useSSRContext, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { NConfigProvider, NMessageProvider, useMessage } from "naive-ui";
//#region src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title } = Astro.props;
	return renderTemplate`<html lang="en" data-astro-cid-ju4pidww><head><meta charset="UTF-8"><meta name="description" content="Fresh Graduate Portfolio Dashboard built with Astro, Vue.js and Naive UI"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.ico"><title>${title}</title><!-- vfonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">${renderHead($$result)}</head><body class="bg-slate-50 text-slate-800 m-0 p-0 min-h-screen" data-astro-cid-ju4pidww>${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "D:/Project/learn-docker/src/layouts/Layout.astro", void 0);
//#endregion
//#region \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
//#endregion
//#region src/components/DashboardContent.vue
var _sfc_main$1 = {
	__name: "DashboardContent",
	setup(__props, { expose: __expose }) {
		__expose();
		const message = useMessage();
		const showContactModal = ref(false);
		const selectedCategory = ref("All");
		const submitting = ref(false);
		const allProjects = ref([]);
		const categories = [
			"All",
			"Full Stack",
			"AI & ML",
			"Systems"
		];
		const contactForm = ref({
			name: "",
			email: "",
			subject: "",
			message: ""
		});
		const contactRules = {
			name: [{
				required: true,
				message: "Please enter your name",
				trigger: "blur"
			}],
			email: [{
				required: true,
				message: "Please enter your email",
				trigger: "blur"
			}],
			message: [{
				required: true,
				message: "Please enter your message",
				trigger: "blur"
			}]
		};
		onMounted(async () => {
			try {
				const json = await (await fetch("/api/projects")).json();
				if (json.success && json.data) allProjects.value = json.data;
			} catch (err) {
				console.error("Failed to load projects from API:", err);
			}
		});
		const featuredProjects = computed(() => {
			return allProjects.value.slice(0, 3);
		});
		const filteredProjects = computed(() => {
			if (selectedCategory.value === "All") return allProjects.value;
			return allProjects.value.filter((p) => p.category === selectedCategory.value);
		});
		const submitContact = async () => {
			if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.message) {
				message.error("Please fill in all required fields.");
				return;
			}
			submitting.value = true;
			try {
				const json = await (await fetch("/api/contact", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contactForm.value)
				})).json();
				if (json.success) {
					message.success(json.message);
					showContactModal.value = false;
					contactForm.value = {
						name: "",
						email: "",
						subject: "",
						message: ""
					};
				} else message.error(json.error || "Failed to send message.");
			} catch (err) {
				message.error("Network error. Please try again later.");
			} finally {
				submitting.value = false;
			}
		};
		const downloadResume = () => {
			message.info("Downloading Sakha Wibisono resume (PDF)...");
		};
		const __returned__ = {
			message,
			showContactModal,
			selectedCategory,
			submitting,
			allProjects,
			categories,
			contactForm,
			contactRules,
			featuredProjects,
			filteredProjects,
			submitContact,
			downloadResume,
			frontendSkills: [
				{
					name: "JavaScript / HTML & CSS",
					level: 95
				},
				{
					name: "ReactJS / Vue.js",
					level: 90
				},
				{
					name: "AngularJS / Astro",
					level: 85
				},
				{
					name: "OAuth 2.0 / OIDC & API Integration",
					level: 88
				},
				{
					name: "Responsive Web Design",
					level: 90
				}
			],
			backendSkills: [
				{
					name: "Python / PHP",
					level: 88
				},
				{
					name: "Supabase / MySQL",
					level: 86
				},
				{
					name: "Node.js / Backend Logic",
					level: 85
				},
				{
					name: "Kotlin (Android)",
					level: 80
				},
				{
					name: "Data Science & Machine Learning",
					level: 82
				}
			],
			allTools: [
				"JavaScript",
				"Python",
				"PHP",
				"Kotlin",
				"HTML & CSS",
				"ReactJS",
				"Vue.js",
				"AngularJS",
				"Astro",
				"Supabase",
				"MySQL",
				"Visual Studio Code",
				"Android Studio",
				"GitHub",
				"Ms. Office",
				"Ms. Excel",
				"OAuth 2.0",
				"OpenID Connect",
				"REST APIs",
				"Agile"
			],
			certifications: [
				{
					issuer: "Dicoding Indonesia",
					date: "2026",
					title: "Belajar Machine Learning untuk Pemula",
					description: "Foundational concepts and implementation of machine learning models."
				},
				{
					issuer: "Dicoding Indonesia",
					date: "2025",
					title: "Belajar Fundamental Back-End dengan Javascript",
					description: "Core backend development principles and JavaScript server architecture."
				},
				{
					issuer: "Dicoding Indonesia",
					date: "2025",
					title: "Belajar Fundamental Aplikasi Web dengan React",
					description: "Advanced React development, component architecture, and state management."
				},
				{
					issuer: "Dicoding Indonesia",
					date: "2025",
					title: "Belajar Dasar Cloud dan Gen AI di AWS",
					description: "Cloud computing fundamentals and Generative AI services on AWS."
				},
				{
					issuer: "Coursera",
					date: "2022",
					title: "IT Support Google",
					description: "Information technology support, troubleshooting, and system administration."
				}
			],
			ref,
			computed,
			onMounted,
			get useMessage() {
				return useMessage;
			}
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_n_avatar = resolveComponent("n-avatar");
	const _component_n_tag = resolveComponent("n-tag");
	const _component_n_button = resolveComponent("n-button");
	const _component_n_card = resolveComponent("n-card");
	const _component_n_statistic = resolveComponent("n-statistic");
	const _component_n_tabs = resolveComponent("n-tabs");
	const _component_n_tab_pane = resolveComponent("n-tab-pane");
	const _component_n_grid = resolveComponent("n-grid");
	const _component_n_gi = resolveComponent("n-gi");
	const _component_n_progress = resolveComponent("n-progress");
	const _component_n_timeline = resolveComponent("n-timeline");
	const _component_n_timeline_item = resolveComponent("n-timeline-item");
	const _component_n_modal = resolveComponent("n-modal");
	const _component_n_form = resolveComponent("n-form");
	const _component_n_form_item = resolveComponent("n-form-item");
	const _component_n_input = resolveComponent("n-input");
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50 text-slate-800 pb-16" }, _attrs))}><header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"><div class="flex items-center space-x-3">`);
	_push(ssrRenderComponent(_component_n_avatar, {
		round: "",
		size: "medium",
		src: "https://api.dicebear.com/7.x/avataaars/svg?seed=SakhaWibisono",
		"fallback-src": "https://07.img.avito.st/640x480/10577717707.jpg"
	}, null, _parent));
	_push(`<div><h1 class="font-bold text-slate-900 text-lg leading-tight">Sakha Wibisono</h1><p class="text-xs text-slate-500">Informatics Fresh Graduate &amp; Software Engineer</p></div></div><div class="flex items-center space-x-3">`);
	_push(ssrRenderComponent(_component_n_tag, {
		type: "success",
		round: "",
		size: "small"
	}, {
		icon: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(`<span class="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"${_scopeId}></span>`);
			else return [createVNode("span", { class: "w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" })];
		}),
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(` Open to Opportunities `);
			else return [createTextVNode(" Open to Opportunities ")];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_n_button, {
		type: "primary",
		size: "small",
		onClick: ($event) => $setup.showContactModal = true
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(` Contact Me `);
			else return [createTextVNode(" Contact Me ")];
		}),
		_: 1
	}, _parent));
	_push(`</div></div></header><main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">`);
	_push(ssrRenderComponent(_component_n_card, { class: "mb-8 shadow-sm rounded-xl border border-slate-200 bg-gradient-to-r from-slate-900 to-indigo-950 text-white" }, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center py-4 px-2"${_scopeId}><div class="lg:col-span-2 space-y-4"${_scopeId}><div class="flex items-center space-x-2"${_scopeId}>`);
				_push(ssrRenderComponent(_component_n_tag, {
					type: "info",
					size: "small",
					round: ""
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Bachelor of Informatics &#39;26`);
						else return [createTextVNode("Bachelor of Informatics '26")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_n_tag, {
					type: "warning",
					size: "small",
					round: ""
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Telkom University`);
						else return [createTextVNode("Telkom University")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div><h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight"${_scopeId}> Frontend Development, React &amp; Modern Web Technologies </h2><p class="text-slate-300 text-sm sm:text-base leading-relaxed"${_scopeId}> Fresh graduate in Informatics from Telkom University with hands-on experience in software development through internships and organizational activities. Proficient in Frontend Development, JavaScript, ReactJS, API Integration, and modern web development technologies. </p><div class="flex flex-wrap gap-3 pt-2"${_scopeId}>`);
				_push(ssrRenderComponent(_component_n_button, {
					type: "primary",
					ghost: "",
					color: "#ffffff",
					onClick: $setup.downloadResume
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Download Resume `);
						else return [createTextVNode(" Download Resume ")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_n_button, {
					text: "",
					color: "#94a3b8",
					tag: "a",
					href: "https://github.com/sakha-wibisono",
					target: "_blank"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` GitHub Profile ↗ `);
						else return [createTextVNode(" GitHub Profile ↗ ")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_n_button, {
					text: "",
					color: "#94a3b8",
					tag: "a",
					href: "https://linkedin.com/in/sakha-wibisono",
					target: "_blank"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` LinkedIn ↗ `);
						else return [createTextVNode(" LinkedIn ↗ ")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(`</div></div><div class="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 space-y-4"${_scopeId}><h3 class="text-xs uppercase tracking-wider text-slate-400 font-semibold"${_scopeId}>Academic &amp; Career Metrics</h3><div class="grid grid-cols-2 gap-4"${_scopeId}>`);
				_push(ssrRenderComponent(_component_n_statistic, {
					label: "Bachelor GPA",
					value: "3.50",
					precision: "2"
				}, {
					suffix: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`/ 4.0`);
						else return [createTextVNode("/ 4.0")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_n_statistic, {
					label: "Diploma GPA",
					value: "3.67",
					precision: "2"
				}, {
					suffix: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`/ 4.0`);
						else return [createTextVNode("/ 4.0")];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_n_statistic, {
					label: "Internships",
					value: "3"
				}, null, _parent, _scopeId));
				_push(ssrRenderComponent(_component_n_statistic, {
					label: "Certifications",
					value: "5"
				}, null, _parent, _scopeId));
				_push(`</div></div></div>`);
			} else return [createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-8 items-center py-4 px-2" }, [createVNode("div", { class: "lg:col-span-2 space-y-4" }, [
				createVNode("div", { class: "flex items-center space-x-2" }, [createVNode(_component_n_tag, {
					type: "info",
					size: "small",
					round: ""
				}, {
					default: withCtx(() => [createTextVNode("Bachelor of Informatics '26")]),
					_: 1
				}), createVNode(_component_n_tag, {
					type: "warning",
					size: "small",
					round: ""
				}, {
					default: withCtx(() => [createTextVNode("Telkom University")]),
					_: 1
				})]),
				createVNode("h2", { class: "text-3xl sm:text-4xl font-extrabold tracking-tight" }, " Frontend Development, React & Modern Web Technologies "),
				createVNode("p", { class: "text-slate-300 text-sm sm:text-base leading-relaxed" }, " Fresh graduate in Informatics from Telkom University with hands-on experience in software development through internships and organizational activities. Proficient in Frontend Development, JavaScript, ReactJS, API Integration, and modern web development technologies. "),
				createVNode("div", { class: "flex flex-wrap gap-3 pt-2" }, [
					createVNode(_component_n_button, {
						type: "primary",
						ghost: "",
						color: "#ffffff",
						onClick: $setup.downloadResume
					}, {
						default: withCtx(() => [createTextVNode(" Download Resume ")]),
						_: 1
					}),
					createVNode(_component_n_button, {
						text: "",
						color: "#94a3b8",
						tag: "a",
						href: "https://github.com/sakha-wibisono",
						target: "_blank"
					}, {
						default: withCtx(() => [createTextVNode(" GitHub Profile ↗ ")]),
						_: 1
					}),
					createVNode(_component_n_button, {
						text: "",
						color: "#94a3b8",
						tag: "a",
						href: "https://linkedin.com/in/sakha-wibisono",
						target: "_blank"
					}, {
						default: withCtx(() => [createTextVNode(" LinkedIn ↗ ")]),
						_: 1
					})
				])
			]), createVNode("div", { class: "bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10 space-y-4" }, [createVNode("h3", { class: "text-xs uppercase tracking-wider text-slate-400 font-semibold" }, "Academic & Career Metrics"), createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
				createVNode(_component_n_statistic, {
					label: "Bachelor GPA",
					value: "3.50",
					precision: "2"
				}, {
					suffix: withCtx(() => [createTextVNode("/ 4.0")]),
					_: 1
				}),
				createVNode(_component_n_statistic, {
					label: "Diploma GPA",
					value: "3.67",
					precision: "2"
				}, {
					suffix: withCtx(() => [createTextVNode("/ 4.0")]),
					_: 1
				}),
				createVNode(_component_n_statistic, {
					label: "Internships",
					value: "3"
				}),
				createVNode(_component_n_statistic, {
					label: "Certifications",
					value: "5"
				})
			])])])];
		}),
		_: 1
	}, _parent));
	_push(ssrRenderComponent(_component_n_tabs, {
		type: "segment",
		"default-value": "overview",
		size: "large",
		class: "custom-tabs"
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) {
				_push(ssrRenderComponent(_component_n_tab_pane, {
					name: "overview",
					tab: "Overview"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="space-y-8 mt-6"${_scopeId}>`);
							_push(ssrRenderComponent(_component_n_grid, {
								"x-gap": "20",
								"y-gap": "20",
								cols: 12
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_n_gi, {
											span: 12,
											l: 8
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_n_card, {
													title: "Education Background",
													class: "h-full shadow-xs rounded-xl"
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) {
															_push(`<div class="space-y-4"${_scopeId}><div class="border-l-2 border-indigo-600 pl-4 space-y-1"${_scopeId}><h4 class="font-bold text-slate-900 text-base"${_scopeId}>Bachelor of Informatics (GPA 3.50/4.00)</h4><p class="text-sm font-medium text-indigo-600"${_scopeId}>Telkom University (2024 - 2026)</p><p class="text-xs text-slate-500"${_scopeId}>Extension program from Diploma. Thesis: Utilization of Generative AI for Process Discovery in Operational Maintenance Data Electric Power Company</p></div><div class="border-l-2 border-emerald-600 pl-4 space-y-1"${_scopeId}><h4 class="font-bold text-slate-900 text-base"${_scopeId}>Diploma in Software Application Engineering (GPA 3.67/4.00)</h4><p class="text-sm font-medium text-emerald-600"${_scopeId}>Telkom University (2021 - 2024)</p><p class="text-xs text-slate-500"${_scopeId}>Thesis: MedRecordX - Patient Medical Record Application (Case Study: Telagasari Azimat Clinic)</p></div><div class="bg-slate-50 p-4 rounded-lg space-y-2"${_scopeId}><span class="text-xs font-semibold text-slate-600 uppercase tracking-wider"${_scopeId}>Key Tech &amp; Tools</span><div class="flex flex-wrap gap-1.5 pt-1"${_scopeId}>`);
															_push(ssrRenderComponent(_component_n_tag, {
																size: "small",
																bordered: false
															}, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) _push(`JavaScript`);
																	else return [createTextVNode("JavaScript")];
																}),
																_: 1
															}, _parent, _scopeId));
															_push(ssrRenderComponent(_component_n_tag, {
																size: "small",
																bordered: false
															}, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) _push(`ReactJS`);
																	else return [createTextVNode("ReactJS")];
																}),
																_: 1
															}, _parent, _scopeId));
															_push(ssrRenderComponent(_component_n_tag, {
																size: "small",
																bordered: false
															}, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) _push(`Vue.js`);
																	else return [createTextVNode("Vue.js")];
																}),
																_: 1
															}, _parent, _scopeId));
															_push(ssrRenderComponent(_component_n_tag, {
																size: "small",
																bordered: false
															}, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) _push(`Python`);
																	else return [createTextVNode("Python")];
																}),
																_: 1
															}, _parent, _scopeId));
															_push(ssrRenderComponent(_component_n_tag, {
																size: "small",
																bordered: false
															}, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) _push(`PHP`);
																	else return [createTextVNode("PHP")];
																}),
																_: 1
															}, _parent, _scopeId));
															_push(ssrRenderComponent(_component_n_tag, {
																size: "small",
																bordered: false
															}, {
																default: withCtx((_, _push, _parent, _scopeId) => {
																	if (_push) _push(`MySQL`);
																	else return [createTextVNode("MySQL")];
																}),
																_: 1
															}, _parent, _scopeId));
															_push(`</div></div></div>`);
														} else return [createVNode("div", { class: "space-y-4" }, [
															createVNode("div", { class: "border-l-2 border-indigo-600 pl-4 space-y-1" }, [
																createVNode("h4", { class: "font-bold text-slate-900 text-base" }, "Bachelor of Informatics (GPA 3.50/4.00)"),
																createVNode("p", { class: "text-sm font-medium text-indigo-600" }, "Telkom University (2024 - 2026)"),
																createVNode("p", { class: "text-xs text-slate-500" }, "Extension program from Diploma. Thesis: Utilization of Generative AI for Process Discovery in Operational Maintenance Data Electric Power Company")
															]),
															createVNode("div", { class: "border-l-2 border-emerald-600 pl-4 space-y-1" }, [
																createVNode("h4", { class: "font-bold text-slate-900 text-base" }, "Diploma in Software Application Engineering (GPA 3.67/4.00)"),
																createVNode("p", { class: "text-sm font-medium text-emerald-600" }, "Telkom University (2021 - 2024)"),
																createVNode("p", { class: "text-xs text-slate-500" }, "Thesis: MedRecordX - Patient Medical Record Application (Case Study: Telagasari Azimat Clinic)")
															]),
															createVNode("div", { class: "bg-slate-50 p-4 rounded-lg space-y-2" }, [createVNode("span", { class: "text-xs font-semibold text-slate-600 uppercase tracking-wider" }, "Key Tech & Tools"), createVNode("div", { class: "flex flex-wrap gap-1.5 pt-1" }, [
																createVNode(_component_n_tag, {
																	size: "small",
																	bordered: false
																}, {
																	default: withCtx(() => [createTextVNode("JavaScript")]),
																	_: 1
																}),
																createVNode(_component_n_tag, {
																	size: "small",
																	bordered: false
																}, {
																	default: withCtx(() => [createTextVNode("ReactJS")]),
																	_: 1
																}),
																createVNode(_component_n_tag, {
																	size: "small",
																	bordered: false
																}, {
																	default: withCtx(() => [createTextVNode("Vue.js")]),
																	_: 1
																}),
																createVNode(_component_n_tag, {
																	size: "small",
																	bordered: false
																}, {
																	default: withCtx(() => [createTextVNode("Python")]),
																	_: 1
																}),
																createVNode(_component_n_tag, {
																	size: "small",
																	bordered: false
																}, {
																	default: withCtx(() => [createTextVNode("PHP")]),
																	_: 1
																}),
																createVNode(_component_n_tag, {
																	size: "small",
																	bordered: false
																}, {
																	default: withCtx(() => [createTextVNode("MySQL")]),
																	_: 1
																})
															])])
														])];
													}),
													_: 1
												}, _parent, _scopeId));
												else return [createVNode(_component_n_card, {
													title: "Education Background",
													class: "h-full shadow-xs rounded-xl"
												}, {
													default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [
														createVNode("div", { class: "border-l-2 border-indigo-600 pl-4 space-y-1" }, [
															createVNode("h4", { class: "font-bold text-slate-900 text-base" }, "Bachelor of Informatics (GPA 3.50/4.00)"),
															createVNode("p", { class: "text-sm font-medium text-indigo-600" }, "Telkom University (2024 - 2026)"),
															createVNode("p", { class: "text-xs text-slate-500" }, "Extension program from Diploma. Thesis: Utilization of Generative AI for Process Discovery in Operational Maintenance Data Electric Power Company")
														]),
														createVNode("div", { class: "border-l-2 border-emerald-600 pl-4 space-y-1" }, [
															createVNode("h4", { class: "font-bold text-slate-900 text-base" }, "Diploma in Software Application Engineering (GPA 3.67/4.00)"),
															createVNode("p", { class: "text-sm font-medium text-emerald-600" }, "Telkom University (2021 - 2024)"),
															createVNode("p", { class: "text-xs text-slate-500" }, "Thesis: MedRecordX - Patient Medical Record Application (Case Study: Telagasari Azimat Clinic)")
														]),
														createVNode("div", { class: "bg-slate-50 p-4 rounded-lg space-y-2" }, [createVNode("span", { class: "text-xs font-semibold text-slate-600 uppercase tracking-wider" }, "Key Tech & Tools"), createVNode("div", { class: "flex flex-wrap gap-1.5 pt-1" }, [
															createVNode(_component_n_tag, {
																size: "small",
																bordered: false
															}, {
																default: withCtx(() => [createTextVNode("JavaScript")]),
																_: 1
															}),
															createVNode(_component_n_tag, {
																size: "small",
																bordered: false
															}, {
																default: withCtx(() => [createTextVNode("ReactJS")]),
																_: 1
															}),
															createVNode(_component_n_tag, {
																size: "small",
																bordered: false
															}, {
																default: withCtx(() => [createTextVNode("Vue.js")]),
																_: 1
															}),
															createVNode(_component_n_tag, {
																size: "small",
																bordered: false
															}, {
																default: withCtx(() => [createTextVNode("Python")]),
																_: 1
															}),
															createVNode(_component_n_tag, {
																size: "small",
																bordered: false
															}, {
																default: withCtx(() => [createTextVNode("PHP")]),
																_: 1
															}),
															createVNode(_component_n_tag, {
																size: "small",
																bordered: false
															}, {
																default: withCtx(() => [createTextVNode("MySQL")]),
																_: 1
															})
														])])
													])]),
													_: 1
												})];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_n_gi, {
											span: 12,
											l: 4
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_n_card, {
													title: "Core Competencies",
													class: "h-full shadow-xs rounded-xl"
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) {
															_push(`<div class="space-y-3"${_scopeId}><div${_scopeId}><div class="flex justify-between text-xs mb-1 font-medium text-slate-700"${_scopeId}><span${_scopeId}>Frontend (Vue / React / TS)</span><span${_scopeId}>92%</span></div>`);
															_push(ssrRenderComponent(_component_n_progress, {
																type: "line",
																percentage: 92,
																"show-indicator": false,
																color: "#6366f1"
															}, null, _parent, _scopeId));
															_push(`</div><div${_scopeId}><div class="flex justify-between text-xs mb-1 font-medium text-slate-700"${_scopeId}><span${_scopeId}>Backend (Node / Python / SQL)</span><span${_scopeId}>88%</span></div>`);
															_push(ssrRenderComponent(_component_n_progress, {
																type: "line",
																percentage: 88,
																"show-indicator": false,
																color: "#8b5cf6"
															}, null, _parent, _scopeId));
															_push(`</div><div${_scopeId}><div class="flex justify-between text-xs mb-1 font-medium text-slate-700"${_scopeId}><span${_scopeId}>Cloud &amp; DevOps (Docker / Git)</span><span${_scopeId}>80%</span></div>`);
															_push(ssrRenderComponent(_component_n_progress, {
																type: "line",
																percentage: 80,
																"show-indicator": false,
																color: "#ec4899"
															}, null, _parent, _scopeId));
															_push(`</div><div${_scopeId}><div class="flex justify-between text-xs mb-1 font-medium text-slate-700"${_scopeId}><span${_scopeId}>System Architecture</span><span${_scopeId}>85%</span></div>`);
															_push(ssrRenderComponent(_component_n_progress, {
																type: "line",
																percentage: 85,
																"show-indicator": false,
																color: "#06b6d4"
															}, null, _parent, _scopeId));
															_push(`</div></div>`);
														} else return [createVNode("div", { class: "space-y-3" }, [
															createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "Frontend (Vue / React / TS)"), createVNode("span", null, "92%")]), createVNode(_component_n_progress, {
																type: "line",
																percentage: 92,
																"show-indicator": false,
																color: "#6366f1"
															})]),
															createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "Backend (Node / Python / SQL)"), createVNode("span", null, "88%")]), createVNode(_component_n_progress, {
																type: "line",
																percentage: 88,
																"show-indicator": false,
																color: "#8b5cf6"
															})]),
															createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "Cloud & DevOps (Docker / Git)"), createVNode("span", null, "80%")]), createVNode(_component_n_progress, {
																type: "line",
																percentage: 80,
																"show-indicator": false,
																color: "#ec4899"
															})]),
															createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "System Architecture"), createVNode("span", null, "85%")]), createVNode(_component_n_progress, {
																type: "line",
																percentage: 85,
																"show-indicator": false,
																color: "#06b6d4"
															})])
														])];
													}),
													_: 1
												}, _parent, _scopeId));
												else return [createVNode(_component_n_card, {
													title: "Core Competencies",
													class: "h-full shadow-xs rounded-xl"
												}, {
													default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
														createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "Frontend (Vue / React / TS)"), createVNode("span", null, "92%")]), createVNode(_component_n_progress, {
															type: "line",
															percentage: 92,
															"show-indicator": false,
															color: "#6366f1"
														})]),
														createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "Backend (Node / Python / SQL)"), createVNode("span", null, "88%")]), createVNode(_component_n_progress, {
															type: "line",
															percentage: 88,
															"show-indicator": false,
															color: "#8b5cf6"
														})]),
														createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "Cloud & DevOps (Docker / Git)"), createVNode("span", null, "80%")]), createVNode(_component_n_progress, {
															type: "line",
															percentage: 80,
															"show-indicator": false,
															color: "#ec4899"
														})]),
														createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "System Architecture"), createVNode("span", null, "85%")]), createVNode(_component_n_progress, {
															type: "line",
															percentage: 85,
															"show-indicator": false,
															color: "#06b6d4"
														})])
													])]),
													_: 1
												})];
											}),
											_: 1
										}, _parent, _scopeId));
									} else return [createVNode(_component_n_gi, {
										span: 12,
										l: 8
									}, {
										default: withCtx(() => [createVNode(_component_n_card, {
											title: "Education Background",
											class: "h-full shadow-xs rounded-xl"
										}, {
											default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [
												createVNode("div", { class: "border-l-2 border-indigo-600 pl-4 space-y-1" }, [
													createVNode("h4", { class: "font-bold text-slate-900 text-base" }, "Bachelor of Informatics (GPA 3.50/4.00)"),
													createVNode("p", { class: "text-sm font-medium text-indigo-600" }, "Telkom University (2024 - 2026)"),
													createVNode("p", { class: "text-xs text-slate-500" }, "Extension program from Diploma. Thesis: Utilization of Generative AI for Process Discovery in Operational Maintenance Data Electric Power Company")
												]),
												createVNode("div", { class: "border-l-2 border-emerald-600 pl-4 space-y-1" }, [
													createVNode("h4", { class: "font-bold text-slate-900 text-base" }, "Diploma in Software Application Engineering (GPA 3.67/4.00)"),
													createVNode("p", { class: "text-sm font-medium text-emerald-600" }, "Telkom University (2021 - 2024)"),
													createVNode("p", { class: "text-xs text-slate-500" }, "Thesis: MedRecordX - Patient Medical Record Application (Case Study: Telagasari Azimat Clinic)")
												]),
												createVNode("div", { class: "bg-slate-50 p-4 rounded-lg space-y-2" }, [createVNode("span", { class: "text-xs font-semibold text-slate-600 uppercase tracking-wider" }, "Key Tech & Tools"), createVNode("div", { class: "flex flex-wrap gap-1.5 pt-1" }, [
													createVNode(_component_n_tag, {
														size: "small",
														bordered: false
													}, {
														default: withCtx(() => [createTextVNode("JavaScript")]),
														_: 1
													}),
													createVNode(_component_n_tag, {
														size: "small",
														bordered: false
													}, {
														default: withCtx(() => [createTextVNode("ReactJS")]),
														_: 1
													}),
													createVNode(_component_n_tag, {
														size: "small",
														bordered: false
													}, {
														default: withCtx(() => [createTextVNode("Vue.js")]),
														_: 1
													}),
													createVNode(_component_n_tag, {
														size: "small",
														bordered: false
													}, {
														default: withCtx(() => [createTextVNode("Python")]),
														_: 1
													}),
													createVNode(_component_n_tag, {
														size: "small",
														bordered: false
													}, {
														default: withCtx(() => [createTextVNode("PHP")]),
														_: 1
													}),
													createVNode(_component_n_tag, {
														size: "small",
														bordered: false
													}, {
														default: withCtx(() => [createTextVNode("MySQL")]),
														_: 1
													})
												])])
											])]),
											_: 1
										})]),
										_: 1
									}), createVNode(_component_n_gi, {
										span: 12,
										l: 4
									}, {
										default: withCtx(() => [createVNode(_component_n_card, {
											title: "Core Competencies",
											class: "h-full shadow-xs rounded-xl"
										}, {
											default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
												createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "Frontend (Vue / React / TS)"), createVNode("span", null, "92%")]), createVNode(_component_n_progress, {
													type: "line",
													percentage: 92,
													"show-indicator": false,
													color: "#6366f1"
												})]),
												createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "Backend (Node / Python / SQL)"), createVNode("span", null, "88%")]), createVNode(_component_n_progress, {
													type: "line",
													percentage: 88,
													"show-indicator": false,
													color: "#8b5cf6"
												})]),
												createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "Cloud & DevOps (Docker / Git)"), createVNode("span", null, "80%")]), createVNode(_component_n_progress, {
													type: "line",
													percentage: 80,
													"show-indicator": false,
													color: "#ec4899"
												})]),
												createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "System Architecture"), createVNode("span", null, "85%")]), createVNode(_component_n_progress, {
													type: "line",
													percentage: 85,
													"show-indicator": false,
													color: "#06b6d4"
												})])
											])]),
											_: 1
										})]),
										_: 1
									})];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`<div${_scopeId}><div class="flex justify-between items-center mb-4"${_scopeId}><h3 class="text-xl font-bold text-slate-900"${_scopeId}>Featured Capstone Projects (Fetched via API)</h3></div>`);
							_push(ssrRenderComponent(_component_n_grid, {
								"x-gap": "20",
								"y-gap": "20",
								cols: 12
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(`<!--[-->`);
										ssrRenderList($setup.featuredProjects, (proj) => {
											_push(ssrRenderComponent(_component_n_gi, {
												key: proj.title,
												span: 12,
												m: 6,
												l: 4
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_n_card, {
														hoverable: "",
														class: "h-full flex flex-col justify-between shadow-xs rounded-xl border border-slate-200"
													}, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) {
																_push(`<div class="space-y-3"${_scopeId}><div class="flex justify-between items-start"${_scopeId}>`);
																_push(ssrRenderComponent(_component_n_tag, {
																	type: proj.typeColor,
																	size: "small"
																}, {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) _push(`${ssrInterpolate(proj.category)}`);
																		else return [createTextVNode(toDisplayString(proj.category), 1)];
																	}),
																	_: 2
																}, _parent, _scopeId));
																_push(`<span class="text-xs text-slate-400"${_scopeId}>${ssrInterpolate(proj.year)}</span></div><h4 class="font-bold text-slate-900 text-base"${_scopeId}>${ssrInterpolate(proj.title)}</h4><p class="text-xs text-slate-600 leading-relaxed"${_scopeId}>${ssrInterpolate(proj.description)}</p></div><div class="pt-4 mt-4 border-t border-slate-100 space-y-3"${_scopeId}><div class="flex flex-wrap gap-1"${_scopeId}><!--[-->`);
																ssrRenderList(proj.techs, (tech) => {
																	_push(ssrRenderComponent(_component_n_tag, {
																		key: tech,
																		size: "tiny",
																		type: "default",
																		ghost: ""
																	}, {
																		default: withCtx((_, _push, _parent, _scopeId) => {
																			if (_push) _push(`${ssrInterpolate(tech)}`);
																			else return [createTextVNode(toDisplayString(tech), 1)];
																		}),
																		_: 2
																	}, _parent, _scopeId));
																});
																_push(`<!--]--></div><div class="flex justify-between items-center pt-1"${_scopeId}>`);
																_push(ssrRenderComponent(_component_n_button, {
																	text: "",
																	tag: "a",
																	href: proj.github,
																	target: "_blank",
																	size: "small"
																}, {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) _push(`GitHub ↗`);
																		else return [createTextVNode("GitHub ↗")];
																	}),
																	_: 2
																}, _parent, _scopeId));
																_push(ssrRenderComponent(_component_n_button, {
																	type: "primary",
																	ghost: "",
																	size: "tiny",
																	tag: "a",
																	href: proj.demo,
																	target: "_blank"
																}, {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) _push(`Live Demo`);
																		else return [createTextVNode("Live Demo")];
																	}),
																	_: 2
																}, _parent, _scopeId));
																_push(`</div></div>`);
															} else return [createVNode("div", { class: "space-y-3" }, [
																createVNode("div", { class: "flex justify-between items-start" }, [createVNode(_component_n_tag, {
																	type: proj.typeColor,
																	size: "small"
																}, {
																	default: withCtx(() => [createTextVNode(toDisplayString(proj.category), 1)]),
																	_: 2
																}, 1032, ["type"]), createVNode("span", { class: "text-xs text-slate-400" }, toDisplayString(proj.year), 1)]),
																createVNode("h4", { class: "font-bold text-slate-900 text-base" }, toDisplayString(proj.title), 1),
																createVNode("p", { class: "text-xs text-slate-600 leading-relaxed" }, toDisplayString(proj.description), 1)
															]), createVNode("div", { class: "pt-4 mt-4 border-t border-slate-100 space-y-3" }, [createVNode("div", { class: "flex flex-wrap gap-1" }, [(openBlock(true), createBlock(Fragment, null, renderList(proj.techs, (tech) => {
																return openBlock(), createBlock(_component_n_tag, {
																	key: tech,
																	size: "tiny",
																	type: "default",
																	ghost: ""
																}, {
																	default: withCtx(() => [createTextVNode(toDisplayString(tech), 1)]),
																	_: 2
																}, 1024);
															}), 128))]), createVNode("div", { class: "flex justify-between items-center pt-1" }, [createVNode(_component_n_button, {
																text: "",
																tag: "a",
																href: proj.github,
																target: "_blank",
																size: "small"
															}, {
																default: withCtx(() => [createTextVNode("GitHub ↗")]),
																_: 1
															}, 8, ["href"]), createVNode(_component_n_button, {
																type: "primary",
																ghost: "",
																size: "tiny",
																tag: "a",
																href: proj.demo,
																target: "_blank"
															}, {
																default: withCtx(() => [createTextVNode("Live Demo")]),
																_: 1
															}, 8, ["href"])])])];
														}),
														_: 2
													}, _parent, _scopeId));
													else return [createVNode(_component_n_card, {
														hoverable: "",
														class: "h-full flex flex-col justify-between shadow-xs rounded-xl border border-slate-200"
													}, {
														default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
															createVNode("div", { class: "flex justify-between items-start" }, [createVNode(_component_n_tag, {
																type: proj.typeColor,
																size: "small"
															}, {
																default: withCtx(() => [createTextVNode(toDisplayString(proj.category), 1)]),
																_: 2
															}, 1032, ["type"]), createVNode("span", { class: "text-xs text-slate-400" }, toDisplayString(proj.year), 1)]),
															createVNode("h4", { class: "font-bold text-slate-900 text-base" }, toDisplayString(proj.title), 1),
															createVNode("p", { class: "text-xs text-slate-600 leading-relaxed" }, toDisplayString(proj.description), 1)
														]), createVNode("div", { class: "pt-4 mt-4 border-t border-slate-100 space-y-3" }, [createVNode("div", { class: "flex flex-wrap gap-1" }, [(openBlock(true), createBlock(Fragment, null, renderList(proj.techs, (tech) => {
															return openBlock(), createBlock(_component_n_tag, {
																key: tech,
																size: "tiny",
																type: "default",
																ghost: ""
															}, {
																default: withCtx(() => [createTextVNode(toDisplayString(tech), 1)]),
																_: 2
															}, 1024);
														}), 128))]), createVNode("div", { class: "flex justify-between items-center pt-1" }, [createVNode(_component_n_button, {
															text: "",
															tag: "a",
															href: proj.github,
															target: "_blank",
															size: "small"
														}, {
															default: withCtx(() => [createTextVNode("GitHub ↗")]),
															_: 1
														}, 8, ["href"]), createVNode(_component_n_button, {
															type: "primary",
															ghost: "",
															size: "tiny",
															tag: "a",
															href: proj.demo,
															target: "_blank"
														}, {
															default: withCtx(() => [createTextVNode("Live Demo")]),
															_: 1
														}, 8, ["href"])])])]),
														_: 2
													}, 1024)];
												}),
												_: 2
											}, _parent, _scopeId));
										});
										_push(`<!--]-->`);
									} else return [(openBlock(true), createBlock(Fragment, null, renderList($setup.featuredProjects, (proj) => {
										return openBlock(), createBlock(_component_n_gi, {
											key: proj.title,
											span: 12,
											m: 6,
											l: 4
										}, {
											default: withCtx(() => [createVNode(_component_n_card, {
												hoverable: "",
												class: "h-full flex flex-col justify-between shadow-xs rounded-xl border border-slate-200"
											}, {
												default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
													createVNode("div", { class: "flex justify-between items-start" }, [createVNode(_component_n_tag, {
														type: proj.typeColor,
														size: "small"
													}, {
														default: withCtx(() => [createTextVNode(toDisplayString(proj.category), 1)]),
														_: 2
													}, 1032, ["type"]), createVNode("span", { class: "text-xs text-slate-400" }, toDisplayString(proj.year), 1)]),
													createVNode("h4", { class: "font-bold text-slate-900 text-base" }, toDisplayString(proj.title), 1),
													createVNode("p", { class: "text-xs text-slate-600 leading-relaxed" }, toDisplayString(proj.description), 1)
												]), createVNode("div", { class: "pt-4 mt-4 border-t border-slate-100 space-y-3" }, [createVNode("div", { class: "flex flex-wrap gap-1" }, [(openBlock(true), createBlock(Fragment, null, renderList(proj.techs, (tech) => {
													return openBlock(), createBlock(_component_n_tag, {
														key: tech,
														size: "tiny",
														type: "default",
														ghost: ""
													}, {
														default: withCtx(() => [createTextVNode(toDisplayString(tech), 1)]),
														_: 2
													}, 1024);
												}), 128))]), createVNode("div", { class: "flex justify-between items-center pt-1" }, [createVNode(_component_n_button, {
													text: "",
													tag: "a",
													href: proj.github,
													target: "_blank",
													size: "small"
												}, {
													default: withCtx(() => [createTextVNode("GitHub ↗")]),
													_: 1
												}, 8, ["href"]), createVNode(_component_n_button, {
													type: "primary",
													ghost: "",
													size: "tiny",
													tag: "a",
													href: proj.demo,
													target: "_blank"
												}, {
													default: withCtx(() => [createTextVNode("Live Demo")]),
													_: 1
												}, 8, ["href"])])])]),
												_: 2
											}, 1024)]),
											_: 2
										}, 1024);
									}), 128))];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div></div>`);
						} else return [createVNode("div", { class: "space-y-8 mt-6" }, [createVNode(_component_n_grid, {
							"x-gap": "20",
							"y-gap": "20",
							cols: 12
						}, {
							default: withCtx(() => [createVNode(_component_n_gi, {
								span: 12,
								l: 8
							}, {
								default: withCtx(() => [createVNode(_component_n_card, {
									title: "Education Background",
									class: "h-full shadow-xs rounded-xl"
								}, {
									default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [
										createVNode("div", { class: "border-l-2 border-indigo-600 pl-4 space-y-1" }, [
											createVNode("h4", { class: "font-bold text-slate-900 text-base" }, "Bachelor of Informatics (GPA 3.50/4.00)"),
											createVNode("p", { class: "text-sm font-medium text-indigo-600" }, "Telkom University (2024 - 2026)"),
											createVNode("p", { class: "text-xs text-slate-500" }, "Extension program from Diploma. Thesis: Utilization of Generative AI for Process Discovery in Operational Maintenance Data Electric Power Company")
										]),
										createVNode("div", { class: "border-l-2 border-emerald-600 pl-4 space-y-1" }, [
											createVNode("h4", { class: "font-bold text-slate-900 text-base" }, "Diploma in Software Application Engineering (GPA 3.67/4.00)"),
											createVNode("p", { class: "text-sm font-medium text-emerald-600" }, "Telkom University (2021 - 2024)"),
											createVNode("p", { class: "text-xs text-slate-500" }, "Thesis: MedRecordX - Patient Medical Record Application (Case Study: Telagasari Azimat Clinic)")
										]),
										createVNode("div", { class: "bg-slate-50 p-4 rounded-lg space-y-2" }, [createVNode("span", { class: "text-xs font-semibold text-slate-600 uppercase tracking-wider" }, "Key Tech & Tools"), createVNode("div", { class: "flex flex-wrap gap-1.5 pt-1" }, [
											createVNode(_component_n_tag, {
												size: "small",
												bordered: false
											}, {
												default: withCtx(() => [createTextVNode("JavaScript")]),
												_: 1
											}),
											createVNode(_component_n_tag, {
												size: "small",
												bordered: false
											}, {
												default: withCtx(() => [createTextVNode("ReactJS")]),
												_: 1
											}),
											createVNode(_component_n_tag, {
												size: "small",
												bordered: false
											}, {
												default: withCtx(() => [createTextVNode("Vue.js")]),
												_: 1
											}),
											createVNode(_component_n_tag, {
												size: "small",
												bordered: false
											}, {
												default: withCtx(() => [createTextVNode("Python")]),
												_: 1
											}),
											createVNode(_component_n_tag, {
												size: "small",
												bordered: false
											}, {
												default: withCtx(() => [createTextVNode("PHP")]),
												_: 1
											}),
											createVNode(_component_n_tag, {
												size: "small",
												bordered: false
											}, {
												default: withCtx(() => [createTextVNode("MySQL")]),
												_: 1
											})
										])])
									])]),
									_: 1
								})]),
								_: 1
							}), createVNode(_component_n_gi, {
								span: 12,
								l: 4
							}, {
								default: withCtx(() => [createVNode(_component_n_card, {
									title: "Core Competencies",
									class: "h-full shadow-xs rounded-xl"
								}, {
									default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
										createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "Frontend (Vue / React / TS)"), createVNode("span", null, "92%")]), createVNode(_component_n_progress, {
											type: "line",
											percentage: 92,
											"show-indicator": false,
											color: "#6366f1"
										})]),
										createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "Backend (Node / Python / SQL)"), createVNode("span", null, "88%")]), createVNode(_component_n_progress, {
											type: "line",
											percentage: 88,
											"show-indicator": false,
											color: "#8b5cf6"
										})]),
										createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "Cloud & DevOps (Docker / Git)"), createVNode("span", null, "80%")]), createVNode(_component_n_progress, {
											type: "line",
											percentage: 80,
											"show-indicator": false,
											color: "#ec4899"
										})]),
										createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "System Architecture"), createVNode("span", null, "85%")]), createVNode(_component_n_progress, {
											type: "line",
											percentage: 85,
											"show-indicator": false,
											color: "#06b6d4"
										})])
									])]),
									_: 1
								})]),
								_: 1
							})]),
							_: 1
						}), createVNode("div", null, [createVNode("div", { class: "flex justify-between items-center mb-4" }, [createVNode("h3", { class: "text-xl font-bold text-slate-900" }, "Featured Capstone Projects (Fetched via API)")]), createVNode(_component_n_grid, {
							"x-gap": "20",
							"y-gap": "20",
							cols: 12
						}, {
							default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList($setup.featuredProjects, (proj) => {
								return openBlock(), createBlock(_component_n_gi, {
									key: proj.title,
									span: 12,
									m: 6,
									l: 4
								}, {
									default: withCtx(() => [createVNode(_component_n_card, {
										hoverable: "",
										class: "h-full flex flex-col justify-between shadow-xs rounded-xl border border-slate-200"
									}, {
										default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
											createVNode("div", { class: "flex justify-between items-start" }, [createVNode(_component_n_tag, {
												type: proj.typeColor,
												size: "small"
											}, {
												default: withCtx(() => [createTextVNode(toDisplayString(proj.category), 1)]),
												_: 2
											}, 1032, ["type"]), createVNode("span", { class: "text-xs text-slate-400" }, toDisplayString(proj.year), 1)]),
											createVNode("h4", { class: "font-bold text-slate-900 text-base" }, toDisplayString(proj.title), 1),
											createVNode("p", { class: "text-xs text-slate-600 leading-relaxed" }, toDisplayString(proj.description), 1)
										]), createVNode("div", { class: "pt-4 mt-4 border-t border-slate-100 space-y-3" }, [createVNode("div", { class: "flex flex-wrap gap-1" }, [(openBlock(true), createBlock(Fragment, null, renderList(proj.techs, (tech) => {
											return openBlock(), createBlock(_component_n_tag, {
												key: tech,
												size: "tiny",
												type: "default",
												ghost: ""
											}, {
												default: withCtx(() => [createTextVNode(toDisplayString(tech), 1)]),
												_: 2
											}, 1024);
										}), 128))]), createVNode("div", { class: "flex justify-between items-center pt-1" }, [createVNode(_component_n_button, {
											text: "",
											tag: "a",
											href: proj.github,
											target: "_blank",
											size: "small"
										}, {
											default: withCtx(() => [createTextVNode("GitHub ↗")]),
											_: 1
										}, 8, ["href"]), createVNode(_component_n_button, {
											type: "primary",
											ghost: "",
											size: "tiny",
											tag: "a",
											href: proj.demo,
											target: "_blank"
										}, {
											default: withCtx(() => [createTextVNode("Live Demo")]),
											_: 1
										}, 8, ["href"])])])]),
										_: 2
									}, 1024)]),
									_: 2
								}, 1024);
							}), 128))]),
							_: 1
						})])])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_n_tab_pane, {
					name: "projects",
					tab: "Projects Portfolio"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="space-y-6 mt-6"${_scopeId}><div class="flex flex-wrap gap-2 items-center justify-between"${_scopeId}><h3 class="text-xl font-bold text-slate-900"${_scopeId}>All Backend-Connected Projects</h3><div class="flex gap-2"${_scopeId}><!--[-->`);
							ssrRenderList($setup.categories, (cat) => {
								_push(ssrRenderComponent(_component_n_button, {
									key: cat,
									size: "small",
									type: $setup.selectedCategory === cat ? "primary" : "default",
									onClick: ($event) => $setup.selectedCategory = cat
								}, {
									default: withCtx((_, _push, _parent, _scopeId) => {
										if (_push) _push(`${ssrInterpolate(cat)}`);
										else return [createTextVNode(toDisplayString(cat), 1)];
									}),
									_: 2
								}, _parent, _scopeId));
							});
							_push(`<!--]--></div></div>`);
							_push(ssrRenderComponent(_component_n_grid, {
								"x-gap": "20",
								"y-gap": "20",
								cols: 12
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(`<!--[-->`);
										ssrRenderList($setup.filteredProjects, (proj) => {
											_push(ssrRenderComponent(_component_n_gi, {
												key: proj.title,
												span: 12,
												m: 6,
												l: 4
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_n_card, {
														class: "h-full flex flex-col justify-between shadow-xs rounded-xl border border-slate-200",
														hoverable: ""
													}, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) {
																_push(`<div class="space-y-3"${_scopeId}><div class="flex justify-between items-center"${_scopeId}>`);
																_push(ssrRenderComponent(_component_n_tag, {
																	type: proj.typeColor,
																	size: "small"
																}, {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) _push(`${ssrInterpolate(proj.category)}`);
																		else return [createTextVNode(toDisplayString(proj.category), 1)];
																	}),
																	_: 2
																}, _parent, _scopeId));
																_push(`<span class="text-xs text-slate-400 font-mono"${_scopeId}>${ssrInterpolate(proj.metrics)}</span></div><h4 class="font-bold text-slate-900 text-lg"${_scopeId}>${ssrInterpolate(proj.title)}</h4><p class="text-xs text-slate-600 leading-relaxed"${_scopeId}>${ssrInterpolate(proj.description)}</p>`);
																if (proj.highlights) {
																	_push(`<ul class="text-xs text-slate-500 space-y-1 list-disc list-inside pt-1"${_scopeId}><!--[-->`);
																	ssrRenderList(proj.highlights, (hl) => {
																		_push(`<li${_scopeId}>${ssrInterpolate(hl)}</li>`);
																	});
																	_push(`<!--]--></ul>`);
																} else _push(`<!---->`);
																_push(`</div><div class="pt-4 mt-4 border-t border-slate-100 space-y-3"${_scopeId}><div class="flex flex-wrap gap-1"${_scopeId}><!--[-->`);
																ssrRenderList(proj.techs, (tech) => {
																	_push(ssrRenderComponent(_component_n_tag, {
																		key: tech,
																		size: "tiny",
																		type: "info",
																		ghost: ""
																	}, {
																		default: withCtx((_, _push, _parent, _scopeId) => {
																			if (_push) _push(`${ssrInterpolate(tech)}`);
																			else return [createTextVNode(toDisplayString(tech), 1)];
																		}),
																		_: 2
																	}, _parent, _scopeId));
																});
																_push(`<!--]--></div><div class="flex justify-end space-x-2 pt-1"${_scopeId}>`);
																_push(ssrRenderComponent(_component_n_button, {
																	text: "",
																	tag: "a",
																	href: proj.github,
																	target: "_blank",
																	size: "small"
																}, {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) _push(`GitHub`);
																		else return [createTextVNode("GitHub")];
																	}),
																	_: 2
																}, _parent, _scopeId));
																_push(ssrRenderComponent(_component_n_button, {
																	type: "primary",
																	size: "small",
																	tag: "a",
																	href: proj.demo,
																	target: "_blank"
																}, {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) _push(`Demo`);
																		else return [createTextVNode("Demo")];
																	}),
																	_: 2
																}, _parent, _scopeId));
																_push(`</div></div>`);
															} else return [createVNode("div", { class: "space-y-3" }, [
																createVNode("div", { class: "flex justify-between items-center" }, [createVNode(_component_n_tag, {
																	type: proj.typeColor,
																	size: "small"
																}, {
																	default: withCtx(() => [createTextVNode(toDisplayString(proj.category), 1)]),
																	_: 2
																}, 1032, ["type"]), createVNode("span", { class: "text-xs text-slate-400 font-mono" }, toDisplayString(proj.metrics), 1)]),
																createVNode("h4", { class: "font-bold text-slate-900 text-lg" }, toDisplayString(proj.title), 1),
																createVNode("p", { class: "text-xs text-slate-600 leading-relaxed" }, toDisplayString(proj.description), 1),
																proj.highlights ? (openBlock(), createBlock("ul", {
																	key: 0,
																	class: "text-xs text-slate-500 space-y-1 list-disc list-inside pt-1"
																}, [(openBlock(true), createBlock(Fragment, null, renderList(proj.highlights, (hl) => {
																	return openBlock(), createBlock("li", { key: hl }, toDisplayString(hl), 1);
																}), 128))])) : createCommentVNode("", true)
															]), createVNode("div", { class: "pt-4 mt-4 border-t border-slate-100 space-y-3" }, [createVNode("div", { class: "flex flex-wrap gap-1" }, [(openBlock(true), createBlock(Fragment, null, renderList(proj.techs, (tech) => {
																return openBlock(), createBlock(_component_n_tag, {
																	key: tech,
																	size: "tiny",
																	type: "info",
																	ghost: ""
																}, {
																	default: withCtx(() => [createTextVNode(toDisplayString(tech), 1)]),
																	_: 2
																}, 1024);
															}), 128))]), createVNode("div", { class: "flex justify-end space-x-2 pt-1" }, [createVNode(_component_n_button, {
																text: "",
																tag: "a",
																href: proj.github,
																target: "_blank",
																size: "small"
															}, {
																default: withCtx(() => [createTextVNode("GitHub")]),
																_: 1
															}, 8, ["href"]), createVNode(_component_n_button, {
																type: "primary",
																size: "small",
																tag: "a",
																href: proj.demo,
																target: "_blank"
															}, {
																default: withCtx(() => [createTextVNode("Demo")]),
																_: 1
															}, 8, ["href"])])])];
														}),
														_: 2
													}, _parent, _scopeId));
													else return [createVNode(_component_n_card, {
														class: "h-full flex flex-col justify-between shadow-xs rounded-xl border border-slate-200",
														hoverable: ""
													}, {
														default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
															createVNode("div", { class: "flex justify-between items-center" }, [createVNode(_component_n_tag, {
																type: proj.typeColor,
																size: "small"
															}, {
																default: withCtx(() => [createTextVNode(toDisplayString(proj.category), 1)]),
																_: 2
															}, 1032, ["type"]), createVNode("span", { class: "text-xs text-slate-400 font-mono" }, toDisplayString(proj.metrics), 1)]),
															createVNode("h4", { class: "font-bold text-slate-900 text-lg" }, toDisplayString(proj.title), 1),
															createVNode("p", { class: "text-xs text-slate-600 leading-relaxed" }, toDisplayString(proj.description), 1),
															proj.highlights ? (openBlock(), createBlock("ul", {
																key: 0,
																class: "text-xs text-slate-500 space-y-1 list-disc list-inside pt-1"
															}, [(openBlock(true), createBlock(Fragment, null, renderList(proj.highlights, (hl) => {
																return openBlock(), createBlock("li", { key: hl }, toDisplayString(hl), 1);
															}), 128))])) : createCommentVNode("", true)
														]), createVNode("div", { class: "pt-4 mt-4 border-t border-slate-100 space-y-3" }, [createVNode("div", { class: "flex flex-wrap gap-1" }, [(openBlock(true), createBlock(Fragment, null, renderList(proj.techs, (tech) => {
															return openBlock(), createBlock(_component_n_tag, {
																key: tech,
																size: "tiny",
																type: "info",
																ghost: ""
															}, {
																default: withCtx(() => [createTextVNode(toDisplayString(tech), 1)]),
																_: 2
															}, 1024);
														}), 128))]), createVNode("div", { class: "flex justify-end space-x-2 pt-1" }, [createVNode(_component_n_button, {
															text: "",
															tag: "a",
															href: proj.github,
															target: "_blank",
															size: "small"
														}, {
															default: withCtx(() => [createTextVNode("GitHub")]),
															_: 1
														}, 8, ["href"]), createVNode(_component_n_button, {
															type: "primary",
															size: "small",
															tag: "a",
															href: proj.demo,
															target: "_blank"
														}, {
															default: withCtx(() => [createTextVNode("Demo")]),
															_: 1
														}, 8, ["href"])])])]),
														_: 2
													}, 1024)];
												}),
												_: 2
											}, _parent, _scopeId));
										});
										_push(`<!--]-->`);
									} else return [(openBlock(true), createBlock(Fragment, null, renderList($setup.filteredProjects, (proj) => {
										return openBlock(), createBlock(_component_n_gi, {
											key: proj.title,
											span: 12,
											m: 6,
											l: 4
										}, {
											default: withCtx(() => [createVNode(_component_n_card, {
												class: "h-full flex flex-col justify-between shadow-xs rounded-xl border border-slate-200",
												hoverable: ""
											}, {
												default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
													createVNode("div", { class: "flex justify-between items-center" }, [createVNode(_component_n_tag, {
														type: proj.typeColor,
														size: "small"
													}, {
														default: withCtx(() => [createTextVNode(toDisplayString(proj.category), 1)]),
														_: 2
													}, 1032, ["type"]), createVNode("span", { class: "text-xs text-slate-400 font-mono" }, toDisplayString(proj.metrics), 1)]),
													createVNode("h4", { class: "font-bold text-slate-900 text-lg" }, toDisplayString(proj.title), 1),
													createVNode("p", { class: "text-xs text-slate-600 leading-relaxed" }, toDisplayString(proj.description), 1),
													proj.highlights ? (openBlock(), createBlock("ul", {
														key: 0,
														class: "text-xs text-slate-500 space-y-1 list-disc list-inside pt-1"
													}, [(openBlock(true), createBlock(Fragment, null, renderList(proj.highlights, (hl) => {
														return openBlock(), createBlock("li", { key: hl }, toDisplayString(hl), 1);
													}), 128))])) : createCommentVNode("", true)
												]), createVNode("div", { class: "pt-4 mt-4 border-t border-slate-100 space-y-3" }, [createVNode("div", { class: "flex flex-wrap gap-1" }, [(openBlock(true), createBlock(Fragment, null, renderList(proj.techs, (tech) => {
													return openBlock(), createBlock(_component_n_tag, {
														key: tech,
														size: "tiny",
														type: "info",
														ghost: ""
													}, {
														default: withCtx(() => [createTextVNode(toDisplayString(tech), 1)]),
														_: 2
													}, 1024);
												}), 128))]), createVNode("div", { class: "flex justify-end space-x-2 pt-1" }, [createVNode(_component_n_button, {
													text: "",
													tag: "a",
													href: proj.github,
													target: "_blank",
													size: "small"
												}, {
													default: withCtx(() => [createTextVNode("GitHub")]),
													_: 1
												}, 8, ["href"]), createVNode(_component_n_button, {
													type: "primary",
													size: "small",
													tag: "a",
													href: proj.demo,
													target: "_blank"
												}, {
													default: withCtx(() => [createTextVNode("Demo")]),
													_: 1
												}, 8, ["href"])])])]),
												_: 2
											}, 1024)]),
											_: 2
										}, 1024);
									}), 128))];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						} else return [createVNode("div", { class: "space-y-6 mt-6" }, [createVNode("div", { class: "flex flex-wrap gap-2 items-center justify-between" }, [createVNode("h3", { class: "text-xl font-bold text-slate-900" }, "All Backend-Connected Projects"), createVNode("div", { class: "flex gap-2" }, [(openBlock(), createBlock(Fragment, null, renderList($setup.categories, (cat) => {
							return createVNode(_component_n_button, {
								key: cat,
								size: "small",
								type: $setup.selectedCategory === cat ? "primary" : "default",
								onClick: ($event) => $setup.selectedCategory = cat
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(cat), 1)]),
								_: 2
							}, 1032, ["type", "onClick"]);
						}), 64))])]), createVNode(_component_n_grid, {
							"x-gap": "20",
							"y-gap": "20",
							cols: 12
						}, {
							default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList($setup.filteredProjects, (proj) => {
								return openBlock(), createBlock(_component_n_gi, {
									key: proj.title,
									span: 12,
									m: 6,
									l: 4
								}, {
									default: withCtx(() => [createVNode(_component_n_card, {
										class: "h-full flex flex-col justify-between shadow-xs rounded-xl border border-slate-200",
										hoverable: ""
									}, {
										default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
											createVNode("div", { class: "flex justify-between items-center" }, [createVNode(_component_n_tag, {
												type: proj.typeColor,
												size: "small"
											}, {
												default: withCtx(() => [createTextVNode(toDisplayString(proj.category), 1)]),
												_: 2
											}, 1032, ["type"]), createVNode("span", { class: "text-xs text-slate-400 font-mono" }, toDisplayString(proj.metrics), 1)]),
											createVNode("h4", { class: "font-bold text-slate-900 text-lg" }, toDisplayString(proj.title), 1),
											createVNode("p", { class: "text-xs text-slate-600 leading-relaxed" }, toDisplayString(proj.description), 1),
											proj.highlights ? (openBlock(), createBlock("ul", {
												key: 0,
												class: "text-xs text-slate-500 space-y-1 list-disc list-inside pt-1"
											}, [(openBlock(true), createBlock(Fragment, null, renderList(proj.highlights, (hl) => {
												return openBlock(), createBlock("li", { key: hl }, toDisplayString(hl), 1);
											}), 128))])) : createCommentVNode("", true)
										]), createVNode("div", { class: "pt-4 mt-4 border-t border-slate-100 space-y-3" }, [createVNode("div", { class: "flex flex-wrap gap-1" }, [(openBlock(true), createBlock(Fragment, null, renderList(proj.techs, (tech) => {
											return openBlock(), createBlock(_component_n_tag, {
												key: tech,
												size: "tiny",
												type: "info",
												ghost: ""
											}, {
												default: withCtx(() => [createTextVNode(toDisplayString(tech), 1)]),
												_: 2
											}, 1024);
										}), 128))]), createVNode("div", { class: "flex justify-end space-x-2 pt-1" }, [createVNode(_component_n_button, {
											text: "",
											tag: "a",
											href: proj.github,
											target: "_blank",
											size: "small"
										}, {
											default: withCtx(() => [createTextVNode("GitHub")]),
											_: 1
										}, 8, ["href"]), createVNode(_component_n_button, {
											type: "primary",
											size: "small",
											tag: "a",
											href: proj.demo,
											target: "_blank"
										}, {
											default: withCtx(() => [createTextVNode("Demo")]),
											_: 1
										}, 8, ["href"])])])]),
										_: 2
									}, 1024)]),
									_: 2
								}, 1024);
							}), 128))]),
							_: 1
						})])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_n_tab_pane, {
					name: "skills",
					tab: "Skills & Expertise"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="space-y-8 mt-6"${_scopeId}>`);
							_push(ssrRenderComponent(_component_n_grid, {
								"x-gap": "20",
								"y-gap": "20",
								cols: 12
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_n_gi, {
											span: 12,
											l: 6
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_n_card, {
													title: "Frontend & UI Engineering",
													class: "shadow-xs rounded-xl h-full"
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) {
															_push(`<div class="space-y-4"${_scopeId}><!--[-->`);
															ssrRenderList($setup.frontendSkills, (skill) => {
																_push(`<div${_scopeId}><div class="flex justify-between text-sm mb-1 font-medium text-slate-700"${_scopeId}><span${_scopeId}>${ssrInterpolate(skill.name)}</span><span class="text-indigo-600"${_scopeId}>${ssrInterpolate(skill.level)}%</span></div>`);
																_push(ssrRenderComponent(_component_n_progress, {
																	type: "line",
																	percentage: skill.level,
																	"show-indicator": false,
																	color: "#6366f1"
																}, null, _parent, _scopeId));
																_push(`</div>`);
															});
															_push(`<!--]--></div>`);
														} else return [createVNode("div", { class: "space-y-4" }, [(openBlock(), createBlock(Fragment, null, renderList($setup.frontendSkills, (skill) => {
															return createVNode("div", { key: skill.name }, [createVNode("div", { class: "flex justify-between text-sm mb-1 font-medium text-slate-700" }, [createVNode("span", null, toDisplayString(skill.name), 1), createVNode("span", { class: "text-indigo-600" }, toDisplayString(skill.level) + "%", 1)]), createVNode(_component_n_progress, {
																type: "line",
																percentage: skill.level,
																"show-indicator": false,
																color: "#6366f1"
															}, null, 8, ["percentage"])]);
														}), 64))])];
													}),
													_: 1
												}, _parent, _scopeId));
												else return [createVNode(_component_n_card, {
													title: "Frontend & UI Engineering",
													class: "shadow-xs rounded-xl h-full"
												}, {
													default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [(openBlock(), createBlock(Fragment, null, renderList($setup.frontendSkills, (skill) => {
														return createVNode("div", { key: skill.name }, [createVNode("div", { class: "flex justify-between text-sm mb-1 font-medium text-slate-700" }, [createVNode("span", null, toDisplayString(skill.name), 1), createVNode("span", { class: "text-indigo-600" }, toDisplayString(skill.level) + "%", 1)]), createVNode(_component_n_progress, {
															type: "line",
															percentage: skill.level,
															"show-indicator": false,
															color: "#6366f1"
														}, null, 8, ["percentage"])]);
													}), 64))])]),
													_: 1
												})];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_n_gi, {
											span: 12,
											l: 6
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(ssrRenderComponent(_component_n_card, {
													title: "Backend, Database & Cloud",
													class: "shadow-xs rounded-xl h-full"
												}, {
													default: withCtx((_, _push, _parent, _scopeId) => {
														if (_push) {
															_push(`<div class="space-y-4"${_scopeId}><!--[-->`);
															ssrRenderList($setup.backendSkills, (skill) => {
																_push(`<div${_scopeId}><div class="flex justify-between text-sm mb-1 font-medium text-slate-700"${_scopeId}><span${_scopeId}>${ssrInterpolate(skill.name)}</span><span class="text-violet-600"${_scopeId}>${ssrInterpolate(skill.level)}%</span></div>`);
																_push(ssrRenderComponent(_component_n_progress, {
																	type: "line",
																	percentage: skill.level,
																	"show-indicator": false,
																	color: "#8b5cf6"
																}, null, _parent, _scopeId));
																_push(`</div>`);
															});
															_push(`<!--]--></div>`);
														} else return [createVNode("div", { class: "space-y-4" }, [(openBlock(), createBlock(Fragment, null, renderList($setup.backendSkills, (skill) => {
															return createVNode("div", { key: skill.name }, [createVNode("div", { class: "flex justify-between text-sm mb-1 font-medium text-slate-700" }, [createVNode("span", null, toDisplayString(skill.name), 1), createVNode("span", { class: "text-violet-600" }, toDisplayString(skill.level) + "%", 1)]), createVNode(_component_n_progress, {
																type: "line",
																percentage: skill.level,
																"show-indicator": false,
																color: "#8b5cf6"
															}, null, 8, ["percentage"])]);
														}), 64))])];
													}),
													_: 1
												}, _parent, _scopeId));
												else return [createVNode(_component_n_card, {
													title: "Backend, Database & Cloud",
													class: "shadow-xs rounded-xl h-full"
												}, {
													default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [(openBlock(), createBlock(Fragment, null, renderList($setup.backendSkills, (skill) => {
														return createVNode("div", { key: skill.name }, [createVNode("div", { class: "flex justify-between text-sm mb-1 font-medium text-slate-700" }, [createVNode("span", null, toDisplayString(skill.name), 1), createVNode("span", { class: "text-violet-600" }, toDisplayString(skill.level) + "%", 1)]), createVNode(_component_n_progress, {
															type: "line",
															percentage: skill.level,
															"show-indicator": false,
															color: "#8b5cf6"
														}, null, 8, ["percentage"])]);
													}), 64))])]),
													_: 1
												})];
											}),
											_: 1
										}, _parent, _scopeId));
									} else return [createVNode(_component_n_gi, {
										span: 12,
										l: 6
									}, {
										default: withCtx(() => [createVNode(_component_n_card, {
											title: "Frontend & UI Engineering",
											class: "shadow-xs rounded-xl h-full"
										}, {
											default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [(openBlock(), createBlock(Fragment, null, renderList($setup.frontendSkills, (skill) => {
												return createVNode("div", { key: skill.name }, [createVNode("div", { class: "flex justify-between text-sm mb-1 font-medium text-slate-700" }, [createVNode("span", null, toDisplayString(skill.name), 1), createVNode("span", { class: "text-indigo-600" }, toDisplayString(skill.level) + "%", 1)]), createVNode(_component_n_progress, {
													type: "line",
													percentage: skill.level,
													"show-indicator": false,
													color: "#6366f1"
												}, null, 8, ["percentage"])]);
											}), 64))])]),
											_: 1
										})]),
										_: 1
									}), createVNode(_component_n_gi, {
										span: 12,
										l: 6
									}, {
										default: withCtx(() => [createVNode(_component_n_card, {
											title: "Backend, Database & Cloud",
											class: "shadow-xs rounded-xl h-full"
										}, {
											default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [(openBlock(), createBlock(Fragment, null, renderList($setup.backendSkills, (skill) => {
												return createVNode("div", { key: skill.name }, [createVNode("div", { class: "flex justify-between text-sm mb-1 font-medium text-slate-700" }, [createVNode("span", null, toDisplayString(skill.name), 1), createVNode("span", { class: "text-violet-600" }, toDisplayString(skill.level) + "%", 1)]), createVNode(_component_n_progress, {
													type: "line",
													percentage: skill.level,
													"show-indicator": false,
													color: "#8b5cf6"
												}, null, 8, ["percentage"])]);
											}), 64))])]),
											_: 1
										})]),
										_: 1
									})];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(ssrRenderComponent(_component_n_card, {
								title: "Technologies, Tools & Frameworks Ecosystem",
								class: "shadow-xs rounded-xl"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(`<div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
										ssrRenderList($setup.allTools, (tool) => {
											_push(ssrRenderComponent(_component_n_tag, {
												key: tool,
												type: "success",
												size: "medium",
												round: ""
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(`${ssrInterpolate(tool)}`);
													else return [createTextVNode(toDisplayString(tool), 1)];
												}),
												_: 2
											}, _parent, _scopeId));
										});
										_push(`<!--]--></div>`);
									} else return [createVNode("div", { class: "flex flex-wrap gap-2" }, [(openBlock(), createBlock(Fragment, null, renderList($setup.allTools, (tool) => {
										return createVNode(_component_n_tag, {
											key: tool,
											type: "success",
											size: "medium",
											round: ""
										}, {
											default: withCtx(() => [createTextVNode(toDisplayString(tool), 1)]),
											_: 2
										}, 1024);
									}), 64))])];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						} else return [createVNode("div", { class: "space-y-8 mt-6" }, [createVNode(_component_n_grid, {
							"x-gap": "20",
							"y-gap": "20",
							cols: 12
						}, {
							default: withCtx(() => [createVNode(_component_n_gi, {
								span: 12,
								l: 6
							}, {
								default: withCtx(() => [createVNode(_component_n_card, {
									title: "Frontend & UI Engineering",
									class: "shadow-xs rounded-xl h-full"
								}, {
									default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [(openBlock(), createBlock(Fragment, null, renderList($setup.frontendSkills, (skill) => {
										return createVNode("div", { key: skill.name }, [createVNode("div", { class: "flex justify-between text-sm mb-1 font-medium text-slate-700" }, [createVNode("span", null, toDisplayString(skill.name), 1), createVNode("span", { class: "text-indigo-600" }, toDisplayString(skill.level) + "%", 1)]), createVNode(_component_n_progress, {
											type: "line",
											percentage: skill.level,
											"show-indicator": false,
											color: "#6366f1"
										}, null, 8, ["percentage"])]);
									}), 64))])]),
									_: 1
								})]),
								_: 1
							}), createVNode(_component_n_gi, {
								span: 12,
								l: 6
							}, {
								default: withCtx(() => [createVNode(_component_n_card, {
									title: "Backend, Database & Cloud",
									class: "shadow-xs rounded-xl h-full"
								}, {
									default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [(openBlock(), createBlock(Fragment, null, renderList($setup.backendSkills, (skill) => {
										return createVNode("div", { key: skill.name }, [createVNode("div", { class: "flex justify-between text-sm mb-1 font-medium text-slate-700" }, [createVNode("span", null, toDisplayString(skill.name), 1), createVNode("span", { class: "text-violet-600" }, toDisplayString(skill.level) + "%", 1)]), createVNode(_component_n_progress, {
											type: "line",
											percentage: skill.level,
											"show-indicator": false,
											color: "#8b5cf6"
										}, null, 8, ["percentage"])]);
									}), 64))])]),
									_: 1
								})]),
								_: 1
							})]),
							_: 1
						}), createVNode(_component_n_card, {
							title: "Technologies, Tools & Frameworks Ecosystem",
							class: "shadow-xs rounded-xl"
						}, {
							default: withCtx(() => [createVNode("div", { class: "flex flex-wrap gap-2" }, [(openBlock(), createBlock(Fragment, null, renderList($setup.allTools, (tool) => {
								return createVNode(_component_n_tag, {
									key: tool,
									type: "success",
									size: "medium",
									round: ""
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(tool), 1)]),
									_: 2
								}, 1024);
							}), 64))])]),
							_: 1
						})])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_n_tab_pane, {
					name: "experience",
					tab: "Experience & Leadership"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="max-w-3xl mx-auto mt-6 bg-white p-8 rounded-xl shadow-xs border border-slate-200"${_scopeId}><h3 class="text-xl font-bold text-slate-900 mb-6"${_scopeId}>Experience &amp; Academic Milestones</h3>`);
							_push(ssrRenderComponent(_component_n_timeline, null, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(ssrRenderComponent(_component_n_timeline_item, {
											type: "success",
											title: "Programmer Internship",
											content: "Perum Peruri (Jakarta Selatan)",
											time: "Mar 2026 - Jun 2026"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(`<p class="text-xs text-slate-600 mt-1"${_scopeId}> Developing Astro and Vue.js-based SSO frontend with a hybrid architecture (SSR + SPA). Implementing OAuth 2.0 and OpenID Connect (OIDC) API integrations, token exchange, refresh tokens, and access protection. </p>`);
												else return [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Developing Astro and Vue.js-based SSO frontend with a hybrid architecture (SSR + SPA). Implementing OAuth 2.0 and OpenID Connect (OIDC) API integrations, token exchange, refresh tokens, and access protection. ")];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_n_timeline_item, {
											type: "info",
											title: "Programmer Apprenticeship (Cohort React & Backend)",
											content: "Asah Ied by Dicoding (Remote)",
											time: "Aug 2025 - Jan 2026"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(`<p class="text-xs text-slate-600 mt-1"${_scopeId}> Led React frontend and backend integration for a predictive lead scoring web application. Architected backend using Supabase, managing cloud database design, authentication, and ML model integration. </p>`);
												else return [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Led React frontend and backend integration for a predictive lead scoring web application. Architected backend using Supabase, managing cloud database design, authentication, and ML model integration. ")];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_n_timeline_item, {
											type: "warning",
											title: "Programmer Internship",
											content: "Direktorat PuTI Telkom University (Bandung)",
											time: "Feb 2024 - Aug 2024"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(`<p class="text-xs text-slate-600 mt-1"${_scopeId}> Contributed as Frontend Developer to internal academic system. Developed UI for T-Feeder application using AngularJS and supported Neo Feeder PDDIKTI integration with API-based data synchronization. </p>`);
												else return [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Contributed as Frontend Developer to internal academic system. Developed UI for T-Feeder application using AngularJS and supported Neo Feeder PDDIKTI integration with API-based data synchronization. ")];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_n_timeline_item, {
											type: "success",
											title: "Cohort Web Developer",
											content: "Chevalier Lab (Bandung)",
											time: "Jan 2023 - Jun 2023"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(`<p class="text-xs text-slate-600 mt-1"${_scopeId}> Engaged in technical study group on Laravel to deepen understanding of modern web application development, backend logic, and database management. </p>`);
												else return [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Engaged in technical study group on Laravel to deepen understanding of modern web application development, backend logic, and database management. ")];
											}),
											_: 1
										}, _parent, _scopeId));
										_push(ssrRenderComponent(_component_n_timeline_item, {
											type: "info",
											title: "Advocacy Department Staff",
											content: "Himpunan Mahasiswa RPLA (Bandung)",
											time: "Sep 2022 - Jan 2023"
										}, {
											default: withCtx((_, _push, _parent, _scopeId) => {
												if (_push) _push(`<p class="text-xs text-slate-600 mt-1"${_scopeId}> Advocated for D3 Application Software Engineering students by providing services, advocacy, and support as a place for complaints. </p>`);
												else return [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Advocated for D3 Application Software Engineering students by providing services, advocacy, and support as a place for complaints. ")];
											}),
											_: 1
										}, _parent, _scopeId));
									} else return [
										createVNode(_component_n_timeline_item, {
											type: "success",
											title: "Programmer Internship",
											content: "Perum Peruri (Jakarta Selatan)",
											time: "Mar 2026 - Jun 2026"
										}, {
											default: withCtx(() => [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Developing Astro and Vue.js-based SSO frontend with a hybrid architecture (SSR + SPA). Implementing OAuth 2.0 and OpenID Connect (OIDC) API integrations, token exchange, refresh tokens, and access protection. ")]),
											_: 1
										}),
										createVNode(_component_n_timeline_item, {
											type: "info",
											title: "Programmer Apprenticeship (Cohort React & Backend)",
											content: "Asah Ied by Dicoding (Remote)",
											time: "Aug 2025 - Jan 2026"
										}, {
											default: withCtx(() => [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Led React frontend and backend integration for a predictive lead scoring web application. Architected backend using Supabase, managing cloud database design, authentication, and ML model integration. ")]),
											_: 1
										}),
										createVNode(_component_n_timeline_item, {
											type: "warning",
											title: "Programmer Internship",
											content: "Direktorat PuTI Telkom University (Bandung)",
											time: "Feb 2024 - Aug 2024"
										}, {
											default: withCtx(() => [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Contributed as Frontend Developer to internal academic system. Developed UI for T-Feeder application using AngularJS and supported Neo Feeder PDDIKTI integration with API-based data synchronization. ")]),
											_: 1
										}),
										createVNode(_component_n_timeline_item, {
											type: "success",
											title: "Cohort Web Developer",
											content: "Chevalier Lab (Bandung)",
											time: "Jan 2023 - Jun 2023"
										}, {
											default: withCtx(() => [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Engaged in technical study group on Laravel to deepen understanding of modern web application development, backend logic, and database management. ")]),
											_: 1
										}),
										createVNode(_component_n_timeline_item, {
											type: "info",
											title: "Advocacy Department Staff",
											content: "Himpunan Mahasiswa RPLA (Bandung)",
											time: "Sep 2022 - Jan 2023"
										}, {
											default: withCtx(() => [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Advocated for D3 Application Software Engineering students by providing services, advocacy, and support as a place for complaints. ")]),
											_: 1
										})
									];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						} else return [createVNode("div", { class: "max-w-3xl mx-auto mt-6 bg-white p-8 rounded-xl shadow-xs border border-slate-200" }, [createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-6" }, "Experience & Academic Milestones"), createVNode(_component_n_timeline, null, {
							default: withCtx(() => [
								createVNode(_component_n_timeline_item, {
									type: "success",
									title: "Programmer Internship",
									content: "Perum Peruri (Jakarta Selatan)",
									time: "Mar 2026 - Jun 2026"
								}, {
									default: withCtx(() => [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Developing Astro and Vue.js-based SSO frontend with a hybrid architecture (SSR + SPA). Implementing OAuth 2.0 and OpenID Connect (OIDC) API integrations, token exchange, refresh tokens, and access protection. ")]),
									_: 1
								}),
								createVNode(_component_n_timeline_item, {
									type: "info",
									title: "Programmer Apprenticeship (Cohort React & Backend)",
									content: "Asah Ied by Dicoding (Remote)",
									time: "Aug 2025 - Jan 2026"
								}, {
									default: withCtx(() => [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Led React frontend and backend integration for a predictive lead scoring web application. Architected backend using Supabase, managing cloud database design, authentication, and ML model integration. ")]),
									_: 1
								}),
								createVNode(_component_n_timeline_item, {
									type: "warning",
									title: "Programmer Internship",
									content: "Direktorat PuTI Telkom University (Bandung)",
									time: "Feb 2024 - Aug 2024"
								}, {
									default: withCtx(() => [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Contributed as Frontend Developer to internal academic system. Developed UI for T-Feeder application using AngularJS and supported Neo Feeder PDDIKTI integration with API-based data synchronization. ")]),
									_: 1
								}),
								createVNode(_component_n_timeline_item, {
									type: "success",
									title: "Cohort Web Developer",
									content: "Chevalier Lab (Bandung)",
									time: "Jan 2023 - Jun 2023"
								}, {
									default: withCtx(() => [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Engaged in technical study group on Laravel to deepen understanding of modern web application development, backend logic, and database management. ")]),
									_: 1
								}),
								createVNode(_component_n_timeline_item, {
									type: "info",
									title: "Advocacy Department Staff",
									content: "Himpunan Mahasiswa RPLA (Bandung)",
									time: "Sep 2022 - Jan 2023"
								}, {
									default: withCtx(() => [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Advocated for D3 Application Software Engineering students by providing services, advocacy, and support as a place for complaints. ")]),
									_: 1
								})
							]),
							_: 1
						})])];
					}),
					_: 1
				}, _parent, _scopeId));
				_push(ssrRenderComponent(_component_n_tab_pane, {
					name: "certs",
					tab: "Certifications & Awards"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="space-y-6 mt-6"${_scopeId}>`);
							_push(ssrRenderComponent(_component_n_grid, {
								"x-gap": "20",
								"y-gap": "20",
								cols: 12
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(`<!--[-->`);
										ssrRenderList($setup.certifications, (cert) => {
											_push(ssrRenderComponent(_component_n_gi, {
												key: cert.title,
												span: 12,
												m: 6,
												l: 4
											}, {
												default: withCtx((_, _push, _parent, _scopeId) => {
													if (_push) _push(ssrRenderComponent(_component_n_card, { class: "h-full shadow-xs rounded-xl border border-slate-200" }, {
														default: withCtx((_, _push, _parent, _scopeId) => {
															if (_push) {
																_push(`<div class="space-y-3"${_scopeId}><div class="flex justify-between items-center"${_scopeId}>`);
																_push(ssrRenderComponent(_component_n_tag, {
																	type: "success",
																	size: "small"
																}, {
																	default: withCtx((_, _push, _parent, _scopeId) => {
																		if (_push) _push(`${ssrInterpolate(cert.issuer)}`);
																		else return [createTextVNode(toDisplayString(cert.issuer), 1)];
																	}),
																	_: 2
																}, _parent, _scopeId));
																_push(`<span class="text-xs text-slate-400"${_scopeId}>${ssrInterpolate(cert.date)}</span></div><h4 class="font-bold text-slate-900 text-base"${_scopeId}>${ssrInterpolate(cert.title)}</h4><p class="text-xs text-slate-600"${_scopeId}>${ssrInterpolate(cert.description)}</p></div>`);
															} else return [createVNode("div", { class: "space-y-3" }, [
																createVNode("div", { class: "flex justify-between items-center" }, [createVNode(_component_n_tag, {
																	type: "success",
																	size: "small"
																}, {
																	default: withCtx(() => [createTextVNode(toDisplayString(cert.issuer), 1)]),
																	_: 2
																}, 1024), createVNode("span", { class: "text-xs text-slate-400" }, toDisplayString(cert.date), 1)]),
																createVNode("h4", { class: "font-bold text-slate-900 text-base" }, toDisplayString(cert.title), 1),
																createVNode("p", { class: "text-xs text-slate-600" }, toDisplayString(cert.description), 1)
															])];
														}),
														_: 2
													}, _parent, _scopeId));
													else return [createVNode(_component_n_card, { class: "h-full shadow-xs rounded-xl border border-slate-200" }, {
														default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
															createVNode("div", { class: "flex justify-between items-center" }, [createVNode(_component_n_tag, {
																type: "success",
																size: "small"
															}, {
																default: withCtx(() => [createTextVNode(toDisplayString(cert.issuer), 1)]),
																_: 2
															}, 1024), createVNode("span", { class: "text-xs text-slate-400" }, toDisplayString(cert.date), 1)]),
															createVNode("h4", { class: "font-bold text-slate-900 text-base" }, toDisplayString(cert.title), 1),
															createVNode("p", { class: "text-xs text-slate-600" }, toDisplayString(cert.description), 1)
														])]),
														_: 2
													}, 1024)];
												}),
												_: 2
											}, _parent, _scopeId));
										});
										_push(`<!--]-->`);
									} else return [(openBlock(), createBlock(Fragment, null, renderList($setup.certifications, (cert) => {
										return createVNode(_component_n_gi, {
											key: cert.title,
											span: 12,
											m: 6,
											l: 4
										}, {
											default: withCtx(() => [createVNode(_component_n_card, { class: "h-full shadow-xs rounded-xl border border-slate-200" }, {
												default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
													createVNode("div", { class: "flex justify-between items-center" }, [createVNode(_component_n_tag, {
														type: "success",
														size: "small"
													}, {
														default: withCtx(() => [createTextVNode(toDisplayString(cert.issuer), 1)]),
														_: 2
													}, 1024), createVNode("span", { class: "text-xs text-slate-400" }, toDisplayString(cert.date), 1)]),
													createVNode("h4", { class: "font-bold text-slate-900 text-base" }, toDisplayString(cert.title), 1),
													createVNode("p", { class: "text-xs text-slate-600" }, toDisplayString(cert.description), 1)
												])]),
												_: 2
											}, 1024)]),
											_: 2
										}, 1024);
									}), 64))];
								}),
								_: 1
							}, _parent, _scopeId));
							_push(`</div>`);
						} else return [createVNode("div", { class: "space-y-6 mt-6" }, [createVNode(_component_n_grid, {
							"x-gap": "20",
							"y-gap": "20",
							cols: 12
						}, {
							default: withCtx(() => [(openBlock(), createBlock(Fragment, null, renderList($setup.certifications, (cert) => {
								return createVNode(_component_n_gi, {
									key: cert.title,
									span: 12,
									m: 6,
									l: 4
								}, {
									default: withCtx(() => [createVNode(_component_n_card, { class: "h-full shadow-xs rounded-xl border border-slate-200" }, {
										default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
											createVNode("div", { class: "flex justify-between items-center" }, [createVNode(_component_n_tag, {
												type: "success",
												size: "small"
											}, {
												default: withCtx(() => [createTextVNode(toDisplayString(cert.issuer), 1)]),
												_: 2
											}, 1024), createVNode("span", { class: "text-xs text-slate-400" }, toDisplayString(cert.date), 1)]),
											createVNode("h4", { class: "font-bold text-slate-900 text-base" }, toDisplayString(cert.title), 1),
											createVNode("p", { class: "text-xs text-slate-600" }, toDisplayString(cert.description), 1)
										])]),
										_: 2
									}, 1024)]),
									_: 2
								}, 1024);
							}), 64))]),
							_: 1
						})])];
					}),
					_: 1
				}, _parent, _scopeId));
			} else return [
				createVNode(_component_n_tab_pane, {
					name: "overview",
					tab: "Overview"
				}, {
					default: withCtx(() => [createVNode("div", { class: "space-y-8 mt-6" }, [createVNode(_component_n_grid, {
						"x-gap": "20",
						"y-gap": "20",
						cols: 12
					}, {
						default: withCtx(() => [createVNode(_component_n_gi, {
							span: 12,
							l: 8
						}, {
							default: withCtx(() => [createVNode(_component_n_card, {
								title: "Education Background",
								class: "h-full shadow-xs rounded-xl"
							}, {
								default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [
									createVNode("div", { class: "border-l-2 border-indigo-600 pl-4 space-y-1" }, [
										createVNode("h4", { class: "font-bold text-slate-900 text-base" }, "Bachelor of Informatics (GPA 3.50/4.00)"),
										createVNode("p", { class: "text-sm font-medium text-indigo-600" }, "Telkom University (2024 - 2026)"),
										createVNode("p", { class: "text-xs text-slate-500" }, "Extension program from Diploma. Thesis: Utilization of Generative AI for Process Discovery in Operational Maintenance Data Electric Power Company")
									]),
									createVNode("div", { class: "border-l-2 border-emerald-600 pl-4 space-y-1" }, [
										createVNode("h4", { class: "font-bold text-slate-900 text-base" }, "Diploma in Software Application Engineering (GPA 3.67/4.00)"),
										createVNode("p", { class: "text-sm font-medium text-emerald-600" }, "Telkom University (2021 - 2024)"),
										createVNode("p", { class: "text-xs text-slate-500" }, "Thesis: MedRecordX - Patient Medical Record Application (Case Study: Telagasari Azimat Clinic)")
									]),
									createVNode("div", { class: "bg-slate-50 p-4 rounded-lg space-y-2" }, [createVNode("span", { class: "text-xs font-semibold text-slate-600 uppercase tracking-wider" }, "Key Tech & Tools"), createVNode("div", { class: "flex flex-wrap gap-1.5 pt-1" }, [
										createVNode(_component_n_tag, {
											size: "small",
											bordered: false
										}, {
											default: withCtx(() => [createTextVNode("JavaScript")]),
											_: 1
										}),
										createVNode(_component_n_tag, {
											size: "small",
											bordered: false
										}, {
											default: withCtx(() => [createTextVNode("ReactJS")]),
											_: 1
										}),
										createVNode(_component_n_tag, {
											size: "small",
											bordered: false
										}, {
											default: withCtx(() => [createTextVNode("Vue.js")]),
											_: 1
										}),
										createVNode(_component_n_tag, {
											size: "small",
											bordered: false
										}, {
											default: withCtx(() => [createTextVNode("Python")]),
											_: 1
										}),
										createVNode(_component_n_tag, {
											size: "small",
											bordered: false
										}, {
											default: withCtx(() => [createTextVNode("PHP")]),
											_: 1
										}),
										createVNode(_component_n_tag, {
											size: "small",
											bordered: false
										}, {
											default: withCtx(() => [createTextVNode("MySQL")]),
											_: 1
										})
									])])
								])]),
								_: 1
							})]),
							_: 1
						}), createVNode(_component_n_gi, {
							span: 12,
							l: 4
						}, {
							default: withCtx(() => [createVNode(_component_n_card, {
								title: "Core Competencies",
								class: "h-full shadow-xs rounded-xl"
							}, {
								default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
									createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "Frontend (Vue / React / TS)"), createVNode("span", null, "92%")]), createVNode(_component_n_progress, {
										type: "line",
										percentage: 92,
										"show-indicator": false,
										color: "#6366f1"
									})]),
									createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "Backend (Node / Python / SQL)"), createVNode("span", null, "88%")]), createVNode(_component_n_progress, {
										type: "line",
										percentage: 88,
										"show-indicator": false,
										color: "#8b5cf6"
									})]),
									createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "Cloud & DevOps (Docker / Git)"), createVNode("span", null, "80%")]), createVNode(_component_n_progress, {
										type: "line",
										percentage: 80,
										"show-indicator": false,
										color: "#ec4899"
									})]),
									createVNode("div", null, [createVNode("div", { class: "flex justify-between text-xs mb-1 font-medium text-slate-700" }, [createVNode("span", null, "System Architecture"), createVNode("span", null, "85%")]), createVNode(_component_n_progress, {
										type: "line",
										percentage: 85,
										"show-indicator": false,
										color: "#06b6d4"
									})])
								])]),
								_: 1
							})]),
							_: 1
						})]),
						_: 1
					}), createVNode("div", null, [createVNode("div", { class: "flex justify-between items-center mb-4" }, [createVNode("h3", { class: "text-xl font-bold text-slate-900" }, "Featured Capstone Projects (Fetched via API)")]), createVNode(_component_n_grid, {
						"x-gap": "20",
						"y-gap": "20",
						cols: 12
					}, {
						default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList($setup.featuredProjects, (proj) => {
							return openBlock(), createBlock(_component_n_gi, {
								key: proj.title,
								span: 12,
								m: 6,
								l: 4
							}, {
								default: withCtx(() => [createVNode(_component_n_card, {
									hoverable: "",
									class: "h-full flex flex-col justify-between shadow-xs rounded-xl border border-slate-200"
								}, {
									default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
										createVNode("div", { class: "flex justify-between items-start" }, [createVNode(_component_n_tag, {
											type: proj.typeColor,
											size: "small"
										}, {
											default: withCtx(() => [createTextVNode(toDisplayString(proj.category), 1)]),
											_: 2
										}, 1032, ["type"]), createVNode("span", { class: "text-xs text-slate-400" }, toDisplayString(proj.year), 1)]),
										createVNode("h4", { class: "font-bold text-slate-900 text-base" }, toDisplayString(proj.title), 1),
										createVNode("p", { class: "text-xs text-slate-600 leading-relaxed" }, toDisplayString(proj.description), 1)
									]), createVNode("div", { class: "pt-4 mt-4 border-t border-slate-100 space-y-3" }, [createVNode("div", { class: "flex flex-wrap gap-1" }, [(openBlock(true), createBlock(Fragment, null, renderList(proj.techs, (tech) => {
										return openBlock(), createBlock(_component_n_tag, {
											key: tech,
											size: "tiny",
											type: "default",
											ghost: ""
										}, {
											default: withCtx(() => [createTextVNode(toDisplayString(tech), 1)]),
											_: 2
										}, 1024);
									}), 128))]), createVNode("div", { class: "flex justify-between items-center pt-1" }, [createVNode(_component_n_button, {
										text: "",
										tag: "a",
										href: proj.github,
										target: "_blank",
										size: "small"
									}, {
										default: withCtx(() => [createTextVNode("GitHub ↗")]),
										_: 1
									}, 8, ["href"]), createVNode(_component_n_button, {
										type: "primary",
										ghost: "",
										size: "tiny",
										tag: "a",
										href: proj.demo,
										target: "_blank"
									}, {
										default: withCtx(() => [createTextVNode("Live Demo")]),
										_: 1
									}, 8, ["href"])])])]),
									_: 2
								}, 1024)]),
								_: 2
							}, 1024);
						}), 128))]),
						_: 1
					})])])]),
					_: 1
				}),
				createVNode(_component_n_tab_pane, {
					name: "projects",
					tab: "Projects Portfolio"
				}, {
					default: withCtx(() => [createVNode("div", { class: "space-y-6 mt-6" }, [createVNode("div", { class: "flex flex-wrap gap-2 items-center justify-between" }, [createVNode("h3", { class: "text-xl font-bold text-slate-900" }, "All Backend-Connected Projects"), createVNode("div", { class: "flex gap-2" }, [(openBlock(), createBlock(Fragment, null, renderList($setup.categories, (cat) => {
						return createVNode(_component_n_button, {
							key: cat,
							size: "small",
							type: $setup.selectedCategory === cat ? "primary" : "default",
							onClick: ($event) => $setup.selectedCategory = cat
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(cat), 1)]),
							_: 2
						}, 1032, ["type", "onClick"]);
					}), 64))])]), createVNode(_component_n_grid, {
						"x-gap": "20",
						"y-gap": "20",
						cols: 12
					}, {
						default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList($setup.filteredProjects, (proj) => {
							return openBlock(), createBlock(_component_n_gi, {
								key: proj.title,
								span: 12,
								m: 6,
								l: 4
							}, {
								default: withCtx(() => [createVNode(_component_n_card, {
									class: "h-full flex flex-col justify-between shadow-xs rounded-xl border border-slate-200",
									hoverable: ""
								}, {
									default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
										createVNode("div", { class: "flex justify-between items-center" }, [createVNode(_component_n_tag, {
											type: proj.typeColor,
											size: "small"
										}, {
											default: withCtx(() => [createTextVNode(toDisplayString(proj.category), 1)]),
											_: 2
										}, 1032, ["type"]), createVNode("span", { class: "text-xs text-slate-400 font-mono" }, toDisplayString(proj.metrics), 1)]),
										createVNode("h4", { class: "font-bold text-slate-900 text-lg" }, toDisplayString(proj.title), 1),
										createVNode("p", { class: "text-xs text-slate-600 leading-relaxed" }, toDisplayString(proj.description), 1),
										proj.highlights ? (openBlock(), createBlock("ul", {
											key: 0,
											class: "text-xs text-slate-500 space-y-1 list-disc list-inside pt-1"
										}, [(openBlock(true), createBlock(Fragment, null, renderList(proj.highlights, (hl) => {
											return openBlock(), createBlock("li", { key: hl }, toDisplayString(hl), 1);
										}), 128))])) : createCommentVNode("", true)
									]), createVNode("div", { class: "pt-4 mt-4 border-t border-slate-100 space-y-3" }, [createVNode("div", { class: "flex flex-wrap gap-1" }, [(openBlock(true), createBlock(Fragment, null, renderList(proj.techs, (tech) => {
										return openBlock(), createBlock(_component_n_tag, {
											key: tech,
											size: "tiny",
											type: "info",
											ghost: ""
										}, {
											default: withCtx(() => [createTextVNode(toDisplayString(tech), 1)]),
											_: 2
										}, 1024);
									}), 128))]), createVNode("div", { class: "flex justify-end space-x-2 pt-1" }, [createVNode(_component_n_button, {
										text: "",
										tag: "a",
										href: proj.github,
										target: "_blank",
										size: "small"
									}, {
										default: withCtx(() => [createTextVNode("GitHub")]),
										_: 1
									}, 8, ["href"]), createVNode(_component_n_button, {
										type: "primary",
										size: "small",
										tag: "a",
										href: proj.demo,
										target: "_blank"
									}, {
										default: withCtx(() => [createTextVNode("Demo")]),
										_: 1
									}, 8, ["href"])])])]),
									_: 2
								}, 1024)]),
								_: 2
							}, 1024);
						}), 128))]),
						_: 1
					})])]),
					_: 1
				}),
				createVNode(_component_n_tab_pane, {
					name: "skills",
					tab: "Skills & Expertise"
				}, {
					default: withCtx(() => [createVNode("div", { class: "space-y-8 mt-6" }, [createVNode(_component_n_grid, {
						"x-gap": "20",
						"y-gap": "20",
						cols: 12
					}, {
						default: withCtx(() => [createVNode(_component_n_gi, {
							span: 12,
							l: 6
						}, {
							default: withCtx(() => [createVNode(_component_n_card, {
								title: "Frontend & UI Engineering",
								class: "shadow-xs rounded-xl h-full"
							}, {
								default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [(openBlock(), createBlock(Fragment, null, renderList($setup.frontendSkills, (skill) => {
									return createVNode("div", { key: skill.name }, [createVNode("div", { class: "flex justify-between text-sm mb-1 font-medium text-slate-700" }, [createVNode("span", null, toDisplayString(skill.name), 1), createVNode("span", { class: "text-indigo-600" }, toDisplayString(skill.level) + "%", 1)]), createVNode(_component_n_progress, {
										type: "line",
										percentage: skill.level,
										"show-indicator": false,
										color: "#6366f1"
									}, null, 8, ["percentage"])]);
								}), 64))])]),
								_: 1
							})]),
							_: 1
						}), createVNode(_component_n_gi, {
							span: 12,
							l: 6
						}, {
							default: withCtx(() => [createVNode(_component_n_card, {
								title: "Backend, Database & Cloud",
								class: "shadow-xs rounded-xl h-full"
							}, {
								default: withCtx(() => [createVNode("div", { class: "space-y-4" }, [(openBlock(), createBlock(Fragment, null, renderList($setup.backendSkills, (skill) => {
									return createVNode("div", { key: skill.name }, [createVNode("div", { class: "flex justify-between text-sm mb-1 font-medium text-slate-700" }, [createVNode("span", null, toDisplayString(skill.name), 1), createVNode("span", { class: "text-violet-600" }, toDisplayString(skill.level) + "%", 1)]), createVNode(_component_n_progress, {
										type: "line",
										percentage: skill.level,
										"show-indicator": false,
										color: "#8b5cf6"
									}, null, 8, ["percentage"])]);
								}), 64))])]),
								_: 1
							})]),
							_: 1
						})]),
						_: 1
					}), createVNode(_component_n_card, {
						title: "Technologies, Tools & Frameworks Ecosystem",
						class: "shadow-xs rounded-xl"
					}, {
						default: withCtx(() => [createVNode("div", { class: "flex flex-wrap gap-2" }, [(openBlock(), createBlock(Fragment, null, renderList($setup.allTools, (tool) => {
							return createVNode(_component_n_tag, {
								key: tool,
								type: "success",
								size: "medium",
								round: ""
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(tool), 1)]),
								_: 2
							}, 1024);
						}), 64))])]),
						_: 1
					})])]),
					_: 1
				}),
				createVNode(_component_n_tab_pane, {
					name: "experience",
					tab: "Experience & Leadership"
				}, {
					default: withCtx(() => [createVNode("div", { class: "max-w-3xl mx-auto mt-6 bg-white p-8 rounded-xl shadow-xs border border-slate-200" }, [createVNode("h3", { class: "text-xl font-bold text-slate-900 mb-6" }, "Experience & Academic Milestones"), createVNode(_component_n_timeline, null, {
						default: withCtx(() => [
							createVNode(_component_n_timeline_item, {
								type: "success",
								title: "Programmer Internship",
								content: "Perum Peruri (Jakarta Selatan)",
								time: "Mar 2026 - Jun 2026"
							}, {
								default: withCtx(() => [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Developing Astro and Vue.js-based SSO frontend with a hybrid architecture (SSR + SPA). Implementing OAuth 2.0 and OpenID Connect (OIDC) API integrations, token exchange, refresh tokens, and access protection. ")]),
								_: 1
							}),
							createVNode(_component_n_timeline_item, {
								type: "info",
								title: "Programmer Apprenticeship (Cohort React & Backend)",
								content: "Asah Ied by Dicoding (Remote)",
								time: "Aug 2025 - Jan 2026"
							}, {
								default: withCtx(() => [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Led React frontend and backend integration for a predictive lead scoring web application. Architected backend using Supabase, managing cloud database design, authentication, and ML model integration. ")]),
								_: 1
							}),
							createVNode(_component_n_timeline_item, {
								type: "warning",
								title: "Programmer Internship",
								content: "Direktorat PuTI Telkom University (Bandung)",
								time: "Feb 2024 - Aug 2024"
							}, {
								default: withCtx(() => [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Contributed as Frontend Developer to internal academic system. Developed UI for T-Feeder application using AngularJS and supported Neo Feeder PDDIKTI integration with API-based data synchronization. ")]),
								_: 1
							}),
							createVNode(_component_n_timeline_item, {
								type: "success",
								title: "Cohort Web Developer",
								content: "Chevalier Lab (Bandung)",
								time: "Jan 2023 - Jun 2023"
							}, {
								default: withCtx(() => [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Engaged in technical study group on Laravel to deepen understanding of modern web application development, backend logic, and database management. ")]),
								_: 1
							}),
							createVNode(_component_n_timeline_item, {
								type: "info",
								title: "Advocacy Department Staff",
								content: "Himpunan Mahasiswa RPLA (Bandung)",
								time: "Sep 2022 - Jan 2023"
							}, {
								default: withCtx(() => [createVNode("p", { class: "text-xs text-slate-600 mt-1" }, " Advocated for D3 Application Software Engineering students by providing services, advocacy, and support as a place for complaints. ")]),
								_: 1
							})
						]),
						_: 1
					})])]),
					_: 1
				}),
				createVNode(_component_n_tab_pane, {
					name: "certs",
					tab: "Certifications & Awards"
				}, {
					default: withCtx(() => [createVNode("div", { class: "space-y-6 mt-6" }, [createVNode(_component_n_grid, {
						"x-gap": "20",
						"y-gap": "20",
						cols: 12
					}, {
						default: withCtx(() => [(openBlock(), createBlock(Fragment, null, renderList($setup.certifications, (cert) => {
							return createVNode(_component_n_gi, {
								key: cert.title,
								span: 12,
								m: 6,
								l: 4
							}, {
								default: withCtx(() => [createVNode(_component_n_card, { class: "h-full shadow-xs rounded-xl border border-slate-200" }, {
									default: withCtx(() => [createVNode("div", { class: "space-y-3" }, [
										createVNode("div", { class: "flex justify-between items-center" }, [createVNode(_component_n_tag, {
											type: "success",
											size: "small"
										}, {
											default: withCtx(() => [createTextVNode(toDisplayString(cert.issuer), 1)]),
											_: 2
										}, 1024), createVNode("span", { class: "text-xs text-slate-400" }, toDisplayString(cert.date), 1)]),
										createVNode("h4", { class: "font-bold text-slate-900 text-base" }, toDisplayString(cert.title), 1),
										createVNode("p", { class: "text-xs text-slate-600" }, toDisplayString(cert.description), 1)
									])]),
									_: 2
								}, 1024)]),
								_: 2
							}, 1024);
						}), 64))]),
						_: 1
					})])]),
					_: 1
				})
			];
		}),
		_: 1
	}, _parent));
	_push(`</main>`);
	_push(ssrRenderComponent(_component_n_modal, {
		show: $setup.showContactModal,
		"onUpdate:show": ($event) => $setup.showContactModal = $event,
		preset: "card",
		title: "Get in Touch with Sakha",
		class: "max-w-lg"
	}, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(ssrRenderComponent(_component_n_form, {
				ref: "contactFormRef",
				model: $setup.contactForm,
				rules: $setup.contactRules,
				class: "space-y-4"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_n_form_item, {
							label: "Your Name",
							path: "name"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_n_input, {
									value: $setup.contactForm.name,
									"onUpdate:value": ($event) => $setup.contactForm.name = $event,
									placeholder: "Enter your full name"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_n_input, {
									value: $setup.contactForm.name,
									"onUpdate:value": ($event) => $setup.contactForm.name = $event,
									placeholder: "Enter your full name"
								}, null, 8, ["value", "onUpdate:value"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_n_form_item, {
							label: "Email Address",
							path: "email"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_n_input, {
									value: $setup.contactForm.email,
									"onUpdate:value": ($event) => $setup.contactForm.email = $event,
									placeholder: "name@company.com"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_n_input, {
									value: $setup.contactForm.email,
									"onUpdate:value": ($event) => $setup.contactForm.email = $event,
									placeholder: "name@company.com"
								}, null, 8, ["value", "onUpdate:value"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_n_form_item, {
							label: "Subject / Role",
							path: "subject"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_n_input, {
									value: $setup.contactForm.subject,
									"onUpdate:value": ($event) => $setup.contactForm.subject = $event,
									placeholder: "Full-time Software Engineer Opportunity"
								}, null, _parent, _scopeId));
								else return [createVNode(_component_n_input, {
									value: $setup.contactForm.subject,
									"onUpdate:value": ($event) => $setup.contactForm.subject = $event,
									placeholder: "Full-time Software Engineer Opportunity"
								}, null, 8, ["value", "onUpdate:value"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_n_form_item, {
							label: "Message",
							path: "message"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(ssrRenderComponent(_component_n_input, {
									value: $setup.contactForm.message,
									"onUpdate:value": ($event) => $setup.contactForm.message = $event,
									type: "textarea",
									placeholder: "Hi Sakha, we would love to invite you for an interview...",
									rows: 4
								}, null, _parent, _scopeId));
								else return [createVNode(_component_n_input, {
									value: $setup.contactForm.message,
									"onUpdate:value": ($event) => $setup.contactForm.message = $event,
									type: "textarea",
									placeholder: "Hi Sakha, we would love to invite you for an interview...",
									rows: 4
								}, null, 8, ["value", "onUpdate:value"])];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<div class="flex justify-end space-x-2 pt-2"${_scopeId}>`);
						_push(ssrRenderComponent(_component_n_button, { onClick: ($event) => $setup.showContactModal = false }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Cancel`);
								else return [createTextVNode("Cancel")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_n_button, {
							type: "primary",
							loading: $setup.submitting,
							onClick: $setup.submitContact
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Send Message`);
								else return [createTextVNode("Send Message")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
					} else return [
						createVNode(_component_n_form_item, {
							label: "Your Name",
							path: "name"
						}, {
							default: withCtx(() => [createVNode(_component_n_input, {
								value: $setup.contactForm.name,
								"onUpdate:value": ($event) => $setup.contactForm.name = $event,
								placeholder: "Enter your full name"
							}, null, 8, ["value", "onUpdate:value"])]),
							_: 1
						}),
						createVNode(_component_n_form_item, {
							label: "Email Address",
							path: "email"
						}, {
							default: withCtx(() => [createVNode(_component_n_input, {
								value: $setup.contactForm.email,
								"onUpdate:value": ($event) => $setup.contactForm.email = $event,
								placeholder: "name@company.com"
							}, null, 8, ["value", "onUpdate:value"])]),
							_: 1
						}),
						createVNode(_component_n_form_item, {
							label: "Subject / Role",
							path: "subject"
						}, {
							default: withCtx(() => [createVNode(_component_n_input, {
								value: $setup.contactForm.subject,
								"onUpdate:value": ($event) => $setup.contactForm.subject = $event,
								placeholder: "Full-time Software Engineer Opportunity"
							}, null, 8, ["value", "onUpdate:value"])]),
							_: 1
						}),
						createVNode(_component_n_form_item, {
							label: "Message",
							path: "message"
						}, {
							default: withCtx(() => [createVNode(_component_n_input, {
								value: $setup.contactForm.message,
								"onUpdate:value": ($event) => $setup.contactForm.message = $event,
								type: "textarea",
								placeholder: "Hi Sakha, we would love to invite you for an interview...",
								rows: 4
							}, null, 8, ["value", "onUpdate:value"])]),
							_: 1
						}),
						createVNode("div", { class: "flex justify-end space-x-2 pt-2" }, [createVNode(_component_n_button, { onClick: ($event) => $setup.showContactModal = false }, {
							default: withCtx(() => [createTextVNode("Cancel")]),
							_: 1
						}, 8, ["onClick"]), createVNode(_component_n_button, {
							type: "primary",
							loading: $setup.submitting,
							onClick: $setup.submitContact
						}, {
							default: withCtx(() => [createTextVNode("Send Message")]),
							_: 1
						}, 8, ["loading"])])
					];
				}),
				_: 1
			}, _parent, _scopeId));
			else return [createVNode(_component_n_form, {
				ref: "contactFormRef",
				model: $setup.contactForm,
				rules: $setup.contactRules,
				class: "space-y-4"
			}, {
				default: withCtx(() => [
					createVNode(_component_n_form_item, {
						label: "Your Name",
						path: "name"
					}, {
						default: withCtx(() => [createVNode(_component_n_input, {
							value: $setup.contactForm.name,
							"onUpdate:value": ($event) => $setup.contactForm.name = $event,
							placeholder: "Enter your full name"
						}, null, 8, ["value", "onUpdate:value"])]),
						_: 1
					}),
					createVNode(_component_n_form_item, {
						label: "Email Address",
						path: "email"
					}, {
						default: withCtx(() => [createVNode(_component_n_input, {
							value: $setup.contactForm.email,
							"onUpdate:value": ($event) => $setup.contactForm.email = $event,
							placeholder: "name@company.com"
						}, null, 8, ["value", "onUpdate:value"])]),
						_: 1
					}),
					createVNode(_component_n_form_item, {
						label: "Subject / Role",
						path: "subject"
					}, {
						default: withCtx(() => [createVNode(_component_n_input, {
							value: $setup.contactForm.subject,
							"onUpdate:value": ($event) => $setup.contactForm.subject = $event,
							placeholder: "Full-time Software Engineer Opportunity"
						}, null, 8, ["value", "onUpdate:value"])]),
						_: 1
					}),
					createVNode(_component_n_form_item, {
						label: "Message",
						path: "message"
					}, {
						default: withCtx(() => [createVNode(_component_n_input, {
							value: $setup.contactForm.message,
							"onUpdate:value": ($event) => $setup.contactForm.message = $event,
							type: "textarea",
							placeholder: "Hi Sakha, we would love to invite you for an interview...",
							rows: 4
						}, null, 8, ["value", "onUpdate:value"])]),
						_: 1
					}),
					createVNode("div", { class: "flex justify-end space-x-2 pt-2" }, [createVNode(_component_n_button, { onClick: ($event) => $setup.showContactModal = false }, {
						default: withCtx(() => [createTextVNode("Cancel")]),
						_: 1
					}, 8, ["onClick"]), createVNode(_component_n_button, {
						type: "primary",
						loading: $setup.submitting,
						onClick: $setup.submitContact
					}, {
						default: withCtx(() => [createTextVNode("Send Message")]),
						_: 1
					}, 8, ["loading"])])
				]),
				_: 1
			}, 8, ["model"])];
		}),
		_: 1
	}, _parent));
	_push(`<footer class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-200 text-center text-xs text-slate-500"><p>© 2026 Sakha Wibisono. Built with Astro, Vue.js, and Naive UI design system.</p></footer></div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/DashboardContent.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var DashboardContent_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
//#endregion
//#region src/components/PortfolioDashboard.vue
var _sfc_main = {
	__name: "PortfolioDashboard",
	setup(__props, { expose: __expose }) {
		__expose();
		const __returned__ = {
			themeOverrides: { common: {
				primaryColor: "#6366f1",
				primaryColorHover: "#4f46e5",
				primaryColorPressed: "#4338ca"
			} },
			get NConfigProvider() {
				return NConfigProvider;
			},
			get NMessageProvider() {
				return NMessageProvider;
			},
			DashboardContent: DashboardContent_default
		};
		Object.defineProperty(__returned__, "__isScriptSetup", {
			enumerable: false,
			value: true
		});
		return __returned__;
	}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(ssrRenderComponent($setup["NConfigProvider"], mergeProps({ "theme-overrides": $setup.themeOverrides }, _attrs), {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(ssrRenderComponent($setup["NMessageProvider"], null, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent($setup["DashboardContent"], null, null, _parent, _scopeId));
					else return [createVNode($setup["DashboardContent"])];
				}),
				_: 1
			}, _parent, _scopeId));
			else return [createVNode($setup["NMessageProvider"], null, {
				default: withCtx(() => [createVNode($setup["DashboardContent"])]),
				_: 1
			})];
		}),
		_: 1
	}, _parent));
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/PortfolioDashboard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var PortfolioDashboard_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sakha Wibisono | Informatics Fresh Graduate & Software Engineer Portfolio" }, { "default": ($$result) => renderTemplate`${renderComponent($$result, "PortfolioDashboard", PortfolioDashboard_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "D:/Project/learn-docker/src/components/PortfolioDashboard.vue",
		"client:component-export": "default"
	})}` })}`;
}, "D:/Project/learn-docker/src/pages/index.astro", void 0);
var $$file = "D:/Project/learn-docker/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
