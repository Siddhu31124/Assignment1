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
export const DeleteLoader = () => {
  return (
    <div className="pt-4 pl-56 mr-2">
      <TailSpin
        visible={true}
        height="50"
        width="50"
        color="blue"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
