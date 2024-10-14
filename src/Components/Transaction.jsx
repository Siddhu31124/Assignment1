import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { fetchData } from "./http";
import TableRow from "../utils/TableData";
import Loader from "../utils/Loader";
import { TableHead } from "../utils/TableData";
import ModalLayout from "../utils/ModelLayout";
import { ModalContext } from "../store/ModalContext";
import { queryKey, failError } from "../Constants";

export default function Transaction() {
  const context = useContext(ModalContext);
  const { data, isPending, isError } = useQuery({
    queryKey: [queryKey, "all"],
    queryFn: fetchData,
  });
  let content;
  if (data) {
    content = (
      <main className="transaction_table">
        <table>
          <TableHead />
          <TableRow data={data} handelModel={context.handelModel} />
        </table>
      </main>
    );
  }

  if (isError) {
    content = (
      <div className="errorMessage">
        <h1 className="text-3xl font-bold text-red-600">{failError}</h1>
      </div>
    );
  }

  if (isPending) {
    content = <Loader />;
  }

  return (
    <div className="transaction_main">
      <ModalLayout
        openModal={context.openModal}
        selectedData={context.selectedData}
        handelModel={context.handelModel}
      />
      {content}
    </div>
  );
}
