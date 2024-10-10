import Model from "../utils/Model";
import { MdCancel } from "react-icons/md";
import { handleTransactionDelete } from "../Components/http";
import { useMutation } from "@tanstack/react-query";
import { CiWarning } from "react-icons/ci";
import { queryClient } from "../Components/http";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
export default function DeleteModal({ isOpen, handelFunction, id }) {
  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteFn"],
    mutationFn: handleTransactionDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transcation"],
      });
      handelFunction("delete");
      toast.success("Delete Sucessfully");
    },
  });
  function handelDelete(id) {
    mutate({ id });
  }
  return (
    <div>
      <Model isOpen={isOpen} style="deleteModel modal p-5">
        {isPending && (
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
        )}
        {!isPending && (
          <div>
            <div className="flex justify-between mb-2">
              <div className="flex gap-3 items-center">
                <CiWarning className=" text-orange-400 text-3xl font-bold" />
                <h3 className="font-bold text-xl">
                  Are You Sure You Want to delete ?
                </h3>
              </div>
              <button
                type="button"
                className="font-bold text-2xl"
                onClick={() => handelFunction("delete")}
              >
                <MdCancel />
              </button>
            </div>
            <p className="text-gray-400 mb-2">
              The Transcation is Deteted Immeditely It cannot be unde
            </p>
            <p className="flex gap-4 mb-1">
              <button
                className="border-2 p-2 rounded-lg text-sm"
                onClick={() => handelFunction("delete")}
              >
                No Leave it
              </button>
              <button
                className="bg-red-600 p-2 rounded-lg text-sm text-white"
                onClick={() => handelDelete(id)}
              >
                Delete
              </button>
            </p>
          </div>
        )}
      </Model>
    </div>
  );
}
