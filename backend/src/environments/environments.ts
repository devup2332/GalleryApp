export const environments = {
  PORT: process.env.PORT || 8080,

  DEBUG: process.env.DEBUG || true,

  DB: {
    DB_USERNAME: process.env.DB_USERNAME as string,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT || "5000"),
    DB_NAME: process.env.DB_NAME as string,
  },

  JWT: {
    JWT_SECRET: process.env.JWT_SECRET as string,
  },

  FB: {
    FB_ID: process.env.FB_ID as string,
    FB_SECRET: process.env.FB_SECRET as string,
  },

  CD: {
    CD_API_KEY: process.env.CD_API_KEY,
    CD_API_SECRET: process.env.CD_API_SECRET,
  },

  DEFAULT: {
    PHOTO: process.env.DEFAULT_PHOTO,
  },

  PUSHER: {
    PUSHER_APP_ID: process.env.PUSHER_APP_ID as string,
    PUSHER_KEY: process.env.PUSHER_KEY as string,
    PUSHER_SECRET: process.env.PUSHER_SECRET as string,
  },
};
