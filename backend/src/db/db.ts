
import config from "../config/config";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as userSchema from "./schema/user"

const sql = neon(config.databaseUrl!);
export const db = drizzle({ client: sql, schema: {...userSchema} });


