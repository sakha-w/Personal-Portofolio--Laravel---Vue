import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Name, email, and message are required fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Backend logging / processing of contact submission
    console.log('New Contact Submission Received:', { name, email, subject, message, timestamp: new Date().toISOString() });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for reaching out! Your message has been received by Alex Rivera.'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid request payload.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
