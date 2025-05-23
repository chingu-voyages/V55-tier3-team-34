
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import config from "./src/config/config"

const databaseUrl = drizzle(postgres(config.databaseUrl, { ssl: 'require', max: 1 }));

const main = async () => {
    try {
        await migrate(databaseUrl, { migrationsFolder: 'drizzle' });
        console.log('Migration complete');
    } catch (error) {
        console.log(error);
    }
    process.exit(0);
};
main();
