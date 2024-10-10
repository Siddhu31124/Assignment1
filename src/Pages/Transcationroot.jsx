import TransactionHeader from "../Components/TransactionHeader";
import { Outlet } from "react-router";
export default function TransactionRootPage() {
  return (
    <div className="transaction_root">
      <TransactionHeader />
      <Outlet />
    </div>
  );
}
