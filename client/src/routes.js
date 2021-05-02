import Admin from "./pages/Admin";
import {ADMIN_ROUTE, IMAGE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "./utils/consts";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ImageMore from "./components/modals/ImageMore";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Home
    },
    {
        path: IMAGE_ROUTE + '/:id',
        Component: ImageMore
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]
