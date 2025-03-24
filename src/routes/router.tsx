import { createBrowserRouter, Navigate } from "react-router-dom";
import PageNotFound from "@/components/shared/page-not-found";
import HomePage from "@/components/pages/home";
import ContentLayout from "@/components/layouts/content-layout";
import CasesList from "@/features/case/components/cases-list";
import LawyersList from "@/features/lawyer/components/lawyers-list";
import CaseDetail from "@/features/case/components/case-detail";
import ClientProfile from "@/features/client/component/client-profile";
import LawyerProfile from "@/features/lawyer/components/lawyer-profile";
import PrivacyPolicy from "@/components/pages/privacy-policy";
import AboutUs from "@/components/pages/about-us";
import ContactUs from "@/features/contact-us/components/contact-us";
import Chat from "@/features/chat/components/chat";
import AuthLayout from "@/components/layouts/auth-layout";
import Login from "@/features/admin/auth/components/login";
import RequireAuth from "@/components/layouts/require-auth";
import NoAdminWrapper from "@/components/wrappers/no-admin-wrapper";
import OnlyAdminWrapper from "@/components/wrappers/only-admin-wrapper";
import Dashboard from "@/features/admin/dashboard/component/dashboard";
import { useAuthContext } from "@/providers/auth-provider";
import LawyerList from "@/features/admin/lawyers/component/lawyer-list";
import ClientList from "@/features/admin/clients/component/client-list";
import CaseList from "@/features/admin/cases/component/case-list";
import FeedbackList from "@/features/admin/Feedback & Queries/component/feedback-list";

const AdminRedirect = () => {
  const { user } = useAuthContext();
  if (user?.role === "admin") return <Navigate to="/admin/dashboard" />;
  return <Navigate to="/" />;
};
const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <NoAdminWrapper>
        <HomePage />
      </NoAdminWrapper>
    ),
  },
  {
    path: "/privacy-policy",
    element: (
      <NoAdminWrapper>
        <PrivacyPolicy />
      </NoAdminWrapper>
    ),
  },
  {
    path: "/about-us",
    element: (
      <NoAdminWrapper>
        <AboutUs />
      </NoAdminWrapper>
    ),
  },
  {
    path: "/contact-us",
    element: (
      <NoAdminWrapper>
        <ContactUs />
      </NoAdminWrapper>
    ),
  },
  {
    path: "/chat",
    element: (
      <NoAdminWrapper>
        <Chat />
      </NoAdminWrapper>
    ),
  },

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
    element: (
      <NoAdminWrapper>
        <ContentLayout />
      </NoAdminWrapper>
    ),
    children: [
      {
        path: "profile/:id",
        element: <ClientProfile />,
      },
    ],
  },

  {
    path: "/lawyer",
    element: (
      <NoAdminWrapper>
        <ContentLayout />
      </NoAdminWrapper>
    ),
    children: [
      {
        path: "list",
        element: <LawyersList />,
      },
      {
        path: "profile/:id",
        element: <LawyerProfile />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <OnlyAdminWrapper>
        <RequireAuth permittedRoles={["admin"]}>
          <ContentLayout />
        </RequireAuth>
      </OnlyAdminWrapper>
    ),
    children: [
      {
        path: "",
        element: <AdminRedirect />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "lawyers",
        element: <LawyerList />,
      },
      {
        path: "clients",
        element: <ClientList />,
      },
      {
        path: "cases",
        element: <CaseList />,
      },
      {
        path: "feedback-queries",
        element: <FeedbackList />,
      },
      // {
      //   path: "clients",
      //   element: <LawyerProfile />,
      // },
      // {
      //   path: "cases",
      //   element: <LawyerProfile />,
      // }
    ],
  },

  // Page Not Found
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export const router = AppRoutes;
