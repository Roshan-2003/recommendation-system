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

const productionOrigin = import.meta.env.PROD ? window.location.origin : '';
export const backendUrl = [configuredBackendUrl, productionOrigin].find(isValidBackendUrl) || '';

export const backendConfigurationError =
    'Backend API is not configured. Set VITE_APP_BACKEND_URL to the deployed backend API URL in your hosting settings, then redeploy.';
