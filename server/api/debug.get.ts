import { db } from '../database';
import { profile, projects } from '../database/schema';
import { sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    try {
        const p = await db.select().from(profile).limit(1);
        const projCount = await db.select({ count: sql`count(*)` }).from(projects);
        
        return {
            success: true,
            hasProfile: p.length > 0,
            projectsCount: projCount[0].count,
            config: {
                hasUrl: !!useRuntimeConfig().tursoUrl,
                hasToken: !!useRuntimeConfig().tursoToken
            }
        };
    } catch (e) {
        return {
            success: false,
            error: e.message
        };
    }
});
