import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { fetchAllTransaction } from "../http";
import Loader from "./CommonComponents/Loader";
import ModalLayout from "./CommonComponents/ModelLayout";
import TransactionTable from "./CommonComponents/TransactionTable";
import { QUERY_KEY, FAIL_ERROR } from "../Constants";
import MobileDetailsContainer from "./MobileDetailsContainer";
import { ModalContext } from "../store/ModalContext";
import {
  allTransactionMobileStyle,
  allTransactionTableStyle,
  loaderStyle,
  transactionTableMain,
} from "../utils/Styles";

export default function Transaction() {
  const context = useContext(ModalContext);
  const { data, isPending, isError } = useQuery({
    queryKey: [QUERY_KEY, "all"],
    queryFn: fetchAllTransaction,
  });

  const allTransactionData = () => {
    switch (true) {
      case data !== undefined: {
        return (
          <>
            <main className={allTransactionTableStyle}>
              <TransactionTable data={data} head />
            </main>
            <main
              className={allTransactionMobileStyle}
              onClick={context.handelCloseMenu}
            >
              <MobileDetailsContainer data={data} />
            </main>
          </>
        );
      }
      case isPending: {
        return (
          <div className={loaderStyle}>
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
      {allTransactionData()}
    </div>
  );
}
