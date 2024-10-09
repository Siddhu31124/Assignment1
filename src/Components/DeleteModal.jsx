import Model from "../utils/Model";
export default function DeleteModal({ isOpen, handelFunction }) {
  return (
    <Model isOpen={isOpen}>
      <h1>
        Arey You Sure Yo Want To Delete <button>sure</button>
      </h1>
      <p>
        <button onClick={handelFunction}>cancel</button>
      </p>
    </Model>
  );
}
