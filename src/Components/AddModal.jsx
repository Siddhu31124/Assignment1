import { useMutation } from "@tanstack/react-query";
import { MdCancel } from "react-icons/md";
import toast from "react-hot-toast";
import { useContext } from "react";

import { queryClient, handelAddTransaction } from "../http";
import Loader from "./CommonComponents/Loader";
import Modal from "./CommonComponents/Modal";
import Input from "./CommonComponents/Input";
import { QUERY_KEY } from "../Constants";
import { ModalContext } from "../store/ModalContext";
import Dropdown from "./CommonComponents/Dropdown";
import { TRANSACTION_CATEGORY, TRANSACTION_TYPE } from "../Constants";

export default function AddModal() {
  const context = useContext(ModalContext);
  let mutateFun = handelAddTransaction;
  const { mutate, isPending } = useMutation({
    mutationFn: mutateFun,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
      closeModalFunction(typeOfModal);
      toast.success("Added Successfully");
    },
  });

  const isOpen = context.ModalStates.isAdd;
  const closeModalFunction = context.handelCloseModal;
  const typeOfModal = "isAdd";

  function handelAddData(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    let formData = Object.fromEntries(data.entries());
    mutate({ data: formData });
  }

  if (isPending) {
    return (
      <Modal isOpen={isOpen} style="inputModal modal p-5">
        <div className="loader">
          <Loader />
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} style="inputModal modal p-5">
      <form
        className="p-6 flex flex-col gap-4 text-gray-500 font-normal"
        onSubmit={handelAddData}
      >
        <div className="flex justify-between">
          <h3 className="font-bold text-2xl text-black">Add Transaction</h3>

          <button
            type="button"
            onClick={() => closeModalFunction(typeOfModal)}
            className="font-bold text-2xl"
          >
            <MdCancel />
          </button>
        </div>
        <p>Fill The Transaction Details</p>
        <Input
          label_name="Enter Name"
          type="text"
          id="transactionName"
          name="name"
          placeholder="Transaction Name"
        />
        <Dropdown inputId="type" itemsName={TRANSACTION_TYPE} types />
        <Dropdown inputId="type" itemsName={TRANSACTION_CATEGORY} />
        <Input
          label_name="Amount"
          type="number"
          id="amount"
          name="amount"
          placeholder="Amount"
        />
        <Input
          label_name="Date"
          type="date"
          id="date"
          name="date"
          placeholder="Date"
        />
        <button className="bg-blue-600 p-2 text-white font-bold rounded-lg">
          Add Transactions
        </button>
      </form>
    </Modal>
  );
}
