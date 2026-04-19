import { createBrowserRouter } from "react-router";
import App from "../App";
import DirectoryPage from "../pages/DirectoryPage";
import ErrorPage from "../pages/ErrorPage";
import UserPage from "../pages/UserAdminPage";
import UserFormPage from "../pages/UserFormPage";
import CompanyPage from "../pages/CompanyPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: < ErrorPage/>,
        children: [
            { path: 'directorio', element: <DirectoryPage />},
            { path: 'usuarios', element: <UserPage/>},
            { path: 'usuarios/nuevo', element: <UserFormPage />},
            { path: 'usuarios/:id', element: <UserFormPage />},
            { path: 'empresa', element: <CompanyPage />}
        ]
    },
]);

export default router;
