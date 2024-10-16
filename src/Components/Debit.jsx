import { useQuery } from "@tanstack/react-query";

import { fetchAllTransaction } from "../http";
import TableBody from "./CommonComponents/TableBody";
import Loader from "./CommonComponents/Loader";
import ModalLayout from "./CommonComponents/ModelLayout";
import TableHead from "./CommonComponents/TableHead";
import { FAIL_ERROR, QUERY_KEY } from "../Constants";

export default function Debit() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [QUERY_KEY, "debitData"],
    queryFn: fetchAllTransaction,
  });

  const debitData = () => {
    switch (true) {
      case data !== undefined: {
        let debitTransactionList = data.transactions.filter(
          (each) => each.type === "debit"
        );
        return (
          <main className="transaction_table">
            <table>
              <TableHead />
              <TableBody data={{ transactions: debitTransactionList }} />
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
      {debitData()}
    </div>
  );
}
