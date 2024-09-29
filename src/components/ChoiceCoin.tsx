type ChoiceCoinProps = {
  choice: string;
};

export const ChoiceCoin = ({ choice }: ChoiceCoinProps) => {
  if (choice === "?")
    return (
      <div className="bg-stone-800 p-3 w-60 rounded-full flex justify-center items-center">
        <span className="text-stone-100 text-9xl">?</span>
      </div>
    );
  return <img className="bg-stone-800 p-3 w-60 rounded-full" src={choice} />;
};