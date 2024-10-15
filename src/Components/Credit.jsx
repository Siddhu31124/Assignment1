import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { fetchData } from "./http";
import TableRow from "../utils/TableData";
import Loader from "../utils/Loader";
import { TableHead } from "../utils/TableData";
import ModalLayout from "../utils/ModelLayout";
import { ModalContext } from "../store/ModalContext";
import { QUERY_KEY, FAIL_ERROR } from "../Constants";

export default function Credit() {
  const context = useContext(ModalContext);
  const { data, isPending, isError } = useQuery({
    queryKey: [QUERY_KEY, "credit"],
    queryFn: fetchData,
  });

  let creditArray = undefined;
  let content;

  if (data) {
    creditArray = data.transactions.filter((each) => each.type === "credit");
    content = (
      <main className="transaction_table">
        <table>
          <TableHead />
          <TableRow
            data={{ transactions: creditArray }}
            handelModel={context.handelModel}
          />
        </table>
      </main>
    );
  }

  if (isError) {
    content = (
      <div className="errorMessage">
        <h1 className="text-3xl font-bold text-red-600">{FAIL_ERROR}</h1>
      </div>
    );
  }

  if (isPending) {
    content = (
      <div className="Loader">
        <Loader />
      </div>
    );
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
