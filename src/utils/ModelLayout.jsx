import DeleteModal from "../Components/DeleteModal";
import AddModel from "../Components/AddModal";
import EditModel from "../Components/EditModal";
import LogoutModal from "../Components/LogoutModal";
export default function ModalLayout({ openModal, handelModel, selectedData }) {
  return (
    <div>
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
      <LogoutModal
        isOpen={openModal.logout}
        type="logout"
        handelFunction={handelModel}
      />
    </div>
  );
}
