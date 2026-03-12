import { db } from '../database';
import { experiences } from '../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    try {
        const method = getMethod(event);
        const body = await readBody(event);

        if (method === 'PATCH') {
            const { id, ...data } = body;
            // Sanitize: hapus properti yang undefined
            const cleanData: any = {};
            Object.keys(data).forEach(key => {
                if (data[key] !== undefined) {
                    cleanData[key] = data[key] === '' ? null : data[key];
                }
            });

            await db.update(experiences)
                .set(cleanData)
                .where(eq(experiences.id, id));
            return { success: true };
        }

        if (method === 'POST') {
            const { id, ...data } = body;
            const cleanData: any = {};
            Object.keys(data).forEach(key => {
                if (data[key] !== undefined) {
                    cleanData[key] = data[key] === '' ? null : data[key];
                }
            });
            await db.insert(experiences).values(cleanData);
            return { success: true };
        }

        if (method === 'DELETE') {
            const query = getQuery(event);
            if (!query.id) throw createError({ statusCode: 400, message: 'ID required' });
            await db.delete(experiences).where(eq(experiences.id, Number(query.id)));
            return { success: true };
        }
    } catch (error) {
        console.error('Experiences API Error:', error);
        throw createError({ statusCode: 500, message: error.message });
    }
});
