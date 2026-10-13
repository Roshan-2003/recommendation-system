const configuredBackendUrl = import.meta.env.VITE_APP_BACKEND_URL?.trim().replace(/\/+$/, '');

export const backendUrl = (() => {
    if (!configuredBackendUrl) {
        return '';
    }

    try {
        const url = new URL(configuredBackendUrl);
        if (!['http:', 'https:'].includes(url.protocol) ||
            url.hostname === 'vercel.com' ||
            url.hostname === 'www.vercel.com') {
            return '';
        }
        return configuredBackendUrl;
    } catch {
        return '';
    }
})();

export const backendConfigurationError =
    'Backend API is not configured. Set VITE_APP_BACKEND_URL to the deployed backend API URL in your hosting settings, then redeploy.';
