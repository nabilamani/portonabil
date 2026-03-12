export default defineNuxtRouteMiddleware(async (to, from) => {
    const { loggedIn } = useUserSession()

    if (!loggedIn.value && to.path.startsWith('/admin')) {
        return navigateTo('/login')
    }
})
