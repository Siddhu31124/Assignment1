import { TailSpin } from "react-loader-spinner";
export default function Loader() {
  return (
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
  );
}
export const DashBoardLoader = () => {
  return (
    <div className="ml-96 pl-12 pt-28">
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
  );
};
