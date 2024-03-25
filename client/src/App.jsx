import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Register,
  AddJob,
  Admin,
  AllJobs,
  DashboardLayout,
  DeleteJob,
  EditJob,
  Error,
  Landing,
  Profile,
  Stats,
  Login,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    // If path doesnt exist, use errorElement instead
    errorElement: <Error />,
    // 
    children: [
      {
        // This make it the main route
        index: true,
        element: <Landing />,
        //
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
