import { tt as __exportAll } from "./errors_Co3p8A61.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_ofI-S-oh.mjs";
import { t as createComponent } from "./compiler_DHUFtTAy.mjs";
import { t as $$Layout } from "./Layout_DdsfYYDy.mjs";
import { t as ProjectGrid_default } from "./ProjectGrid_hL5n-opN.mjs";
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Sakha Wibisono | Frontend Developer",
		"description": "I'm Sakha, an Informatics graduate from Telkom University. Here are the web projects I've worked on and what I've learned along the way."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main id="content" class="shell page space-y-16"><section class="grid gap-5 lg:grid-cols-[1.7fr_1fr]"><div class="glass-card flex flex-col justify-between p-7 sm:p-12"><p class="eyebrow"><span class="h-1.5 w-1.5 bg-accent" aria-hidden="true"></span>Frontend developer · Informatics graduate</p><div class="my-10 sm:my-14"><h1 class="text-[clamp(2.5rem,5.8vw,4.7rem)] font-medium leading-[1.08] tracking-[-0.055em]">Hi, I'm Sakha.<br>I build things<br><span class="text-accent">for the web.</span></h1><p class="mt-6 max-w-md text-sm text-muted sm:text-base">I turn designs into working interfaces and connect them to the data they need. Recently, that's meant SSO screens, sales dashboards, and academic tools.</p></div><div class="flex flex-wrap gap-3"><a href="/projects" class="button button-primary">See my work <svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-right"></use></svg></a><a href="/contact" class="button"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#mail"></use></svg>Let's talk</a></div></div><aside class="flex flex-col gap-5" aria-label="A little about me"><div class="glass-card flex flex-1 flex-col justify-between gap-8 p-7 sm:p-8"><div class="flex items-center justify-between"><span class="eyebrow">A little context</span><svg class="icon text-accent" aria-hidden="true"><use href="/icons/tabler.svg#school"></use></svg></div><div><h2 class="text-2xl font-medium tracking-tight">Learning by<br>building.</h2><p class="mt-3 text-sm text-muted">From a software engineering diploma to a bachelor's in Informatics at Telkom University. Still curious, still learning.</p></div><a href="/about" class="text-link">More about me <svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-up-right"></use></svg></a></div><div class="glass-card p-7 sm:p-8"><p class="eyebrow"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#briefcase"></use></svg>Most recently</p><h2 class="mt-5 text-lg font-medium">Programmer intern at Peruri</h2><p class="mt-2 text-sm text-muted">Astro, Vue, and the details of getting authentication right.</p><a href="/experience" class="text-link mt-5">My experience <svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-right"></use></svg></a></div></aside></section><section aria-labelledby="work-title"><div class="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p class="eyebrow mb-3">A few things I've worked on</p><h2 id="work-title" class="section-title">Selected work</h2></div><a href="/projects" class="text-link">All projects <svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-up-right"></use></svg></a></div>${renderComponent($$result, "ProjectGrid", ProjectGrid_default, {
		"client:load": true,
		"featured": true,
		"client:component-hydration": "load",
		"client:component-path": "D:/Project/learn-docker/src/components/ProjectGrid.vue",
		"client:component-export": "default"
	})}</section><section class="glass-card flex flex-col justify-between gap-6 p-7 sm:p-10 md:flex-row md:items-center"><div><p class="eyebrow mb-3">Have something in mind?</p><h2 class="section-title">I'd like to hear about it.</h2><p class="mt-3 max-w-lg text-sm text-muted">A role, a project, or a question about my work. Send me a note and we can take it from there.</p></div><a href="/contact" class="button button-primary shrink-0 self-start md:self-auto">Get in touch <svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-up-right"></use></svg></a></section></main>` })}`;
}, "D:/Project/learn-docker/src/pages/index.astro", void 0);
var $$file = "D:/Project/learn-docker/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
