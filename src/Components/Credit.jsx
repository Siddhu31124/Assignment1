import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { fetchAllTransaction } from "../http";
import TransactionTable from "./CommonComponents/TransactionTable";
import Loader from "./CommonComponents/Loader";
import ModalLayout from "./CommonComponents/ModelLayout";
import { QUERY_KEY, FAIL_ERROR } from "../Constants";
import { ModalContext } from "../store/ModalContext";
import MobileDetailsContainer from "./MobileDetailsContainer";
import {
  allTransactionMobileStyle,
  allTransactionTableStyle,
  transactionTableMain,
} from "../utils/Styles";

export default function Credit() {
  const context = useContext(ModalContext);
  const { data, isPending, isError } = useQuery({
    queryKey: [QUERY_KEY, "creditData"],
    queryFn: fetchAllTransaction,
  });

  const creditData = () => {
    switch (true) {
      case data !== undefined: {
        let creditTransactionArray = data.transactions.filter(
          (each) => each.type === "credit"
        );
        return (
          <>
            <main className={allTransactionTableStyle}>
              <TransactionTable
                data={{ transactions: creditTransactionArray }}
                head
              />
            </main>
            <main className={allTransactionMobileStyle}>
              <MobileDetailsContainer
                data={{ transactions: creditTransactionArray }}
              />
            </main>
          </>
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
          <div className="align-middle pt-96">
            <h1 className="text-3xl font-bold text-red-600">{FAIL_ERROR}</h1>
          </div>
        );
      }
    }
  };

  return (
    <div className={transactionTableMain}>
      <ModalLayout />
      {creditData()}
    </div>
  );
}
