import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./http";
import { useState } from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import AddModal from "./AddModal";
import TableRow from "../utils/TableData";
import Loader from "../utils/Loader";
import { TableHead } from "../utils/TableData";
export default function Credit() {
  const [selectedData, setSelectedData] = useState();
  const [openModal, setOpenModal] = useState({
    delete: false,
    add: false,
    edit: false,
  });
  const { data, isPending, isError } = useQuery({
    queryKey: ["transaction", "credit"],
    queryFn: fetchData,
  });
  let creditArray = undefined;
  if (data) {
    creditArray = data.transactions.filter((each) => each.type === "credit");
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
      {creditArray && (
        <main className="transaction_table">
          <table>
            <TableHead />
            <TableRow
              data={{ transactions: creditArray }}
              handelModel={handelModel}
            />
          </table>
        </main>
      )}
    </div>
  );
}
