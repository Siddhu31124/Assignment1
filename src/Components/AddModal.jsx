import Modal from "../utils/Modal";
import Input from "../utils/Input";
import { MdCancel } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { handelAddTransaction } from "./http";
import { queryClient } from "./http";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
export default function AddModal({ isOpen, type, handelFunction, data }) {
  let mutateFun = handelAddTransaction;
  const { mutate, isPending } = useMutation({
    mutationFn: mutateFun,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transaction"],
      });
      handelFunction(type);
      toast.success(`Added Successfully`);
    },
  });
  function handelAddData(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    let formData = Object.fromEntries(data.entries());
    mutate({ data: formData });
  }
  return (
    <div>
      <Modal isOpen={isOpen} style="InputModal modal p-5">
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
        {!isPending && (
          <form className="p-6 flex flex-col gap-4" onSubmit={handelAddData}>
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
            <p>Fill The Transaction Details</p>
            <Input
              label_name="Transaction Name"
              type="text"
              id="transactionName"
              name="name"
              placeholder="Transaction Name"
            />
            <div className=" flex flex-col gap-1">
              <label htmlFor="type">Transaction Type</label>
              <select id="type" name="type" required>
                <option value="">Select Transaction Type</option>
                <option value="credit">credit</option>
                <option value="debit">debit</option>
              </select>
            </div>
            <div className=" flex flex-col gap-1">
              <label htmlFor="category">Transaction Category</label>
              <select id="category" name="category" required>
                <option value="">Select</option>
                <option value="shopping">Shopping</option>
                <option value="Transfer">Transfer</option>
                <option value="Service">Service</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
            <Input
              label_name="Amount"
              type="number"
              id="amount"
              name="amount"
              placeholder="Amount"
              defaultValue={data ? data.amount : ""}
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
        )}
      </Modal>
    </div>
  );
}
