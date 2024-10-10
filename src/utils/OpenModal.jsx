import DeleteModal from "../Components/DeleteModal";
import AddModal from "../Components/AddModal";
import EditModal from "../Components/EditModal";
export default function OpenModal() {
  return (
    <>
      <DeleteModal
        isOpen={openModal.delete}
        handelFunction={handelModel}
        id={selectedData}
      />
      <AddModel
        isOpen={openModal.add}
        handelFunction={handelModel}
        type="add"
      />
      <EditModel
        isOpen={openModal.edit}
        type="edit"
        handelFunction={handelModel}
        data={selectedData}
      />
    </>
  );
}
