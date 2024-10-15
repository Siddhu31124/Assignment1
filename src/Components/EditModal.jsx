import dayjs from "dayjs";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect, useContext } from "react";

import Modal from "./CommonComponents/Modal";
import Input from "./CommonComponents/Input";
import { handelEditTransaction, queryClient } from "../http";
import Loader from "./CommonComponents/Loader";
import { QUERY_KEY } from "../Constants";
import { ModalContext } from "../store/ModalContext";
import Dropdown from "./CommonComponents/Dropdown";
import {
  TRANSACTION_CATEGORY,
  TRANSACTION_TYPE,
  DATA_FORMAT,
} from "../Constants";

export default function EditModal() {
  const context = useContext(ModalContext);
  const isOpen = context.ModalStates.isEdit;
  const closeModalFunction = context.handelCloseModal;
  const editTransactionData = context.selectedData;
  const typeOfModal = "isEdit";

  const [inputValues, setInputValues] = useState(editTransactionData);

  useEffect(() => {
    setInputValues(editTransactionData);
  }, [editTransactionData]);

  const mutateFun = handelEditTransaction;
  const { mutate, isPending } = useMutation({
    mutationFn: mutateFun,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
      closeModalFunction(typeOfModal);
      toast.success(`Updated Successfully`);
    },
  });

  function handelChange(event, typeInput) {
    setInputValues((prevVal) => {
      return { ...prevVal, [typeInput]: event.target.value };
    });
  }

  function handelEditData(event, id) {
    event.preventDefault();
    let data = new FormData(event.target);
    let formData = Object.fromEntries(data.entries());
    mutate({ data: formData, id: id });
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
        className="p-6 flex flex-col gap-4"
        onSubmit={(event) => handelEditData(event, editTransactionData.id)}
      >
        <div className="flex justify-between">
          <h3 className="font-bold text-2xl">Edit Transaction</h3>

          <button
            type="button"
            onClick={() => closeModalFunction(typeOfModal)}
            className="font-bold text-2xl"
          >
            <MdCancel />
          </button>
        </div>

        <p>Fill The Edit Details</p>

        <Input
          label_name="Transaction Name"
          type="text"
          id="transactionName"
          name="name"
          placeholder="Transaction Name"
          value={inputValues ? inputValues.transaction_name : ""}
          onChange={(event) => handelChange(event, "transaction_name")}
        />

        <Dropdown
          inputId="type"
          itemsName={TRANSACTION_TYPE}
          types
          value={inputValues ? inputValues.type : ""}
          onChange={(event) => handelChange(event, "type")}
        />

        <Dropdown
          inputId="category"
          itemsName={TRANSACTION_CATEGORY}
          types
          value={inputValues ? inputValues.category : ""}
          onChange={(event) => handelChange(event, "category")}
        />

        <Input
          label_name="Amount"
          type="number"
          id="amount"
          name="amount"
          placeholder="Amount"
          value={inputValues ? inputValues.amount : ""}
          onChange={(event) => handelChange(event, "amount")}
        />

        <Input
          label_name="Date"
          type="date"
          id="date"
          name="date"
          placeholder="Date"
          value={inputValues ? dayjs(inputValues.date).format(DATA_FORMAT) : ""}
          onChange={(event) => handelChange(event, "date")}
        />

        <button className="bg-blue-600 p-2 text-white font-bold rounded-lg">
          Edit Transactions
        </button>
      </form>
    </Modal>
  );
}
