import { db } from '~/server/database'
import { chatSessions, chatMessages } from '~/server/database/schema'
import { desc, eq, sql } from 'drizzle-orm'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
    const method = getMethod(event)

    // POST: Create a new visitor chat session
    if (method === 'POST') {
        const body = await readBody(event)
        if (!body?.visitorName?.trim()) {
            throw createError({ statusCode: 400, message: 'Visitor name is required' })
        }

        const sessionId = randomUUID()
        const now = Math.floor(Date.now() / 1000)

        await db.insert(chatSessions).values({
            id: sessionId,
            visitorName: body.visitorName.trim(),
            createdAt: now,
            isOpen: true,
        })

        return { sessionId, visitorName: body.visitorName.trim() }
    }
    
    // GET: List all sessions with last message info (admin use)
    if (method === 'GET') {
        const sessions = await db.select().from(chatSessions).orderBy(desc(chatSessions.createdAt))

        // For each session, get last message and unread count
        const sessionsWithMeta = await Promise.all(sessions.map(async (session) => {
            const lastMessages = await db
                .select()
                .from(chatMessages)
                .where(eq(chatMessages.sessionId, session.id))
                .orderBy(desc(chatMessages.createdAt))
                .limit(1)

            const allMessages = await db
                .select()
                .from(chatMessages)
                .where(eq(chatMessages.sessionId, session.id))

            const unreadCount = allMessages.filter(m => m.senderType === 'visitor').length

            return {
                ...session,
                lastMessage: lastMessages[0] ?? null,
                totalMessages: allMessages.length,
                unreadCount,
            }
        }))

        return sessionsWithMeta
    }

    // DELETE: Close/delete a session (admin use)
    if (method === 'DELETE') {
        const query = getQuery(event)
        if (!query.id) throw createError({ statusCode: 400, message: 'Session ID required' })
        
        await db.delete(chatMessages).where(eq(chatMessages.sessionId, query.id as string))
        await db.delete(chatSessions).where(eq(chatSessions.id, query.id as string))
        
        return { success: true }
    }

    throw createError({ statusCode: 405, message: 'Method not allowed' })
})
