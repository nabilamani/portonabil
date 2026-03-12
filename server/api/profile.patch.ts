import { db } from '../database';
import { profile } from '../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        
        // 1. Sanitize: Take only the fields we want and ensure no undefined values
        const updateData: any = {};
        const fields = ['name', 'role', 'description', 'bio', 'email', 'github', 'linkedin', 'phone', 'address'];
        
        fields.forEach(field => {
            if (body[field] !== undefined) {
                updateData[field] = body[field] === '' ? null : body[field];
            }
        });

        const id = body.id || 1;

        console.log('Updating profile ID:', id, 'with data:', updateData);

        // 2. Perform the update
        const result = await db.update(profile)
            .set(updateData)
            .where(eq(profile.id, id))
            .returning();

        // 3. If no update happened, insert instead
        if (result.length === 0) {
            console.log('Profile not found, inserting new one...');
            await db.insert(profile).values({
                id: 1,
                ...updateData
            });
        }

        return { success: true };
    } catch (error) {
        console.error('Profile Update Error:', error);
        throw createError({
            statusCode: 500,
            message: error.message
        });
    }
});
