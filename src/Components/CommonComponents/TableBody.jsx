import dayjs from "dayjs";
import { CiCircleChevUp } from "react-icons/ci";
import { CiCircleChevDown } from "react-icons/ci";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useContext } from "react";
import { ModalContext } from "../../store/ModalContext";
import { DATA_FORMAT, TYPE_OF_TRANSACTION_CREDIT } from "../../Constants";

//No magic strings
export default function TableBody({ data }) {
  const context = useContext(ModalContext);
  return (
    <tbody>
      {data.transactions.map((eachItem) => (
        <tr key={eachItem.id} className="transaction_details">
          <td className="arrow">
            {eachItem.type === TYPE_OF_TRANSACTION_CREDIT ? (
              <CiCircleChevUp className="text-2xl text-green-600" />
            ) : (
              <CiCircleChevDown className="text-2xl text-red-600" />
            )}
            {eachItem.transaction_name}
          </td>
          <td>{eachItem.category}</td>
          <td>{dayjs(eachItem.data).format(DATA_FORMAT)}</td>
          <td
            className={
              eachItem.type === TYPE_OF_TRANSACTION_CREDIT
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {eachItem.type === TYPE_OF_TRANSACTION_CREDIT ? "+" : "-"}$
            {eachItem.amount}
          </td>
          <td>
            <button
              className="mx-5 text-green-500"
              onClick={() => context.handelOpenModal("isEdit", eachItem)}
            >
              <FaPencilAlt />
            </button>
            <button
              className="text-red-500"
              onClick={() => context.handelOpenModal("isDelete", eachItem.id)}
            >
              <MdDelete />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
