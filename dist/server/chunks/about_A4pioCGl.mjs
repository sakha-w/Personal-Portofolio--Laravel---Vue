import { tt as __exportAll } from "./errors_Co3p8A61.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_ofI-S-oh.mjs";
import { t as createComponent } from "./compiler_DHUFtTAy.mjs";
import { t as $$Layout } from "./Layout_CIEVlOJU.mjs";
//#region src/pages/about.astro
var about_exports = /* @__PURE__ */ __exportAll({
	default: () => $$About,
	file: () => $$file,
	url: () => $$url
});
var $$About = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "About | Sakha Wibisono",
		"description": "A little about my path from software engineering student to frontend developer."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main id="content" class="shell page space-y-8"><header class="page-heading"><p class="eyebrow">Beyond the résumé</p><h1>A little about me.</h1><p>I'm Sakha, an Informatics graduate from Telkom University. Most of my work happens somewhere between a design and an API.</p></header><section class="glass-card grid gap-8 p-7 sm:p-10 md:grid-cols-[1.5fr_1fr]" aria-labelledby="story-title"><div class="space-y-5"><h2 id="story-title" class="section-title">From learning the basics<br>to building for real people.</h2><p class="text-muted">I started with a diploma in Software Application Engineering, then continued into the Informatics bachelor's program. My diploma project was MedRecordX, a patient medical record application for Telagasari Azimat Clinic.</p><p class="text-muted">Internships at PuTI Telkom University and Peruri gave me a chance to work on academic tools and sign-on interfaces. At Asah by Dicoding, I led the React frontend and backend integration for a lead-scoring application.</p><p class="text-muted">I'm also learning more about data science. My bachelor's thesis explored using generative AI for process discovery in operational maintenance data.</p><a href="/experience" class="text-link">See where I've worked <svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-up-right"></use></svg></a></div><aside class="space-y-7 border-t border-line pt-7 md:border-t-0 md:border-l md:pt-0 md:pl-8" aria-label="At a glance"><svg class="icon text-accent" aria-hidden="true"><use href="/icons/tabler.svg#school"></use></svg><div><p class="eyebrow mb-2">2024–2026</p><h3 class="font-medium">Bachelor of Informatics</h3><p class="text-sm text-muted">Telkom University · GPA 3.50/4.00</p></div><div><p class="eyebrow mb-2">2021–2024</p><h3 class="font-medium">Diploma in Software Application Engineering</h3><p class="text-sm text-muted">Telkom University · GPA 3.67/4.00</p></div><a href="/education" class="text-link">My education <svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-right"></use></svg></a></aside></section><div class="grid gap-5 md:grid-cols-2"><section class="glass-card p-7 sm:p-9"><p class="eyebrow mb-4"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#code"></use></svg>What I'm interested in</p><h2 class="mb-4 text-xl font-medium">Interfaces that make sense.</h2><p class="text-sm text-muted">Responsive layouts, reusable components, and API integration are the parts of web development I keep coming back to. Authentication and applied AI have been interesting problems to learn from, too.</p></section><section class="glass-card p-7 sm:p-9"><p class="eyebrow mb-4"><svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#briefcase"></use></svg>Outside the project work</p><h2 class="mb-4 text-xl font-medium">Learning with other people.</h2><p class="text-sm text-muted">I joined Chevalier Lab's Laravel study group and served in the RPLA student association's advocacy department. Both were good practice in listening, asking questions, and helping a team move forward.</p></section></div></main>` })}`;
}, "D:/Project/learn-docker/src/pages/about.astro", void 0);
var $$file = "D:/Project/learn-docker/src/pages/about.astro";
var $$url = "/about";
//#endregion
//#region \0virtual:astro:page:src/pages/about@_@astro
var page = () => about_exports;
//#endregion
export { page };
