import { db } from '../database';
import { experiences } from '../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const method = getMethod(event);
    const body = await readBody(event);

    if (method === 'PATCH') {
        await db.update(experiences).set(body).where(eq(experiences.id, body.id));
        return { success: true };
    }

    if (method === 'POST') {
        const { id, ...data } = body;
        await db.insert(experiences).values(data);
        return { success: true };
    }

    if (method === 'DELETE') {
        const query = getQuery(event);
        await db.delete(experiences).where(eq(experiences.id, Number(query.id)));
        return { success: true };
    }
});
