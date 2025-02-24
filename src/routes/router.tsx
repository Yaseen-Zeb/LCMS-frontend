import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "@/components/shared/page-not-found";
import HomePage from "@/components/layouts/home-page";
import ContentLayout from "@/components/layouts/content-layout";
import CasesList from "@/features/case/components/cases-list";
import LawyersList from "@/features/lawyer/components/lawyers-list";
import Profile from "@/features/profile/components/profile";
import RequireAuth from "@/components/layouts/require-auth";

const AppRoutes = createBrowserRouter([
  // Home
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/profile",
    element: <ContentLayout />,
    children: [
      {
        path: "",
        element: (
          <RequireAuth permittedRoles={["client", "lawyer"]}>
            <Profile />
          </RequireAuth>
        ),
      },
    ],
  },

  {
    path: "/case",
    element: <ContentLayout />,
    children: [
      {
        path: "list",
        element: <CasesList />,
      },
    ],
  },

  {
    path: "/lawyer",
    element: <ContentLayout />,
    children: [
      {
        path: "list",
        element: <LawyersList />,
      },
    ],
  },

  // Page Not Found
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export const router = AppRoutes;
