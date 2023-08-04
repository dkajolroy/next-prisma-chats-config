interface Props {
  item: {
    from: string;
    to: string;
    message: string;
  };
}
function Message({ item }: Props) {
  const myName = "Kajol";
  return (
    <div
      className={`flex ${
        item.from === myName ? "justify-end" : "justify-start"
      } my-2`}
    >
      <div className="w-fit max-w-[60%] pt-1 pb-2 pr-14 rounded relative  px-2 bg-emerald-700">
        <span className="text-sm text-white">{item.message}</span>
        <span className="text-gray-300 text-xs absolute right-1 bottom-[2px] font-thin">
          02:66pm
        </span>
      </div>
    </div>
  );
}

export default Message;
