import { MdCancel } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { CiWarning } from "react-icons/ci";
import toast from "react-hot-toast";

import { queryClient } from "../Components/http";
import { DeleteLoader } from "../utils/Loader";
import { handleTransactionDelete } from "../Components/http";
import { QUERY_KEY } from "../Constants";
import Modal from "../utils/Modal";

export default function DeleteModal({ isOpen, handelFunction, id }) {
  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteFn"],
    mutationFn: handleTransactionDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
      });
      handelFunction("isDelete");
      toast.success("Delete Successfully");
    },
  });

  function handelDelete(id) {
    mutate({ id });
  }

  if (isPending) {
    return (
      <Modal isOpen={isOpen} style="deleteModel modal p-5">
        <DeleteLoader />
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} style="deleteModel modal p-5">
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
          onClick={() => handelFunction("isDelete")}
        >
          <MdCancel />
        </button>
      </div>
      <p className="text-gray-400 mb-2">
        The Transaction is Deleted Immeditely It cannot be undo
      </p>
      <p className="flex gap-4 mb-1">
        <button
          className="border-2 p-2 rounded-lg text-sm"
          onClick={() => handelFunction("isDelete")}
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
    </Modal>
  );
}
