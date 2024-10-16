import { TailSpin } from "react-loader-spinner";
export default function Loader({ height = 80, width = 80 }) {
  return (
    <TailSpin
      visible={true}
      height={height}
      width={width}
      color="blue"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
