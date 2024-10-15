import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import { fetchTotalTransaction } from "../http";
import { QUERY_KEY, FAIL_ERROR } from "../Constants";
import totalCreditAndDebit from "../utils/TotalCreditAndDebit";

export default function TotalCreditDebitContainer() {
  //Update the initial values
  //Remove this state
  const [totalStates, setTotalStates] = useState({ credit: "", debit: "" });
  const {
    data: totalData,
    isPending,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetchTotalTransaction,
  });
  useEffect(() => {
    if (totalData) {
      let data = totalCreditAndDebit(
        totalData.totals_credit_debit_transactions
      );
      setTotalStates(data);
    }
  }, [totalCreditAndDebit, totalData]);

  //Change this as switch case
  let content;
  if (isPending) {
    content = <p className="text-xl">Loading...</p>;
  }

  if (isError) {
    <p className="text-red-500 text-xl ">{FAIL_ERROR}</p>;
  }

  return (
    <div className="dash_amount">
      <div className="text-green-400 text-3xl font-bold">
        <div className="flex flex-col gap-1">
          {totalStates.credit}
          {content}
          <p className="text-base">Credit</p>
        </div>
        <img src="Credit.png" />
      </div>
      <div className="text-red-500 text-3xl font-bold">
        <div className="flex flex-col gap-1">
          {totalStates.debit}
          {content}
          <p className="text-base">Debit</p>
        </div>
        <img src="Debit.png" />
      </div>
    </div>
  );
}
