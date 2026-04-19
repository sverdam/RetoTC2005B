import { createBrowserRouter } from "react-router";
import App from "../App";
import DirectoryPage from "../pages/Directory";
import ErrorPage from "../pages/ErrorPage";
import UserPage from "../pages/UserAdminPage";
import UserFormPage from "../pages/UserFormPage";
import CompanyPage from "../pages/CompanyPage";
import LoginPage from "../pages/LoginPage";
import PaywallPage from "../pages/PaywallPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: < ErrorPage/>,
        children: [
            { path: 'directorio', element: <DirectoryPage />},
            { path: 'users', element: <UserPage/>},
            { path: 'users/new', element: <UserFormPage />},
            { path: 'users/:id', element: <UserFormPage />},
            { path: 'empresa', element: <CompanyPage />},
            { path: 'login', element: <LoginPage />},
            {path: 'membresia', element: <PaywallPage />}
        ]
    },
]);

export default router;
