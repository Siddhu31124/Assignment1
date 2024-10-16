import TableBody from "./TableBody";
export default function DashBoardTable({ data }) {
  return (
    <table className="transaction_table_dashboard">
      <TableBody data={data} />
    </table>
  );
}
