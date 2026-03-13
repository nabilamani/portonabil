import { db } from '~/server/database'
import { chatMessages, chatSessions } from '~/server/database/schema'
import { eq, asc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
    const method = getMethod(event)
    const query = getQuery(event)

    // GET: Poll messages for a given session
    if (method === 'GET') {
        const sessionId = query.sessionId as string
        if (!sessionId) throw createError({ statusCode: 400, message: 'sessionId required' })

        // Verify session exists
        const session = await db.select().from(chatSessions).where(eq(chatSessions.id, sessionId)).limit(1)
        if (!session.length) throw createError({ statusCode: 404, message: 'Session not found' })

        const messages = await db
            .select()
            .from(chatMessages)
            .where(eq(chatMessages.sessionId, sessionId))
            .orderBy(asc(chatMessages.createdAt))

        return { session: session[0], messages }
    }

    // POST: Send a message
    if (method === 'POST') {
        const body = await readBody(event)

        if (!body?.sessionId || !body?.content?.trim() || !body?.senderType) {
            throw createError({ statusCode: 400, message: 'sessionId, content, and senderType are required' })
        }

        if (!['visitor', 'admin'].includes(body.senderType)) {
            throw createError({ statusCode: 400, message: 'senderType must be visitor or admin' })
        }

        // Verify session exists
        const session = await db.select().from(chatSessions).where(eq(chatSessions.id, body.sessionId)).limit(1)
        if (!session.length) throw createError({ statusCode: 404, message: 'Session not found' })

        const now = Math.floor(Date.now() / 1000)

        const [newMessage] = await db.insert(chatMessages).values({
            sessionId: body.sessionId,
            content: body.content.trim(),
            senderType: body.senderType,
            createdAt: now,
        }).returning()

        return newMessage
    }

    throw createError({ statusCode: 405, message: 'Method not allowed' })
})
