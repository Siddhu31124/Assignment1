import Model from "../utils/Model";
import Input from "../utils/Input";
import { MdCancel } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { handelAddTranscation } from "./http";
import { handelEditTranscation } from "./http";
import { queryClient } from "./http";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
export default function AddModel({ isOpen, type, handelFunction, data }) {
  const [inputValues, setInputValues] = useState(data);
  console.log(data, inputValues);
  useEffect(() => {
    setInputValues(data);
  }, [data]);
  let mutateFun = handelAddTranscation;
  if (type === "edit") {
    mutateFun = handelEditTranscation;
  }
  const { mutate, isPending } = useMutation({
    mutationFn: mutateFun,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transcation"],
      });
      handelFunction(type);
      toast.success(`${type === "add" ? "Added" : "Updated"} Sucessfully`);
    },
  });
  function handelChange(event, val) {
    setInputValues((prevVal) => {
      return { ...prevVal, [val]: event.target.value };
    });
  }
  function handelAddEditData(event, id) {
    event.preventDefault();
    let data = new FormData(event.target);
    let formData = Object.fromEntries(data.entries());
    mutate({ data: formData, id: id });
  }
  return (
    <div>
      <Model isOpen={isOpen} style="InputModel modal p-5">
        {isPending && (
          <div className="Loder">
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
        {!isPending && (
          <form
            className="p-6 flex flex-col gap-4"
            onSubmit={() => handelAddEditData(event, data.id)}
          >
            <div className="flex justify-between">
              <h3 className="font-bold text-2xl">Add Transcation</h3>

              <button
                type="button"
                onClick={() => handelFunction(type)}
                className="font-bold text-2xl"
              >
                <MdCancel />
              </button>
            </div>
            <p>Fill The Transcation Details</p>
            <Input
              labelname="Transaction Name"
              type="text"
              id="transactionName"
              name="name"
              placeholder="Transaction Name"
              defaultValue={data ? data.transaction_name : ""}
            />
            <div className=" flex flex-col gap-1">
              <label htmlFor="type">Transcation Type</label>
              <select
                id="type"
                name="type"
                // defaultValue={data && data.type}
                value={inputValues && inputValues.type}
                onChange={() => handelChange(event, "type")}
                required
              >
                <option value="">Select Transcation Type</option>
                <option value="credit">credit</option>
                <option value="debit">debit</option>
              </select>
            </div>
            <div className=" flex flex-col gap-1">
              <label htmlFor="category">Transcation Category</label>
              <select
                id="category"
                name="category"
                required
                // defaultValue={data && data.category}
                value={inputValues && inputValues.category}
                onChange={() => handelChange(event, "category")}
              >
                <option value="">Select</option>
                <option value="shopping">Shopping</option>
                <option value="Transfer">Transfer</option>
                <option value="Service">Servics</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
            <Input
              labelname="Amount"
              type="number"
              id="amount"
              name="amount"
              placeholder="Amount"
              defaultValue={data ? data.amount : ""}
            />
            <Input
              labelname="Date"
              type="date"
              id="date"
              name="date"
              placeholder="Date"
              value={
                inputValues ? dayjs(inputValues.date).format("DD/MM/YYYY") : ""
              }
              onChangefun={handelChange}
            />
            <button className="bg-blue-600 p-2 text-white font-bold rounded-lg">
              Add Transcations
            </button>
          </form>
        )}
      </Model>
    </div>
  );
}
