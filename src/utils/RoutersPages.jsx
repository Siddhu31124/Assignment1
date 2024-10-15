import { createBrowserRouter } from "react-router-dom";

import DashBoard from "../Components/DashBoard";
import RootPage from "../Pages/RootPage";
import Transaction from "../Components/Transaction";
import TransactionRootPage from "../Pages/TransactionRoot";
import Credit from "../Components/Credit";
import Debit from "../Components/Debit";
import ErrorPage from "../Pages/ErrorPage";
import LoginPage from "../Pages/LoginPage";
import {
  TRANSACTION_ROUTE,
  LOGIN_ROUTE,
  ADMIN_LOGIN_ROUTE,
  INITIAL_ROUTE,
  CREDIT_ROUTE,
  DEBIT_ROUTE,
} from "../Constants";

//No magic strings
//Move this file to utils
export function routersPath() {
  return createBrowserRouter([
    { path: LOGIN_ROUTE, element: <LoginPage /> },
    { path: ADMIN_LOGIN_ROUTE, element: <LoginPage /> },
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
            { path: CREDIT_ROUTE, element: <Credit /> },
            { path: DEBIT_ROUTE, element: <Debit /> },
          ],
        },
      ],
    },
  ]);
}
