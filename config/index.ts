export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  database: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET || '123456QWERTY',
    inviteTokenLifeTime: process.env.INVITE_TOKEN_LIFE_TIME || 1000 * 60 * 60 * 24, // 1d
    accessTokenLifeTime: process.env.ACCESS_TOKEN_LIFE_TIME || 1000 * 60 * 60, // 1h
    refreshTokenLifeTime: process.env.REFRESH_TOKEN_LIFE_TIME || 1000 * 60 * 60 * 24 * 7, // 7d
  },
  mail: {
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  },
  client: {
    host: process.env.CLIENT_HOST || 'http://localhost:3000',
  },
});
