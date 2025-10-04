// Environment configuration utility
// This provides environment variables for the application

interface EnvConfig {
  API_BASE_URL: string;
  APP_ENV: string;
  DEV: boolean;
}

// Get environment configuration
// In Vite, import.meta.env is available at build time
const getEnvConfig = (): EnvConfig => {
  // Default values
  const defaults = {
    API_BASE_URL: 'http://localhost:8080/api/v1',
    APP_ENV: 'development',
    DEV: true,
  };

  // In Vite environment, import.meta.env is available
  if (import.meta?.env) {
    return {
      API_BASE_URL: import.meta.env.VITE_API_BASE_URL || defaults.API_BASE_URL,
      APP_ENV: import.meta.env.VITE_APP_ENV || defaults.APP_ENV,
      DEV: import.meta.env.DEV ?? defaults.DEV,
    };
  }

  // Fallback (shouldn't happen in Vite)
  return defaults;
};

export const env = getEnvConfig();
