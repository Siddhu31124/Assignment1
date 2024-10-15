import { useQuery } from "@tanstack/react-query";

import { fetchAllTransaction } from "../http";
import TableBody from "./CommonComponents/TableBody";
import TableHead from "./CommonComponents/TableHead";
import Loader from "./CommonComponents/Loader";
import ModalLayout from "./CommonComponents/ModelLayout";
import { QUERY_KEY, FAIL_ERROR } from "../Constants";

export default function Credit() {
  const { data, isPending, isError } = useQuery({
    queryKey: [QUERY_KEY, "creditData"],
    queryFn: fetchAllTransaction,
  });

  let creditArray = undefined;

  const creditData = () => {
    switch (true) {
      case data !== undefined: {
        creditArray = data.transactions.filter(
          (each) => each.type === "credit"
        );
        return (
          <main className="transaction_table">
            <table>
              <TableHead />
              <TableBody data={{ transactions: creditArray }} />
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
      {creditData()}
    </div>
  );
}
