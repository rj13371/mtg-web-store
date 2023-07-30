require("dotenv").config({ path: ".env" });

module.exports = {
  SECRET: process.env.APP_SECRET,
  DB: process.env.APP_DB,
  PORT: process.env.PORT || process.env.APP_PORT,
  JWTSECRET: process.env.JWTSECRET,
  LANDING_ID: process.env.LANDING_ID,
  LANDING_ID_SMALL: process.env.LANDING_ID_SMALL,
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  OAUTH_CLIENTID: process.env.OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN: process.env.OAUTH_REFRESH_TOKEN,
};
