import React                        from 'react';
import { 
    BrowserRouter as Router, 
    Route, 
    Redirect,
    Switch }                        from 'react-router-dom';
import AuthenticatedLayer           from './components/auth/authenticated-layer'; 
import ErrorPage                    from './pages/404/404';
import { route_list }               from './route-list';

const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                {
                    route_list.map((route,i)=>{
                        if (route.isAuthRequired)
                            return (
                                <Route key={i} exact path={route.url}>
                                    <AuthenticatedLayer>
                                        <route.component />
                                    </AuthenticatedLayer>
                                </Route>
                            )

                        return (<Route exact key={i} path={route.url}><route.component /></Route>)
                    })
                }
                <Route>
                    <ErrorPage/>
                </Route>
            </Switch>
        </Router>
    )
}

export default AppRoutes;