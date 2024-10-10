export default function Input({ id, labelname, ...props }) {
  return (
    <div className=" flex flex-col gap-1">
      <label htmlFor={id}>{labelname}</label>
      <input id={id} {...props} required />
    </div>
  );
}
