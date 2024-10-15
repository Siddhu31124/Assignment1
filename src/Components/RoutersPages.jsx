import { createBrowserRouter } from "react-router-dom";

import DashBoardPage from "../Pages/DashboardPage";
import RootPage from "../Pages/RootPage";
import TransactionPage from "../Pages/TransactionPage";
import TransactionRootPage from "../Pages/TransactionRoot";
import CreditPage from "../Pages/CreditPage";
import DebitPage from "../Pages/DebitPage";
import ErrorPage from "../Pages/ErrorPage";
import AdminLoginPage from "../Pages/AdminLoginPage";
import {
  TRANSACTION_ROUTE,
  LOGIN_ROUTE,
  ADMIN_LOGIN_ROUTE,
  INITIAL_ROUTE,
} from "../Constants";

export function routersPath() {
  return createBrowserRouter([
    { path: LOGIN_ROUTE, element: <AdminLoginPage /> },
    { path: ADMIN_LOGIN_ROUTE, element: <AdminLoginPage /> },
    {
      path: INITIAL_ROUTE,
      element: <RootPage />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <DashBoardPage /> },
        {
          path: TRANSACTION_ROUTE,
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
