import dayjs from "dayjs";
import toast from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import Modal from "../utils/Modal";
import Input from "../utils/Input";
import { handelEditTransaction } from "./http";
import { queryClient } from "./http";
import Loader from "../utils/Loader";
import { QUERY_KEY } from "../Constants";

export default function EditModal({ isOpen, type, handelFunction, data }) {
  const [inputValues, setInputValues] = useState(data);
  useEffect(() => {
    setInputValues(data);
  }, [data]);
  let mutateFun = handelEditTransaction;
  const { mutate, isPending } = useMutation({
    mutationFn: mutateFun,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
      handelFunction(type);
      toast.success(`Updated Successfully`);
    },
  });

  function handelChange(event, val) {
    setInputValues((prevVal) => {
      return { ...prevVal, [val]: event.target.value };
    });
  }

  function handelEditData(event, id) {
    event.preventDefault();
    let data = new FormData(event.target);
    let formData = Object.fromEntries(data.entries());
    mutate({ data: formData, id: id });
  }
  console.log(data);
  if (isPending) {
    return (
      <Modal isOpen={isOpen} style="InputModal modal p-5">
        <div className="Loader">
          <Loader />
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} style="InputModal modal p-5">
      <form
        className="p-6 flex flex-col gap-4"
        onSubmit={() => handelEditData(event, data.id)}
      >
        <div className="flex justify-between">
          <h3 className="font-bold text-2xl">Add Transaction</h3>

          <button
            type="button"
            onClick={() => handelFunction(type)}
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
          onChange={() => handelChange(event, "transaction_name")}
        />
        <div className=" flex flex-col gap-1">
          <label htmlFor="type">Transaction Type</label>
          <select
            id="type"
            name="type"
            value={inputValues ? inputValues.type : ""}
            onChange={() => handelChange(event, "type")}
            required
          >
            <option value="">Select Transaction Type</option>
            <option value="credit">credit</option>
            <option value="debit">debit</option>
          </select>
        </div>
        <div className=" flex flex-col gap-1">
          <label htmlFor="category">Transaction Category</label>
          <select
            id="category"
            name="category"
            required
            value={inputValues ? inputValues.category : ""}
            onChange={() => handelChange(event, "category")}
          >
            <option value="">Select</option>
            <option value="shopping">Shopping</option>
            <option value="Transfer">Transfer</option>
            <option value="Service">Service</option>
            <option value="Rent">Rent</option>
            <option value="food">food</option>
          </select>
        </div>
        <Input
          label_name="Amount"
          type="number"
          id="amount"
          name="amount"
          placeholder="Amount"
          value={inputValues ? inputValues.amount : ""}
          onChange={() => handelChange(event, "amount")}
        />
        <Input
          label_name="Date"
          type="date"
          id="date"
          name="date"
          placeholder="Date"
          value={
            inputValues ? dayjs(inputValues.date).format("YYYY-MM-DD") : ""
          }
          onChange={() => handelChange(event, "date")}
        />
        <button className="bg-blue-600 p-2 text-white font-bold rounded-lg">
          Edit Transactions
        </button>
      </form>
    </Modal>
  );
}
