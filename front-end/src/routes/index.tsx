import { createBrowserRouter } from "react-router";
import App from "../App";
import DirectoryPage from "../pages/Directory";
import ErrorPage from "../pages/ErrorPage";
import UserPage from "../pages/UserAdminPage";
import CompanyPage from "../pages/CompanyPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: < ErrorPage/>,
        children: [
            { path: 'directorio', element: <DirectoryPage />},
            { path: 'users', element: <UserPage/>},
            { path: 'empresa', element: <CompanyPage />}
        ]
    },
]);

export default router;
