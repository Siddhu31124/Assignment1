import { useQuery } from "@tanstack/react-query";

import { fetchTotalTransaction } from "../http";
import { QUERY_KEY, FAIL_ERROR } from "../Constants";
import totalCreditAndDebit from "../utils/TotalCreditAndDebit";

export default function TotalCreditDebitContainer() {
  const {
    data: totalData,
    isPending,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetchTotalTransaction,
  });
  let data = { credit: "", debit: "" };
  if (totalData) {
    data = totalCreditAndDebit(totalData.totals_credit_debit_transactions);
  }

  const msgContent = () => {
    switch (true) {
      case isPending: {
        return <p className="text-xl">Loading...</p>;
      }
      case isError: {
        return <p className="text-red-500 text-xl ">{FAIL_ERROR}</p>;
      }
    }
  };

  const totalCreditAndDebitContainer = () => {
    if (data) {
      return (
        <div className="dash_amount">
          <div className="text-green-400 text-3xl font-bold">
            <div className="flex flex-col gap-1">
              {data.credit}
              {msgContent()}
              <p className="text-base">Credit</p>
            </div>
            <img src="Credit.png" />
          </div>
          <div className="text-red-500 text-3xl font-bold">
            <div className="flex flex-col gap-1">
              {data.debit}
              {msgContent()}
              <p className="text-base">Debit</p>
            </div>
            <img src="Debit.png" />
          </div>
        </div>
      );
    }
  };
  return totalCreditAndDebitContainer();
}
