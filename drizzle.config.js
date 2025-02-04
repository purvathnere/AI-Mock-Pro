/** @type { import("drizzle-kit").Config } */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_v1lc0ynhbUis@ep-long-dawn-a80kph2a-pooler.eastus2.azure.neon.tech/ai-interview?sslmode=require',
    }
  };