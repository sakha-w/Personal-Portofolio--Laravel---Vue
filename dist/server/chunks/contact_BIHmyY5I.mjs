import { t as __exportAll } from "./rolldown-runtime_BBjsoOtd.mjs";
//#region src/pages/api/contact.ts
var contact_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request }) => {
	try {
		const { name, email, subject, message } = await request.json();
		if (!name || !email || !message) return new Response(JSON.stringify({
			success: false,
			error: "Name, email, and message are required fields."
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		console.log("New Contact Submission Received:", {
			name,
			email,
			subject,
			message,
			timestamp: (/* @__PURE__ */ new Date()).toISOString()
		});
		return new Response(JSON.stringify({
			success: true,
			message: "Thank you for reaching out! Your message has been received by Alex Rivera."
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({
			success: false,
			error: "Invalid request payload."
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/contact@_@ts
var page = () => contact_exports;
//#endregion
export { page };
