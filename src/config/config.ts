export const CONFIG = {
  DISCORD: {
    TOKEN: process.env.DISCORD_TOKEN || '',
    APP_ID: process.env.DISCORD_APP_ID || '',
  },
  DB: {
    HOSTNAME: process.env.DB_HOSTNAME || '',
    USERNAME: process.env.DB_USERNAME || '',
    PASSWORD: process.env.DB_PASSWORD || '',
    DATABASE: process.env.DB_DATABASE || '',
    PORT: Number(process.env.DB_PORT || 0),
  },
} as const;

export type Config = typeof CONFIG;
