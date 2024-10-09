export default function Input({ id, labelname, ...props }) {
  return (
    <div>
      <label htmlFor={id}>{labelname}</label>
      <input id={id} {...props} />
    </div>
  );
}
