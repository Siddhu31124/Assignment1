import { fetchLastTransaction } from "./http";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DashBoardLoader } from "../utils/Loader";
import DeleteModal from "./DeleteModal";
import AddModel from "./AddModal";
import EditModel from "./EditModal";
import AmountContainer from "./AmountContainer";
import TableRow from "../utils/TableData";
export default function DashBoard() {
  const [selectedData, setSelectedData] = useState();
  const [openModal, setOpenModal] = useState({
    delete: false,
    add: false,
    edit: false,
  });
  const { data, isPending, isError } = useQuery({
    queryKey: ["transaction", "lastThree"],
    queryFn: fetchLastTransaction,
  });
  function handelModel(item, data) {
    if (data) {
      setSelectedData(data);
    }
    const identifier = item;
    setOpenModal((prevVal) => {
      return { ...prevVal, [identifier]: !prevVal[identifier] };
    });
  }
  return (
    <div className="dash_main">
      <DeleteModal
        isOpen={openModal.delete}
        handelFunction={handelModel}
        id={selectedData}
      />
      <AddModel
        isOpen={openModal.add}
        handelFunction={handelModel}
        type="add"
      />
      <EditModel
        isOpen={openModal.edit}
        type="edit"
        handelFunction={handelModel}
        data={selectedData}
      />
      <nav>
        <h3 className="text-2xl font-bold">Accounts</h3>
        <button
          className="bg-blue-700 text-white hover:bg-blue-800 p-2 text-xs font-medium rounded-lg"
          onClick={() => handelModel("add")}
        >
          + Add Transactions
        </button>
      </nav>
      <main className="p-8">
        <AmountContainer />
        <h3 className="mb-3 text-2xl font-bold">Last Transactions</h3>
        {isPending && <DashBoardLoader />}
        {isError && <p className="text-red-500 text-xl ">Fail to Fetch Data</p>}
        {data && (
          <table className="transaction_table_dashboard">
            <TableRow data={data} handelModel={handelModel} />
          </table>
        )}
      </main>
    </div>
  );
}
