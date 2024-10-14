import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./http";
import TableRow from "../utils/TableData";
import Loader from "../utils/Loader";
import ModalLayout from "../utils/ModelLayout";
import { TableHead } from "../utils/TableData";
import { ModalContext } from "../store/ModalContext";
import { useContext } from "react";
import { FailError, QueryKey } from "../Constants";

export default function Debit() {
  const context = useContext(ModalContext);
  const { data, isPending, isError, error } = useQuery({
    queryKey: [QueryKey, "debit"],
    queryFn: fetchData,
  });

  let debitArray;
  let content;
  if (data) {
    debitArray = data.transactions.filter((each) => each.type === "debit");
    content = (
      <main className="transaction_table">
        <table>
          <TableHead />
          <TableRow
            data={{ transactions: debitArray }}
            handelModel={context.handelModel}
          />
        </table>
      </main>
    );
  }

  if (isError) {
    content = (
      <div className="errorMessage">
        <h1 className="text-3xl font-bold text-red-600">{FailError}</h1>
      </div>
    );
  }

  if (isPending) {
    content = <Loader />;
  }

  return (
    <div className="transaction_main">
      <ModalLayout
        openModal={context.openModal}
        selectedData={context.selectedData}
        handelModel={context.handelModel}
      />
      {content}
    </div>
  );
}
