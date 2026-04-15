import { createBrowserRouter } from "react-router";
import App from "../App";
import DirectoryPage from "../pages/Directory";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'directorio', element: <DirectoryPage />}
        ]
    },
]);

export default router;
