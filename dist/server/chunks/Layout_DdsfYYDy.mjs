import { S as createAstro, f as renderHead, m as createRenderInstruction, p as addAttribute, s as renderSlot, u as renderTemplate } from "./server_ofI-S-oh.mjs";
import { t as createComponent } from "./compiler_DHUFtTAy.mjs";
//#region node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://astro.build");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title, description = "Sakha Wibisono. Informatics graduate building web interfaces with React, Vue, and Astro." } = Astro.props;
	const navLinks = [
		["/", "Home"],
		["/about", "About"],
		["/experience", "Experience"],
		["/projects", "Projects"],
		["/skills", "Skills"],
		["/education", "Education"],
		["/certificates", "Certificates"],
		["/contact", "Contact"]
	];
	const currentPath = Astro.url.pathname.replace(/\/$/, "") || "/";
	const isActive = (href) => currentPath === href || href !== "/" && currentPath.startsWith(`${href}/`);
	return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"${addAttribute(description, "content")}><meta name="theme-color" content="#1b1d20"><link rel="icon" href="/favicon.ico"><link rel="canonical"${addAttribute(new URL(Astro.url.pathname, Astro.site ?? Astro.url.origin), "href")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><title>${title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead($$result)}</head><body class="flex min-h-screen flex-col"><a class="skip-link" href="#content">Skip to content</a><header class="shell sticky top-4 z-50 mt-4"><div class="glass-nav relative flex min-h-16 items-center justify-between gap-4 px-5"><a href="/" class="flex shrink-0 items-center gap-3 font-semibold tracking-tight" aria-label="Sakha Wibisono, home"><span class="pixel-mark" aria-hidden="true">${Array.from({ length: 9 }, () => renderTemplate`<span></span>`)}</span>sakha<span class="-ml-3 text-muted">.w</span></a><nav class="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">${navLinks.map(([href, label]) => renderTemplate`<a${addAttribute(href, "href")} class="nav-link"${addAttribute(isActive(href) ? "page" : void 0, "aria-current")}>${label}</a>`)}</nav><details class="mobile-menu lg:hidden"><summary class="button" aria-label="Navigation menu">Menu <svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#menu"></use></svg></summary><nav class="glass-nav grid grid-cols-2 gap-1" aria-label="Mobile navigation">${navLinks.map(([href, label]) => renderTemplate`<a${addAttribute(href, "href")} class="nav-link"${addAttribute(isActive(href) ? "page" : void 0, "aria-current")}>${label}</a>`)}</nav></details></div></header><div class="flex-1">${renderSlot($$result, $$slots["default"])}</div><footer class="shell flex flex-col justify-between gap-4 border-t border-line py-7 text-xs text-muted sm:flex-row sm:items-center"><p>© ${(/* @__PURE__ */ new Date()).getFullYear()} Sakha Wibisono</p><p>Made with Astro, Vue & a little patience.</p><a href="mailto:sakhawibisono77@gmail.com" class="text-link">Say hello <svg class="icon" aria-hidden="true"><use href="/icons/tabler.svg#arrow-up-right"></use></svg></a></footer>${renderScript($$result, "D:/Project/learn-docker/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "D:/Project/learn-docker/src/layouts/Layout.astro", void 0);
//#endregion
export { $$Layout as t };
