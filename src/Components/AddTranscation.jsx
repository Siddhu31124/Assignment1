import Model from "../utils/Model";
import Input from "../utils/Input";
import { MdCancel } from "react-icons/md";
import dayjs from "dayjs";
export default function AddModel({ isOpen, type, handelFunction, data }) {
  console.log(data, type);
  return (
    <div>
      <Model isOpen={isOpen}>
        <form className="p-6 flex flex-col gap-4">
          <div className="flex justify-between">
            <h3>Add Transcation</h3>
            <button type="button" onClick={() => handelFunction(type)}>
              <MdCancel />
            </button>
          </div>
          <p>Fill The Transcation Details</p>
          <Input
            labelname="Transaction Name"
            type="text"
            id="transactionName"
            name="transaction_name"
            placeholder="Transaction Name"
            defaultValue={data ? data.transaction_name : ""}
          />
          <div>
            <label htmlFor="type">Transcation Type</label>
            <select id="type" defaultValue={data ? data.type : ""}>
              <option value="">Select Transcation Type</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>
          <div>
            <label htmlFor="category">Transcation Category</label>
            <select id="category" defaultValue={data ? data.category : ""}>
              <option value="">Select</option>
              <option value="Shopping">Shopping</option>
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
            defaultValue={data ? dayjs(data.date).format("DD/MM/YYYY") : ""}
          />
          <button onClick={() => handelFunction(type)}>Add Transcations</button>
        </form>
      </Model>
    </div>
  );
}
