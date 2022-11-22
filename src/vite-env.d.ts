/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_GATEWAY_URL: string;
  VITE_API_URL: string;
  VITE_RTC_URL: string;

  VITE_AUTH0_AUDIENCE: string;
  VITE_AUTH0_CLIENT_ID: string;
  VITE_AUTH0_DOMAIN: string;
  VITE_AUTH0_SCOPE: string;
}
