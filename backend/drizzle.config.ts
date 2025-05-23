import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import config from "./src/config/config";

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema',
    dbCredentials: {
        url: config.databaseUrl
    } ,
    dialect: "postgresql",

})
