import MobileDetailsList from "./MobileDetailsList";

export default function MobileDetailsContainer({ data }) {
  return (
    <ul className="lg:hidden flex flex-col items-center gap-4">
      <>
        {data.transactions.map((eachItems) => (
          <MobileDetailsList eachItems={eachItems} />
        ))}
      </>
    </ul>
  );
}
