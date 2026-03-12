import { db } from '../database';
import { profile } from '../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    await db.update(profile).set(body).where(eq(profile.id, body.id));
    return { success: true };
});
