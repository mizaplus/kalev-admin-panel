import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AppLayout } from "@/components/layout/AppLayout";
import BackupsPage from "@/pages/BackupsPage";
import ContactPage from "@/pages/ContactPage";
import DashboardPage from "@/pages/DashboardPage";
import DonatePage from "@/pages/DonatePage";
import FilesPage from "@/pages/FilesPage";
import GetInvolvedPage from "@/pages/GetInvolvedPage";
import HomePage from "@/features/ui/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProgramsPage from "@/pages/ProgramsPage";
import AboutPage from "./features/ui/AboutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "home", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "programs", element: <ProgramsPage /> },
      { path: "get-involved", element: <GetInvolvedPage /> },
      { path: "donate", element: <DonatePage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "files", element: <FilesPage /> },
      { path: "backups", element: <BackupsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
