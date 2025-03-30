import { Navigate, Outlet } from 'react-router-dom';


import { ROUTE_LINK } from './module-router';

export const ProtectedRoutes = () => {
    const token =  "";
    // if (token === "") {
    //     return <Navigate to={ROUTE_LINK.LOGIN} replace />;
    // }

    return <Outlet />;
};
