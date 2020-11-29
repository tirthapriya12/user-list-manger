import Login        from './pages/login/login'
import Register from './pages/register-user/register-user';
import Dashboard    from './pages/dashboard/dashboard';
import ErrorPage    from './pages/404/404';
export const route_list = [
    {
        url: '/login',
        component: Login
    },
    {
        url: '/register',
        component: Register,
    },
    {
        url: '/',
        component: Dashboard,
        isAuthRequired: true
    },
    {
        url: '/dashboard',
        component: Dashboard,
        isAuthRequired: true
    },
    {
        url: '/error',
        component: ErrorPage
    }
]