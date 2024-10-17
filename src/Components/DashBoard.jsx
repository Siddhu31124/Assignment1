import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { MdOutlineLightMode } from "react-icons/md";

import { fetchLastTransaction } from "../http";
import Loader from "./CommonComponents/Loader";
import TotalCreditDebitContainer from "./TotalCreditDebitContainer";
import ModalLayout from "./CommonComponents/ModelLayout";
import { ModalContext } from "../store/ModalContext";
import { FAIL_ERROR, QUERY_KEY } from "../Constants";
import TransactionTable from "./CommonComponents/TransactionTable";
import MobileNavBar from "./MobileMenuElements";
import MobileDetailsContainer from "./MobileDetailsContainer";
import { allTransactionDashTableStyle, navBarStyle } from "../utils/Styles";

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
          <>
            <TransactionTable
              data={data}
              tableClass={allTransactionDashTableStyle}
            />
            <MobileDetailsContainer data={data} />
          </>
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
      <nav
        className={`${navBarStyle} hidden lg:flex text-black dark:bg-black dark:text-white`}
      >
        <h3 className="text-2xl font-bold">Accounts</h3>
        <p className="flex gap-6">
          <button
            className="bg-blue-700 text-white hover:bg-blue-800 p-2 text-xs font-medium rounded-lg"
            onClick={() => context.handelOpenModal("isAdd")}
          >
            + Add Transactions
          </button>
          <button className="text-2xl" onClick={context.handelDarkMode}>
            <MdOutlineLightMode />
          </button>
        </p>
      </nav>
    );
  };

  return (
    <div className="w-[100%] flex flex-col bg-slate-50 dark:bg-black dark:text-white">
      <ModalLayout />
      {nav()}
      <MobileNavBar />
      <main className="p-8 h-[93vh]">
        <TotalCreditDebitContainer />
        <h3 className="mb-3 text-2xl font-bold">Last Transactions</h3>
        {lastTransaction()}
      </main>
    </div>
  );
}
