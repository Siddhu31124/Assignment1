import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import { fetchTotalTransaction } from "./http";
import { QueryKey, FailError } from "../Constants";
import totalCreditAndDebit from "../utils/TotalCreditAndDebit";

export default function AmountContainer() {
  const [states, setStates] = useState({ credit: "", debit: "" });
  const {
    data: totalData,
    isPending,
    isError,
  } = useQuery({
    queryKey: [QueryKey],
    queryFn: fetchTotalTransaction,
  });
  useEffect(() => {
    if (totalData) {
      let data = totalCreditAndDebit(
        totalData.totals_credit_debit_transactions
      );
      setStates(data);
    }
  }, [totalCreditAndDebit, totalData]);

  let content;

  if (isPending) {
    content = <p className="text-xl">Loading...</p>;
  }

  if (isError) {
    <p className="text-red-500 text-xl ">{FailError}</p>;
  }

  return (
    <div className="dash_amount">
      <div className="text-green-400 text-3xl font-bold">
        <div className="flex flex-col gap-1">
          {states.credit}
          {content}
          <p className="text-base">Credit</p>
        </div>
        <img src="Credit.png" />
      </div>
      <div className="text-red-500 text-3xl font-bold">
        <div className="flex flex-col gap-1">
          {states.debit}
          {content}
          <p className="text-base">Debit</p>
        </div>
        <img src="Debit.png" />
      </div>
    </div>
  );
}
