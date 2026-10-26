export async function request(url, { method = 'GET', body, signal } = {}) {
    const headers = { Accept: 'application/json' };
    const xsrf = document.cookie.split('; ').find(value => value.startsWith('XSRF-TOKEN='));
    if (xsrf && !['GET', 'HEAD'].includes(method)) headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrf.slice('XSRF-TOKEN='.length));
    if (body !== undefined && !(body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(body);
    }
    const response = await fetch(url, { method, body, signal, headers, credentials: 'same-origin', cache: 'no-store' });
    const payload = response.status === 204 ? null : await response.json().catch(() => ({}));
    if (!response.ok) {
        const messages = {
            401: 'Your session expired. Sign in in a new tab, then try again.',
            403: 'This action is available to the portfolio owner only.',
            413: 'The upload is too large. Each image must be 2 MiB or smaller.',
            419: 'Your session expired. Sign in in a new tab, then try again.',
            429: 'Too many attempts. Please wait a minute and try again.',
        };
        throw Object.assign(new Error(messages[response.status] || (response.status >= 500 ? 'Saving is unavailable right now. Your form has been kept; please try again.' : payload.message) || 'The request failed. Please try again.'), {
            status: response.status, errors: payload.errors || {},
        });
    }
    return payload;
}
