import { db } from '../database';
import { certifications } from '../database/schema';
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

            await db.update(certifications)
                .set(cleanData)
                .where(eq(certifications.id, id));
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
            await db.insert(certifications).values(cleanData);
            return { success: true };
        }

        if (method === 'DELETE') {
            const query = getQuery(event);
            if (!query.id) throw createError({ statusCode: 400, message: 'ID required' });
            await db.delete(certifications).where(eq(certifications.id, Number(query.id)));
            return { success: true };
        }
    } catch (error) {
        console.error('Certifications API Error:', error);
        throw createError({ statusCode: 500, message: error.message });
    }
});
