import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "@/components/shared/page-not-found";
import HomePage from "@/components/pages/home";
import ContentLayout from "@/components/layouts/content-layout";
import CasesList from "@/features/case/components/cases-list";
import LawyersList from "@/features/lawyer/components/lawyers-list";
import MyClientProfile from "@/features/client/component/myProfile/profile";
import RequireAuth from "@/components/layouts/require-auth";
import CaseDetail from "@/features/case/components/case-detail";
import LawyerProfile from "@/features/lawyer/components/lawyer-profile";
import ClientProfile from "@/features/client/component/client-profile";
import MyLawyerProfile from "@/features/lawyer/components/myProfile/profile";

const AppRoutes = createBrowserRouter([
  // Home
  {
    path: "/",
    element: <HomePage />,
  },
  // {
  //   path: "/about-us",
  //   element: <AboutUs />,
  // },

  {
    path: "/case",
    element: <ContentLayout />,
    children: [
      {
        path: "list",
        element: <CasesList />,
      },
      {
        path: "detail/:id",
        element: <CaseDetail />,
      },
    ],
  },

  {
    path: "/client",
    element: <ContentLayout />,
    children: [
      {
        path: "profile/:id",
        element: <ClientProfile />,
      },
      {
        path: "profile",
        element: (
          <RequireAuth permittedRoles={["client"]}>
            <MyClientProfile />
          </RequireAuth>
        ),
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
      {
        path: "profile/:id",
        element: <LawyerProfile />,
      },
      {
        path: "profile",
        element: (
          <RequireAuth permittedRoles={["lawyer"]}>
            <MyLawyerProfile />
          </RequireAuth>
        ),
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
