import { createBrowserRouter } from "react-router";
import App from "../App";
import DirectoryPage from "../pages/Directory";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: < ErrorPage/>,
        children: [
            { path: 'directorio', element: <DirectoryPage />}
        ]
    },
]);

export default router;
