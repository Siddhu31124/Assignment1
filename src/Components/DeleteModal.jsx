import Model from "../utils/Model";
import { MdCancel } from "react-icons/md";
export default function DeleteModal({ isOpen, handelFunction }) {
  return (
    <div>
      <Model isOpen={isOpen}>
        <div className="flex justify-between">
          <h3>Add Transcation</h3>
          <button type="button" onClick={() => handelFunction("delete")}>
            <MdCancel />
          </button>
        </div>
        <p>
          <button onClick={() => handelFunction("delete")}>No Leave it</button>
          <button onClick={() => handelFunction("delete")}>Delete</button>
        </p>
      </Model>
    </div>
  );
}
