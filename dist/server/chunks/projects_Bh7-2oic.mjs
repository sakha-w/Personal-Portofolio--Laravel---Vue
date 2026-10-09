import { tt as __exportAll } from "./errors_Co3p8A61.mjs";
import { d as maybeRenderHead, i as renderComponent, u as renderTemplate } from "./server_ofI-S-oh.mjs";
import { t as createComponent } from "./compiler_DHUFtTAy.mjs";
import { t as $$Layout } from "./Layout_CIEVlOJU.mjs";
import { t as ProjectGrid_default } from "./ProjectGrid_hL5n-opN.mjs";
//#region src/pages/projects.astro
var projects_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Projects,
	file: () => $$file,
	url: () => $$url
});
var $$Projects = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Projects | Sakha Wibisono",
		"description": "Project portfolio of Sakha Wibisono with technical case studies."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main id="content" class="shell page"><header class="page-heading"><p class="eyebrow">From coursework to the workplace</p><h1>Things I've worked on.</h1><p>Web applications, team projects, and research. Open a project to see what I worked on and the tools behind it.</p></header>${renderComponent($$result, "ProjectGrid", ProjectGrid_default, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "D:/Project/learn-docker/src/components/ProjectGrid.vue",
		"client:component-export": "default"
	})}</main>` })}`;
}, "D:/Project/learn-docker/src/pages/projects.astro", void 0);
var $$file = "D:/Project/learn-docker/src/pages/projects.astro";
var $$url = "/projects";
//#endregion
//#region \0virtual:astro:page:src/pages/projects@_@astro
var page = () => projects_exports;
//#endregion
export { page };
