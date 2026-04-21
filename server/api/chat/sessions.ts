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
            const allMessages = await db
                .select()
                .from(chatMessages)
                .where(eq(chatMessages.sessionId, session.id))
                .orderBy(asc(chatMessages.createdAt))

            const lastMessage = allMessages[allMessages.length - 1] ?? null
            
            // Unread count: count visitor messages since the last admin reply
            let unreadCount = 0
            for (let i = allMessages.length - 1; i >= 0; i--) {
                if (allMessages[i].senderType === 'admin') break
                if (allMessages[i].senderType === 'visitor') unreadCount++
            }

            return {
                ...session,
                lastMessage,
                totalMessages: allMessages.length,
                unreadCount,
            }
        }))

        // Sort by last message time (or creation time if empty)
        sessionsWithMeta.sort((a, b) => {
            const timeA = a.lastMessage?.createdAt ?? a.createdAt
            const timeB = b.lastMessage?.createdAt ?? b.createdAt
            return timeB - timeA
        })

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
