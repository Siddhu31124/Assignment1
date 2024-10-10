import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoardPage from "./Pages/DashboardPage";
import RootPage from "./Pages/RootPage";
import TrancationPage from "./Pages/TranscationPage";
import TrancationrootPage from "./Pages/Transcationroot";
import { QueryClientProvider } from "@tanstack/react-query";
import CreditPage from "./Pages/CreditPage";
import DebitPage from "./Pages/DebitPage";
import ErrorPage from "./Pages/ErrorPage";
import LoginPage from "./Pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { queryClient } from "./Components/http";
function App() {
  const router = createBrowserRouter([
    { path: "/login", element: <LoginPage /> },
    {
      path: "/",
      element: <RootPage />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <DashBoardPage /> },
        {
          path: "/transaction",
          element: <TrancationrootPage />,
          children: [
            { index: true, element: <TrancationPage /> },
            { path: "/transaction/credit", element: <CreditPage /> },
            { path: "/transaction/debit", element: <DebitPage /> },
          ],
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
