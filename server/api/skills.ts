import { db } from '../database';
import { skills } from '../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    try {
        const method = getMethod(event);
        
        if (method === 'POST') {
            const body = await readBody(event);
            const { id, ...data } = body;
            const cleanData: any = {};
            Object.keys(data).forEach(key => {
                if (data[key] !== undefined) {
                    cleanData[key] = data[key] === '' ? null : data[key];
                }
            });
            await db.insert(skills).values(cleanData);
            return { success: true };
        }

        if (method === 'DELETE') {
            const query = getQuery(event);
            if (!query.id) throw createError({ statusCode: 400, message: 'ID required' });
            await db.delete(skills).where(eq(skills.id, Number(query.id)));
            return { success: true };
        }
    } catch (error) {
        console.error('Skills API Error:', error);
        throw createError({ statusCode: 500, message: error.message });
    }
});
