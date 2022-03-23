export const config: Record<string, string> = {
  NODE_ENV: import.meta.env.VITE_APP_NODE_ENV as string,
  SERVER_HOST: import.meta.env.VITE_APP_SERVER_HOST as string,
};
