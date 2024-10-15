import DeleteModal from "../Components/DeleteModal";
import AddModel from "../Components/AddModal";
import EditModel from "../Components/EditModal";
import LogoutModal from "../Components/LogoutModal";
export default function ModalLayout({ openModal, handelModel, selectedData }) {
  return (
    <div>
      <DeleteModal
        isOpen={openModal.isDelete}
        handelFunction={handelModel}
        id={selectedData}
      />
      <AddModel
        isOpen={openModal.isAdd}
        handelFunction={handelModel}
        type="isAdd"
      />
      <EditModel
        isOpen={openModal.isEdit}
        type="isEdit"
        handelFunction={handelModel}
        data={selectedData}
      />
      <LogoutModal
        isOpen={openModal.isLogout}
        type="isLogout"
        handelFunction={handelModel}
      />
    </div>
  );
}
