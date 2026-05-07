const envBackendUrl = import.meta.env.VITE_BACKEND_URL;

const isInvalidEnvValue =
  !envBackendUrl ||
  envBackendUrl === "undefined" ||
  envBackendUrl === "null";

export const backendUrl = isInvalidEnvValue
  ? "/api"
  : envBackendUrl.replace(/\/+$/, "");
