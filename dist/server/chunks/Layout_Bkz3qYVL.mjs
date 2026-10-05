import { S as createAstro, f as renderHead, m as createRenderInstruction, p as addAttribute, s as renderSlot, u as renderTemplate } from "./server_Yb4BXgHG.mjs";
import { t as createComponent } from "./compiler_CiuUEj2q.mjs";
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
	const { title, description = "Personal technical portfolio of Sakha Wibisono — Informatics graduate and software developer." } = Astro.props;
	const navLinks = [
		{
			href: "/",
			label: "Home"
		},
		{
			href: "/about",
			label: "About"
		},
		{
			href: "/experience",
			label: "Experience"
		},
		{
			href: "/projects",
			label: "Projects"
		},
		{
			href: "/skills",
			label: "Skills"
		},
		{
			href: "/education",
			label: "Education"
		},
		{
			href: "/certificates",
			label: "Certificates"
		},
		{
			href: "/contact",
			label: "Contact"
		}
	];
	const currentPath = Astro.url.pathname;
	return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.ico"><link rel="canonical"${addAttribute(Astro.url.href, "href")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><title>${title}</title><!-- Typography: Manrope (Primary) + JetBrains Mono (Technical) --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="/src/styles/global.css">${renderHead($$result)}</head><body class="m-0 p-0 min-h-screen flex flex-col justify-between selection:bg-lavender/40 selection:text-ink"><!-- Floating Glass Pill Navbar --><header class="sticky top-4 z-50 px-4 sm:px-6 w-full"><nav class="glass-nav-pill max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between"><div class="flex items-center gap-3"><a href="/" class="group flex items-center gap-2"><span class="font-bold text-ink text-base tracking-tight group-hover:opacity-80 transition-opacity">Sakha<span class="text-[#8d6ee8] font-mono font-medium">.dev</span></span></a></div><div class="hidden md:flex items-center gap-1">${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(["px-3 py-1.5 rounded-full text-xs transition-all duration-200", currentPath === link.href ? "text-ink bg-white shadow-sm border border-white font-medium" : "text-muted hover:text-ink hover:bg-white/50"], "class:list")}>${link.label}</a>`)}</div><a href="/contact" class="hidden sm:inline-flex md:hidden px-3.5 py-1.5 rounded-full text-xs font-semibold glass-button-primary">Contact</a></nav><!-- Mobile Horizontal Scroll Navigation Pill --><div class="md:hidden max-w-lg mx-auto mt-2 px-3 py-1.5 glass-nav-pill flex gap-1 overflow-x-auto no-scrollbar justify-start sm:justify-center">${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(["px-2.5 py-1 rounded-full text-xs whitespace-nowrap transition-all duration-200", currentPath === link.href ? "text-ink bg-white shadow-xs font-medium" : "text-muted hover:text-ink"], "class:list")}>${link.label}</a>`)}</div></header><div class="flex-1">${renderSlot($$result, $$slots["default"])}</div><!-- Footer --><footer class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-8 pb-10 border-t border-[#686A73]/15 w-full text-center"><div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted font-mono"><p>© 2026 Sakha Wibisono — Personal Engineering Showcase</p><div class="flex items-center gap-2"><span class="px-2 py-0.5 rounded-full bg-white/70 border border-white text-ink">Astro</span><span class="px-2 py-0.5 rounded-full bg-white/70 border border-white text-ink">Vue</span><span class="px-2 py-0.5 rounded-full bg-white/70 border border-white text-ink">Laravel</span><span class="px-2 py-0.5 rounded-full bg-white/70 border border-white text-ink">PostgreSQL</span></div></div></footer>${renderScript($$result, "/var/www/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "/var/www/src/layouts/Layout.astro", void 0);
//#endregion
export { $$Layout as t };
