import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./http";
import TableRow from "../utils/TableData";
import Loader from "../utils/Loader";
import ModalLayout from "../utils/ModelLayout";
import { TableHead } from "../utils/TableData";
import { ModalContext } from "../store/ModalContext";
import { useContext } from "react";
export default function Debit() {
  const context = useContext(ModalContext);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["transaction", "debit"],
    queryFn: fetchData,
  });
  let debitArray = [];
  if (data) {
    debitArray = data.transactions.filter((each) => each.type === "debit");
  }
  return (
    <div className="transaction_main">
      <ModalLayout
        openModal={context.openModal}
        selectedData={context.selectedData}
        handelModel={context.handelModel}
      />
      {isPending && <Loader />}
      {isError && (
        <div className="errorMessage">
          <h1 className="text-3xl font-bold text-red-600">
            Failed To Fetch Data
          </h1>
        </div>
      )}
      {data && (
        <main className="transaction_table">
          <table>
            <TableHead />
            <TableRow
              data={{ transactions: debitArray }}
              handelModel={context.handelModel}
            />
          </table>
        </main>
      )}
    </div>
  );
}
