import { useAuth } from "../../context/authcontext";
import Screen4 from "../../views/screen4";
import Screen6 from "../../views/screen6";
import Screen8 from "../../views/screen8";
import Login from "../../views/login";
import Signup from "../../views/signup";
import NotFound from "../../views/not-found";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { GeolocationProvider } from "../../context/geolocator";
import AdminDashboard from "../../views/admindashboard";
import ProtectedRoute from "./protectedroute";
import { UnsplashProvider } from "../../context/unslpashcontext";
import SuccessfulReservationPage from "../../views/succesfulreservation";

const Routes = () => {
  const { currentUser, role } = useAuth();

  const routesForPublic = [
    {
      path: "/home",
      element: (
        <GeolocationProvider>
          <UnsplashProvider>
            <Screen4 />
          </UnsplashProvider>
        </GeolocationProvider>


      ),
    },
    {
      path: "/",
      element: (
        <GeolocationProvider>
          <UnsplashProvider>
            <Screen4 />
          </UnsplashProvider>
        </GeolocationProvider>
      ),
    },
    {
      path: "/destinations",
      element: (
        <GeolocationProvider>
          <UnsplashProvider>
            <Screen6 />
          </UnsplashProvider>
        </GeolocationProvider>
      ),
    },
    {
      path: "/contact",
      element: (
        <GeolocationProvider>
          <Screen8 />
        </GeolocationProvider>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sign-up",
      element: <Signup />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children:
        currentUser && role === "admin"
          ? [
              {
                path: "/dashboard",
                element: (
                  <UnsplashProvider>
                    <AdminDashboard />
                  </UnsplashProvider>
                ),
              },
              {
                path: "/reservation-success",
                element: <SuccessfulReservationPage />,
              },
            ]
          : null,
      //     {
      //       path: "/logout",
      //       element: <div>Logout</div>,
      //     },
      //     {
      //       path: "/dashboard/users/:uuid",
      //       element: <UserPage />
      //     },
      //     {
      //       path: "/dashboard/users/",
      //       element: <CustomersDashboard />
      //     },
      //     {
      //       path: "/dashboard/devices/",
      //       element: <DeviceDashboard />
      //     },
      //     {
      //       path: "/dashboard/devices/:uuid",
      //       element: <DevicePage />
      //     },
      //     {
      //       path: "chat-room",
      //       element: <ChatRoom />
      //     }
      //   ] : [
      //       {
      //         path:"/",
      //         element: token ? <Navigate to="/dashboard" /> : <LoginPage />
      //       },
      //       {
      //         path: "/dashboard",
      //         element: role.toLocaleLowerCase() === "user" ? <WebSocketProvider url = {"ws://localhost:8083/"}><UserDashboard /></WebSocketProvider> : <LoginPage />,
      //       },
      //       {
      //         path: "/logout",
      //         element: <div>Logout</div>,
      //       },
      //       {
      //         path: "/dashboard/devices/:uuid",
      //         element: role.toLocaleLowerCase() === "user" && uuid && <WebSocketProvider url = {"ws://localhost:8083/"}><DevicePageForUsers /></WebSocketProvider>
      //       }
      //   ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    // {
    //   path: "/",
    //   element: <LoginPage />,
    // },
    // {
    //   path: "/login",
    //   element: <LoginPage />,
    // },
  ];

  const notFoundRoute = {
    path: "*",
    element: <NotFound />,
  };

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!currentUser ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
    notFoundRoute,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
