export default defineEventHandler(async (event) => {
    const { user } = await getUserSession(event)
    const isProtectedAPI = event.path.startsWith('/api/') && !['/api/login', '/api/portfolio'].includes(event.path)
    const isProtectedPage = event.path.startsWith('/admin')

    if (!user && (isProtectedAPI || isProtectedPage)) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }
})
