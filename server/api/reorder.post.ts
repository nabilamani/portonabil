import { db } from '../database';
import * as schema from '../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { table, items } = body;

        if (!table || !items || !Array.isArray(items)) {
            throw createError({ statusCode: 400, message: 'Invalid payload' });
        }

        // Validate table exists in schema and has an 'order' column
        const dbTable = schema[table as keyof typeof schema];
        if (!dbTable) {
            throw createError({ statusCode: 400, message: 'Invalid table name' });
        }

        // Perform batch update
        // Note: LibSQL/Drizzle doesn't have a single bulk update query, so we use Promise.all
        await Promise.all(
            items.map((item: { id: number, order: number }) => 
                db.update(dbTable)
                  .set({ order: item.order })
                  .where(eq(dbTable.id, item.id))
            )
        );

        return { success: true, message: 'Order updated successfully' };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
});
