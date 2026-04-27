import { db } from '../database';
import { projects } from '../database/schema';
import { eq, desc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const method = event.method;

    if (method === 'GET') {
        const id = getQuery(event).id;
        if (id) {
            return await db.select().from(projects).where(eq(projects.id, Number(id))).limit(1);
        }
        return await db.select().from(projects).orderBy(desc(projects.order));
    }

    if (method === 'POST') {
        const body = await readBody(event);
        return await db.insert(projects).values({
            title: body.title,
            description: body.description || '', // Ensure default empty for video projects
            category: body.category || 'web',
            stats: body.stats,
            techs: body.techs,
            demoUrl: body.demoUrl,
            githubUrl: body.githubUrl,
            credentials: body.credentials,
            features: body.features,
            imageUrl: body.imageUrl,
            videoUrl: body.videoUrl,
            order: body.order || 0
        }).returning();
    }

    if (method === 'PATCH') {
        const body = await readBody(event);
        if (!body.id) throw createError({ statusCode: 400, message: 'ID is required' });
        
        return await db.update(projects)
            .set({
                title: body.title,
                description: body.description !== undefined ? body.description : undefined,
                category: body.category !== undefined ? body.category : undefined,
                stats: body.stats,
                techs: body.techs,
                demoUrl: body.demoUrl,
                githubUrl: body.githubUrl,
                credentials: body.credentials,
                features: body.features,
                imageUrl: body.imageUrl,
                videoUrl: body.videoUrl,
                order: body.order
            })
            .where(eq(projects.id, body.id))
            .returning();
    }

    if (method === 'DELETE') {
        const id = getQuery(event).id;
        if (!id) throw createError({ statusCode: 400, message: 'ID is required' });
        return await db.delete(projects).where(eq(projects.id, Number(id))).returning();
    }
});
