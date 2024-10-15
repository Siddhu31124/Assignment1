import DeleteModal from "../DeleteModal";
import AddModel from "../AddModal";
import EditModel from "../EditModal";
import LogoutModal from "../LogoutModal";

export default function ModalLayout() {
  return (
    <div>
      <DeleteModal />
      <AddModel />
      <EditModel />
      <LogoutModal />
    </div>
  );
}
