import { db } from '../database';
import { skills } from '../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const method = getMethod(event);
    const body = await readBody(event);

    if (method === 'POST') {
        await db.insert(skills).values(body);
        return { success: true };
    }

    if (method === 'DELETE') {
        const query = getQuery(event);
        await db.delete(skills).where(eq(skills.id, Number(query.id)));
        return { success: true };
    }
});
