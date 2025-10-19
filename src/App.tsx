import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AppLayout } from "@/components/layout/AppLayout";
import BackupsPage from "@/pages/BackupsPage";
import DashboardPage from "@/pages/DashboardPage";
import NotFoundPage from "@/features/ui/NotFoundPage";

// Pages
import AboutPage from "@/features/ui/AboutPage";
import HomePage from "@/features/ui/HomePage";
import ProgramsPage from "./features/ui/ProgramsPage";
import GetInvolvedPage from "./features/ui/GetInvolvedPage";
import ContactPage from "@/features/ui/ContactPage";
// import FilesPage from "@/features/ui/FilesPage";

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
      // { path: "donate", element: <DonatePage /> },
      { path: "contact", element: <ContactPage /> },
      // { path: "files", element: <FilesPage /> },
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
