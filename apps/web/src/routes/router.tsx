import { createBrowserRouter } from "react-router-dom";

import { LazyLoadBoundary } from "../performance/LazyLoadBoundary";
import { lazyLoad } from "../performance/lazy";
import AppLayout from "../layouts/AppLayout";
import NotFoundPage from "../pages/NotFoundPage";

const HomePage = lazyLoad(() => import("../pages/HomePage"), "HomePage");

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: (
          <LazyLoadBoundary>
            <HomePage />
          </LazyLoadBoundary>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
