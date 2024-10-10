import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./http";
import { CiCircleChevUp } from "react-icons/ci";
import { CiCircleChevDown } from "react-icons/ci";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";
import { TailSpin } from "react-loader-spinner";
import DeleteModal from "./DeleteModal";
import AddModel from "./AddModal";
import { useState } from "react";
export default function Transaction() {
  const [selectedData, setSelectedData] = useState();
  const [openModal, setOpenModal] = useState({
    delete: false,
    add: false,
    edit: false,
  });
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["transaction", "all"],
    queryFn: fetchData,
  });
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
      <AddModel
        isOpen={openModal.edit}
        handelFunction={handelModel}
        type="edit"
        data={selectedData}
      />
      {isPending && (
        <div className="Loader">
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
            <thead>
              <tr className="transaction_details">
                <th>Transaction Name</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.transactions.map((eachItem) => (
                <tr key={eachItem.id} className="transaction_details">
                  <td className="Arrow">
                    {eachItem.type === "credit" ? (
                      <CiCircleChevUp className="text-2xl text-green-600" />
                    ) : (
                      <CiCircleChevDown className="text-2xl text-red-600" />
                    )}
                    {eachItem.transaction_name}
                  </td>
                  <td>{eachItem.category}</td>
                  <td>{dayjs(eachItem.data).format("YY MMM, hh:mm A")}</td>
                  <td
                    className={
                      eachItem.type === "credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {eachItem.type === "credit" ? "+" : "-"}${eachItem.amount}
                  </td>
                  <td>
                    <button
                      className="mx-5 text-green-500"
                      onClick={() => handelModel("edit", eachItem)}
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handelModel("delete", eachItem.id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      )}
    </div>
  );
}
