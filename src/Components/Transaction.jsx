import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { fetchAllTransaction } from "../http";
import TableBody from "./CommonComponents/TableBody";
import Loader from "./CommonComponents/Loader";
import TableHead from "./CommonComponents/TableHead";
import ModalLayout from "./CommonComponents/ModelLayout";
import { ModalContext } from "../store/ModalContext";
import { QUERY_KEY, FAIL_ERROR } from "../Constants";

export default function Transaction() {
  const context = useContext(ModalContext);
  const { data, isPending, isError } = useQuery({
    queryKey: [QUERY_KEY, "all"],
    queryFn: fetchAllTransaction,
  });
  const allTransactionData = () => {
    switch (true) {
      case data !== undefined: {
        return (
          <main className="transaction_table">
            <table>
              <TableHead />
              <TableBody data={data} />
            </table>
          </main>
        );
      }
      case isPending: {
        return (
          <div className="loader">
            <Loader />
          </div>
        );
      }
      case isError: {
        return (
          <div className="errorMessage">
            <h1 className="text-3xl font-bold text-red-600">{FAIL_ERROR}</h1>
          </div>
        );
      }
    }
  };

  return (
    <div className="transaction_main">
      <ModalLayout />
      {allTransactionData()}
    </div>
  );
}
