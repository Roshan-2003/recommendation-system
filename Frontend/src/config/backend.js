const configuredBackendUrl = import.meta.env.VITE_APP_BACKEND_URL?.trim().replace(/\/+$/, '');

function isValidBackendUrl(value) {
    try {
        const url = new URL(value);
        return ['http:', 'https:'].includes(url.protocol) &&
            url.hostname !== 'vercel.com' &&
            url.hostname !== 'www.vercel.com';
    } catch {
        return false;
    }
}

const DEFAULT_BACKEND_URL = 'https://recommendation-system-j2jt.vercel.app';
export const backendUrl = [configuredBackendUrl, DEFAULT_BACKEND_URL].find(isValidBackendUrl) || '';

export const backendConfigurationError =
    'Backend API is not configured. Set VITE_APP_BACKEND_URL to the deployed backend API URL in your hosting settings, then redeploy.';
