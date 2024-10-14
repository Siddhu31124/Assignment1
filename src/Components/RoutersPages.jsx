import { createBrowserRouter } from "react-router-dom";
import DashBoardPage from "../Pages/DashboardPage";
import RootPage from "../Pages/RootPage";
import TransactionPage from "../Pages/TransactionPage";
import TransactionRootPage from "../Pages/TransactionRoot";
import CreditPage from "../Pages/CreditPage";
import DebitPage from "../Pages/DebitPage";
import ErrorPage from "../Pages/ErrorPage";
import LoginPage from "../Pages/LoginPage";
import AdminLoginPage from "../Pages/AdminLoginPage";
import {
  TransactionRoute,
  LoginRoute,
  AdminLoginRoute,
  InitialRoute,
} from "../Constants";

export function routersPath() {
  return createBrowserRouter([
    { path: LoginRoute, element: <LoginPage /> },
    { path: AdminLoginRoute, element: <AdminLoginPage /> },
    {
      path: InitialRoute,
      element: <RootPage />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <DashBoardPage /> },
        {
          path: TransactionRoute,
          element: <TransactionRootPage />,
          children: [
            { index: true, element: <TransactionPage /> },
            { path: "credit", element: <CreditPage /> },
            { path: "debit", element: <DebitPage /> },
          ],
        },
      ],
    },
  ]);
}
