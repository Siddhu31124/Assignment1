import TrancationHeader from "../Components/TransactionHeader";
import { Outlet } from "react-router";
export default function TrancationrootPage() {
  return (
    <div className="transroot">
      <TrancationHeader />
      <Outlet />
    </div>
  );
}
