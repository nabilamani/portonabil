import { db } from '../database';
import { profile } from '../database/schema';

export default defineEventHandler(async (event) => {
    try {
        const data = await db.select().from(profile).get();
        return {
            success: true,
            data,
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
