export default function Input({ id, label_name, ...props }) {
  return (
    <div className=" flex flex-col gap-1">
      <label htmlFor={id}>{label_name}</label>
      <input id={id} {...props} required />
    </div>
  );
}
