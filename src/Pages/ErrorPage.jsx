import { ERROR_PAGE_MSG } from "../Constants";
export default function ErrorPage() {
  return (
    <div className="flex flex-col gap-8 content-center items-center">
      <h1 className="mt-10 align-middle text-black text-2xl">
        {ERROR_PAGE_MSG}
      </h1>
      <img
        src="https://indexsy.com/wp-content/uploads/2023/05/What-is-404-error.jpg"
        alt="errorPage"
      />
    </div>
  );
}
