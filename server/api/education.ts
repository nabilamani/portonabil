import { db } from '../database';
import { education } from '../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    try {
        const method = event.method;
        const body = await readBody(event);

        if (method === 'PATCH') {
            const { id, ...data } = body;
            const cleanData: any = {};
            Object.keys(data).forEach(key => {
                if (data[key] !== undefined) {
                    cleanData[key] = data[key] === '' ? null : data[key];
                }
            });

            await db.update(education)
                .set(cleanData)
                .where(eq(education.id, id));
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
            await db.insert(education).values(cleanData);
            return { success: true };
        }

        if (method === 'DELETE') {
            const query = getQuery(event);
            if (!query.id) throw createError({ statusCode: 400, message: 'ID required' });
            await db.delete(education).where(eq(education.id, Number(query.id)));
            return { success: true };
        }
    } catch (error) {
        console.error('Education API Error:', error);
        throw createError({ statusCode: 500, message: error.message });
    }
});
