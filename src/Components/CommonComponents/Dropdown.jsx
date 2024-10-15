export default function Dropdown({ itemsName, inputId, types, ...props }) {
  return (
    <div className=" flex flex-col gap-1 font-normal">
      <label htmlFor={inputId}>
        {types ? "Transaction Type" : "Transaction Category"}
      </label>
      <select id={inputId} name={inputId} {...props} required>
        <option value="">{types ? "Select Transaction Type" : "Select"}</option>
        {itemsName.map((each) => (
          <option key={each.name} value={each.name}>
            {each.name}
          </option>
        ))}
      </select>
    </div>
  );
}
