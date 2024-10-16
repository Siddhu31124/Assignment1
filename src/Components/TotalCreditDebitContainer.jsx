import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import { fetchTotalTransaction } from "../http";
import { QUERY_KEY, FAIL_ERROR } from "../Constants";
import totalCreditAndDebit from "../utils/TotalCreditAndDebit";

export default function TotalCreditDebitContainer() {
  const { data, isPending, isError } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetchTotalTransaction,
  });

  const msgContent = () => {
    switch (true) {
      case isPending: {
        return <p className="text-xl">Loading...</p>;
      }
      case isError: {
        return <p className="text-red-500 text-xl ">{FAIL_ERROR}</p>;
      }
      default: {
        return null;
      }
    }
  };

  const totalDataFunction = () => {
    if (data) {
      let totalData = totalCreditAndDebit(
        data.totals_credit_debit_transactions
      );
      return (
        <div className="dash_amount">
          <div className="text-green-400 text-3xl font-bold">
            <div className="flex flex-col gap-1">
              {totalData.credit}
              {msgContent()}
              <p className="text-base">Credit</p>
            </div>
            <img src="Credit.png" />
          </div>
          <div className="text-red-500 text-3xl font-bold">
            <div className="flex flex-col gap-1">
              {totalData.debit}
              {msgContent()}
              <p className="text-base">Debit</p>
            </div>
            <img src="Debit.png" />
          </div>
        </div>
      );
    }
  };

  return <>{totalDataFunction()}</>;
}
