import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
//#region src/pages/api/projects.ts
var projects_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async () => {
	return new Response(JSON.stringify({
		success: true,
		data: [
			{
				title: "Predictive Lead Scoring Web App",
				category: "AI & ML",
				typeColor: "success",
				year: "2025 - 2026",
				metrics: "Banking Sales Optimization",
				description: "Led frontend and backend integration for a predictive lead scoring web application to support banking sales optimization in Agile environment.",
				highlights: [
					"React high-fidelity dashboards (sales & admin)",
					"Supabase cloud database & auth",
					"ML model integration for predictive scoring"
				],
				techs: [
					"React",
					"Supabase",
					"Python",
					"JavaScript"
				],
				github: "https://github.com/sakha-wibisono",
				demo: "https://linkedin.com/in/sakha-wibisono"
			},
			{
				title: "SSO Frontend & Authentication System",
				category: "Systems",
				typeColor: "warning",
				year: "2026",
				metrics: "Perum Peruri Internship",
				description: "Developing an Astro and Vue.js-based SSO frontend with a hybrid architecture (SSR + SPA) for optimal performance and modularity.",
				highlights: [
					"OAuth 2.0 and OpenID Connect (OIDC) integration",
					"Token exchange, refresh tokens & session management",
					"Access protection and error handling systems"
				],
				techs: [
					"Astro",
					"Vue.js",
					"OAuth 2.0",
					"OIDC",
					"JavaScript"
				],
				github: "https://github.com/sakha-wibisono",
				demo: "https://linkedin.com/in/sakha-wibisono"
			},
			{
				title: "MedRecordX (Patient Medical Record App)",
				category: "Full Stack",
				typeColor: "info",
				year: "2024",
				metrics: "Diploma Thesis (Telagasari Azimat Clinic)",
				description: "Patient medical record application developed as Diploma Thesis at Telkom University, streamlining clinic data workflows.",
				highlights: [
					"Patient record management",
					"Secure clinical data storage",
					"User-friendly interface for clinic staff"
				],
				techs: [
					"PHP",
					"MySQL",
					"JavaScript",
					"HTML & CSS"
				],
				github: "https://github.com/sakha-wibisono",
				demo: "https://linkedin.com/in/sakha-wibisono"
			},
			{
				title: "T-Feeder Academic System",
				category: "Full Stack",
				typeColor: "info",
				year: "2024",
				metrics: "PuTI Telkom University",
				description: "Contributed to internal academic information system at Direktorat PuTI Telkom University supporting efficient data interaction.",
				highlights: [
					"Developed user interfaces using AngularJS",
					"Neo Feeder PDDIKTI integration with academic system",
					"API-based data synchronization"
				],
				techs: [
					"AngularJS",
					"JavaScript",
					"REST APIs",
					"PHP"
				],
				github: "https://github.com/sakha-wibisono",
				demo: "https://linkedin.com/in/sakha-wibisono"
			},
			{
				title: "Generative AI for Process Discovery",
				category: "AI & ML",
				typeColor: "success",
				year: "2024 - 2026",
				metrics: "Bachelor Thesis",
				description: "Utilization of Generative AI for Process Discovery in Operational Maintenance Data Electric Power Company as Bachelor Thesis.",
				highlights: [
					"Process discovery and mining algorithms",
					"Generative AI analysis on operational maintenance logs",
					"Data science and system architecture integration"
				],
				techs: [
					"Python",
					"Data Science",
					"Generative AI",
					"Machine Learning"
				],
				github: "https://github.com/sakha-wibisono",
				demo: "https://linkedin.com/in/sakha-wibisono"
			}
		]
	}), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/projects@_@ts
var page = () => projects_exports;
//#endregion
export { page };
