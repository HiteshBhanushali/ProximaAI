/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
        // url: 'postgresql://ai%20mock%20interview_owner:aQ7GxFrR2qHj@ep-quiet-hat-a5sn0e5z.us-east-2.aws.neon.tech/ai-mock-interview?sslmode=require',
        url: 'postgresql://neondb_owner:npg_XrcsbK7Y2Tgf@ep-green-base-a8sah2c0-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
    },
    out: './drizzle'
};