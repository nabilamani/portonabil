export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const { password } = await readBody(event)

    console.log('Login attempt with password:', password)
    console.log('Expected password:', config.adminPassword)

    if (password === config.adminPassword) {
        console.log('Login successful!')
        await setUserSession(event, {
            user: {
                role: 'admin'
            }
        })
        return { success: true }
    }

    console.log('Login failed: Invalid password')
    throw createError({
        statusCode: 401,
        message: 'Invalid password'
    })
})
