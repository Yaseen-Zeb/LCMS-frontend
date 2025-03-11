import { createBrowserRouter } from "react-router-dom";
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
import ContactUs from "@/components/pages/contact-us";
import Chat from "@/components/pages/chat";

const AppRoutes = createBrowserRouter([
  // Home
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    path: "/chat",
    element: <Chat />,
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
    element: <ContentLayout />,
    children: [
      {
        path: "profile/:id",
        element: <ClientProfile />,
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
    ],
  },

  // Page Not Found
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export const router = AppRoutes;
