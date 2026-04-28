import { createBrowserRouter } from "react-router";
import App from "../App";
import DirectoryPage from "../pages/DirectoryPage";
import ErrorPage from "../pages/ErrorPage";
import UserPage from "../pages/UserAdminPage";
import UserFormPage from "../pages/UserFormPage";
import CompanyPage from "../pages/CompanyPage";
import HomePage from "../pages/HomePage";
import EditCompanyPage from "../pages/EditCompanyPage";
import LoginPage from "../pages/LoginPage";
import NewCompanyPage from "../pages/NewCompanyPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: < ErrorPage/>,
        children: [
            { index: true, element: <HomePage />},
            { path: 'directorio', element: <DirectoryPage />},
            { path: 'usuarios', element: <UserPage/>},
            { path: 'usuarios/nuevo', element: <UserFormPage />},
            { path: 'usuarios/:id', element: <UserFormPage />},
            { path: 'empresa/:id', element: <CompanyPage />},
            { path: 'empresa/:id/editar', element: <EditCompanyPage />},
            { path: 'empresa/editar', element: <EditCompanyPage />},
            { path: 'login', element: <LoginPage/>},
            { path: 'newcompany', element: <NewCompanyPage/>}
        ]
    },
]);

export default router;
