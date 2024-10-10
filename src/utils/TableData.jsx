import dayjs from "dayjs";
import { CiCircleChevUp } from "react-icons/ci";
import { CiCircleChevDown } from "react-icons/ci";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function TableRow({ data, handelModel }) {
  return (
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
              eachItem.type === "credit" ? "text-green-600" : "text-red-600"
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
  );
}

export function TableHead() {
  return (
    <thead>
      <tr className="transaction_details">
        <th>Transaction Name</th>
        <th>Category</th>
        <th>Date</th>
        <th>Amount</th>
      </tr>
    </thead>
  );
}
