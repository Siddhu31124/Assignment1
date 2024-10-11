import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./http";
import { useState } from "react";
import TableRow from "../utils/TableData";
import Loader from "../utils/Loader";
import { TableHead } from "../utils/TableData";
import ModalLayout from "../utils/ModelLayout";
import { ModalContext } from "../store/ModalContext";
import { useContext } from "react";
export default function Credit() {
  const context = useContext(ModalContext);
  const { data, isPending, isError } = useQuery({
    queryKey: ["transaction", "credit"],
    queryFn: fetchData,
  });
  let creditArray = undefined;
  if (data) {
    creditArray = data.transactions.filter((each) => each.type === "credit");
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
      {creditArray && (
        <main className="transaction_table">
          <table>
            <TableHead />
            <TableRow
              data={{ transactions: creditArray }}
              handelModel={context.handelModel}
            />
          </table>
        </main>
      )}
    </div>
  );
}
