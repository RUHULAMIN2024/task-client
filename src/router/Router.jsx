import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import AdminDashboard from "../pages/AdminDashboard";
import UserForm from "../pages/UserForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <UserForm></UserForm>,
      },
      {
        path: "/admin-dashboard",
        element: <AdminDashboard></AdminDashboard>,
      },
    ],
  },
]);

export default router;
