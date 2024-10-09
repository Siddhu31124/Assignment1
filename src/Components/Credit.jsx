import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./http";
import { CiCircleChevUp } from "react-icons/ci";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import dayjs from "dayjs";
import { TailSpin } from "react-loader-spinner";
export default function Credit() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["Alltrancation"],
    queryFn: fetchData,
  });
  let creditArray = [];
  if (data) {
    creditArray = data.transactions.filter((each) => each.type === "credit");
  }
  return (
    <div className="transcationmain">
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
      {isError && (
        <div className="errorMessage">
          <h1 className="text-3xl font-bold text-red-600">
            Failed To Fetch Data
          </h1>
        </div>
      )}
      {data && (
        <main className="transcationTable">
          <table>
            <thead>
              <tr className="transcationDetails">
                <th>Transaction Name</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {creditArray.map((eachItem) => (
                <tr key={eachItem.id} className="transcationDetails">
                  <td className="Arrow">
                    <CiCircleChevUp className="text-2xl text-green-600" />
                    {eachItem.transaction_name}
                  </td>
                  <td>{eachItem.category}</td>
                  <td>{dayjs(eachItem.data).format("YY MMM, hh:mm A")}</td>
                  <td className=" text-green-600">+${eachItem.amount}</td>
                  <td>
                    <button className="mx-5 text-green-500">
                      <FaPencilAlt />
                    </button>
                    <button className="text-red-500">
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
