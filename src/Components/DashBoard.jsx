import { useQuery } from "@tanstack/react-query";

import { fetchLastTransaction } from "./http";
import { useContext } from "react";
import { DashBoardLoader } from "../utils/Loader";
import AmountContainer from "./AmountContainer";
import TableRow from "../utils/TableData";
import ModalLayout from "../utils/ModelLayout";
import { ModalContext } from "../store/ModalContext";
import { FailError, QueryKey } from "../Constants";

export default function DashBoard() {
  const context = useContext(ModalContext);
  const { data, isPending, isError } = useQuery({
    queryKey: [QueryKey, "lastThree"],
    queryFn: fetchLastTransaction,
  });

  let content;
  if (data) {
    content = (
      <table className="transaction_table_dashboard">
        <TableRow data={data} handelModel={context.handelModel} />
      </table>
    );
  }

  if (isPending) {
    content = <DashBoardLoader />;
  }

  if (isError) {
    content = <p className="text-red-500 text-xl ">{FailError}</p>;
  }

  return (
    <div className="dash_main">
      <ModalLayout
        openModal={context.openModal}
        selectedData={context.selectedData}
        handelModel={context.handelModel}
      />
      <nav>
        <h3 className="text-2xl font-bold">Accounts</h3>
        <button
          className="bg-blue-700 text-white hover:bg-blue-800 p-2 text-xs font-medium rounded-lg"
          onClick={() => context.handelModel("add")}
        >
          + Add Transactions
        </button>
      </nav>
      <main className="p-8">
        <AmountContainer />
        <h3 className="mb-3 text-2xl font-bold">Last Transactions</h3>
        {content}
      </main>
    </div>
  );
}
