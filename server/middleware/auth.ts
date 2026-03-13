export default defineEventHandler(async (event) => {
    const { user } = await getUserSession(event)
    const isProtectedPage = event.path.startsWith('/admin')
    
    // Public APIs that don't need auth
    const publicApis = [
        '/api/login', 
        '/api/portfolio', 
    ]
    const isChatApi = event.path.startsWith('/api/chat/')
    
    // Protect API routes unless they are explicitly public.
    // For Chat APIs, we only protect DELETE (used by admin to delete sessions)
    const isProtectedAPI = event.path.startsWith('/api/') && 
                          !publicApis.includes(event.path) &&
                          !(isChatApi && event.method !== 'DELETE')

    if (!user && (isProtectedAPI || isProtectedPage)) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }
})
