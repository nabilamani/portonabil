import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

const config = useRuntimeConfig();

const client = createClient({
    url: config.tursoUrl || 'file:sqlite.db',
    authToken: config.tursoToken,
});

export const db = drizzle(client, { schema });
