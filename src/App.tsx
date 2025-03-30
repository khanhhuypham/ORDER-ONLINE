import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import NotFoundPage from "./features/not-found/not-found-page";
import { dashboardRouter } from "./routers/app-router";


import { ROUTE_LINK } from "./routers/module-router";
import { PaymentDetail } from "./features/payment/payment-detail";
import {  OrderHistoryPage } from "./features/order-history/order-history";

const App: React.FC = () => {
    const token =  "";

    return (
        <Router>
            <Routes>
                
                <Route element={<Layout />}>
                    {dashboardRouter.map((route, index) => (
                        <Route key={index} path={route.path} element={route.component} />
                    ))}
                </Route>
                <Route path={ROUTE_LINK.ORDE_HISTORY} element={<OrderHistoryPage />} />
                <Route path={ROUTE_LINK.PAYMENT_DETAIL} element={<PaymentDetail />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
