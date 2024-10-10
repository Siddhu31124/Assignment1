import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./http";
import { useState } from "react";
import TableRow from "../utils/TableData";
import Loader from "../utils/Loader";
import DeleteModal from "./DeleteModal";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import { TableHead } from "../utils/TableData";
export default function Debit() {
  const [selectedData, setSelectedData] = useState();
  const [openModal, setOpenModal] = useState({
    delete: false,
    add: false,
    edit: false,
  });
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["transaction", "debit"],
    queryFn: fetchData,
  });
  let debitArray = [];
  if (data) {
    debitArray = data.transactions.filter((each) => each.type === "debit");
  }
  function handelModel(item, data) {
    if (data) {
      setSelectedData(data);
    }
    let identifier = item;
    setOpenModal((prevVal) => {
      return { ...prevVal, [identifier]: !prevVal[identifier] };
    });
  }

  return (
    <div className="transaction_main">
      <DeleteModal
        isOpen={openModal.delete}
        handelFunction={handelModel}
        id={selectedData}
      />
      <AddModal
        isOpen={openModal.add}
        handelFunction={handelModel}
        type="add"
      />
      <EditModal
        isOpen={openModal.edit}
        handelFunction={handelModel}
        type="edit"
        data={selectedData}
      />
      {isPending && <Loader />}
      {isError && (
        <div className="errorMessage">
          <h1 className="text-3xl font-bold text-red-600">
            Failed To Fetch Data
          </h1>
        </div>
      )}
      {data && (
        <main className="transaction_table">
          <table>
            <TableHead />
            <TableRow
              data={{ transactions: debitArray }}
              handelModel={handelModel}
            />
          </table>
        </main>
      )}
    </div>
  );
}
