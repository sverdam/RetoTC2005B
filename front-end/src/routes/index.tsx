import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DirectoryPage from "../pages/Directory";
import ErrorPage from "../pages/ErrorPage";
import Addcompany from "../pages/AddCompany";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: 'directorio', element: <DirectoryPage /> },
            { path: 'add-company', element: <Addcompany /> }
        ]
    }
]);

export default router;