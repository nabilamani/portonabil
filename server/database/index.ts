import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import 'dotenv/config'; // Always try to load for CLI tools

const getDBConfig = () => {
    try {
        // This will only work inside Nuxt
        const config = useRuntimeConfig();
        return {
            url: config.tursoUrl,
            token: config.tursoToken
        };
    } catch {
        // Fallback for standalone scripts
        return {
            url: process.env.TURSO_DB_URL,
            token: process.env.TURSO_DB_AUTH_TOKEN
        };
    }
};

const config = getDBConfig();

const client = createClient({
    url: config.url || 'file:sqlite.db',
    authToken: config.token,
});

export const db = drizzle(client, { schema });
