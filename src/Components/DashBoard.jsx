import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { fetchLastTransaction } from "../http";
import Loader from "./CommonComponents/Loader";
import TotalCreditDebitContainer from "./TotalCreditDebitContainer";
import TableBody from "./CommonComponents/TableBody";
import ModalLayout from "./CommonComponents/ModelLayout";
import { ModalContext } from "../store/ModalContext";
import { FAIL_ERROR, QUERY_KEY } from "../Constants";

export default function DashBoard() {
  const context = useContext(ModalContext);
  const { data, isPending, isError } = useQuery({
    queryKey: [QUERY_KEY, "lastThree"],
    queryFn: fetchLastTransaction,
  });

  const lastTransaction = () => {
    switch (true) {
      case data !== undefined: {
        return (
          <table className="transaction_table_dashboard">
            <TableBody data={data} />
          </table>
        );
      }
      case isPending: {
        return (
          <div className="ml-96 pl-12 pt-28">
            <Loader />
          </div>
        );
      }
      case isError: {
        return <p className="text-red-500 text-xl ">{FAIL_ERROR}</p>;
      }
    }
  };
  const nav = () => {
    return (
      <nav>
        <h3 className="text-2xl font-bold">Accounts</h3>
        <button
          className="bg-blue-700 text-white hover:bg-blue-800 p-2 text-xs font-medium rounded-lg"
          onClick={() => context.handelOpenModal("isAdd")}
        >
          + Add Transactions
        </button>
      </nav>
    );
  };

  return (
    <div className="dash_main">
      <ModalLayout />
      {nav()}
      <main className="p-8">
        <TotalCreditDebitContainer />
        <h3 className="mb-3 text-2xl font-bold">Last Transactions</h3>
        {lastTransaction()}
      </main>
    </div>
  );
}
