import Login        from './pages/login/login'
import RegisterUser from './pages/register-user/register-user';
import Dashboard    from './pages/dashboard/dashboard';
export const route_list = [
    {
        url: '/login',
        component: Login
    },
    {
        url: '/register',
        component: RegisterUser,
    },
    {
        url: '/',
        component: Dashboard,
        isAuthRequired: true
    },
    {
        url: '/dahsboard',
        component: Dashboard,
        isAuthRequired: true
    }
]