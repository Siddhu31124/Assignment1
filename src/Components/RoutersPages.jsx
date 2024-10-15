import { createBrowserRouter } from "react-router-dom";

import DashBoard from "./DashBoard";
import RootPage from "../Pages/RootPage";
import Transaction from "./Transaction";
import TransactionRootPage from "../Pages/TransactionRoot";
import Credit from "./Credit";
import Debit from "./Debit";
import ErrorPage from "../Pages/ErrorPage";
import AdminUserLogin from "./AdminUserLogin";
import {
  TRANSACTION_ROUTE,
  LOGIN_ROUTE,
  ADMIN_LOGIN_ROUTE,
  INITIAL_ROUTE,
} from "../Constants";

export function routersPath() {
  return createBrowserRouter([
    { path: LOGIN_ROUTE, element: <AdminUserLogin /> },
    { path: ADMIN_LOGIN_ROUTE, element: <AdminUserLogin /> },
    {
      path: INITIAL_ROUTE,
      element: <RootPage />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <DashBoard /> },
        {
          path: TRANSACTION_ROUTE,
          element: <TransactionRootPage />,
          children: [
            { index: true, element: <Transaction /> },
            { path: "credit", element: <Credit /> },
            { path: "debit", element: <Debit /> },
          ],
        },
      ],
    },
  ]);
}
