import { CiCircleChevUp } from "react-icons/ci";
import { CiCircleChevDown } from "react-icons/ci";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { fetchlasttransaction } from "./http";
import { fetchtotaltransaction } from "./http";
import { TailSpin } from "react-loader-spinner";
import dayjs from "dayjs";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
export default function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const { data, isPending, isError } = useQuery({
    queryKey: ["lastThree"],
    queryFn: fetchlasttransaction,
  });
  const {
    data: totalData,
    isPending: totalPending,
    isError: totalError,
  } = useQuery({
    queryKey: ["total"],
    queryFn: fetchtotaltransaction,
  });
  function handelModel() {
    setOpenModal((preVal) => !preVal);
  }
  return (
    <div className="dashmain">
      <DeleteModal isOpen={openModal} handelFunction={handelModel} />
      <nav>
        <h3 className="text-2xl font-bold">Accounts</h3>
        <button
          className="bg-blue-700 text-white hover:bg-blue-800 p-2 text-xs font-medium rounded-lg"
          onClick={handelModel}
        >
          + Add Trancations
        </button>
      </nav>
      <main className="p-8">
        <div className="dashamount">
          <div>
            <p className="text-green-400 text-3xl font-bold">
              {totalData && totalData.totals_credit_debit_transactions[0].sum}
              {totalPending && <p className="text-xl">Loding...</p>}
              {totalError && (
                <p className="text-red-500 text-xl ">Fail to Fetch Data</p>
              )}
              <br />
              <span className="text-white text-base">Credit</span>
            </p>
            <img src="Credit.png" />
          </div>
          <div>
            <p className="text-red-500 text-3xl font-bold">
              {totalData && totalData.totals_credit_debit_transactions[1].sum}
              {totalPending && <p className="text-xl">Loding...</p>}
              {totalError && <p className="text-xl">Fail to Fetch Data</p>}
              <br />
              <span className="text-white text-base">Debit</span>
            </p>
            <img src="Debit.png" />
          </div>
        </div>
        <h3 className="mb-3 text-2xl font-bold">Last Transcations</h3>
        {isPending && (
          <div className="ml-96 pl-12 pt-28">
            <TailSpin
              visible={true}
              height="80"
              width="80"
              color="blue"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
        {isError && <p className="text-red-500 text-xl ">Fail to Fetch Data</p>}
        {data && (
          <div>
            <ul className="transctionListContainer">
              {data.transactions.map((eachItems) => (
                <li key={eachItems.id} className="dash-last-transcation">
                  <p className="Arrow">
                    {eachItems.type === "credit" ? (
                      <CiCircleChevUp className="text-2xl text-green-600" />
                    ) : (
                      <CiCircleChevDown className="text-2xl text-red-600" />
                    )}
                    {eachItems.transaction_name}
                  </p>
                  <p>{eachItems.category}</p>
                  <p>{dayjs(eachItems.data).format("YY MMM, hh:mm A")}</p>
                  <p
                    className={
                      eachItems.type === "credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {eachItems.type === "credit" ? "+" : "-"}${eachItems.amount}
                  </p>
                  <p>
                    <button className="mx-5 text-green-500 text-xl">
                      <FaPencilAlt />
                    </button>
                    <button className="text-red-500 text-xl">
                      <MdDelete />
                    </button>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}