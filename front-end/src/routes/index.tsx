import { createBrowserRouter } from "react-router";
import App from "../App";
import DirectoryPage from "../pages/Directory";
import ErrorPage from "../pages/ErrorPage";
import UserPage from "../pages/UserAdminPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: < ErrorPage/>,
        children: [
            { path: 'directorio', element: <DirectoryPage />},
            { path: 'users', element: <UserPage/>}
        ]
    },
]);

export default router;
