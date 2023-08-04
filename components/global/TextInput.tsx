import { ChangeEventHandler, MouseEventHandler } from "react";

interface Props {
  onClick?: MouseEventHandler<HTMLInputElement> | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder?: string;
}
function TextInput({ onClick, placeholder, onChange }: Props) {
  return (
    <input
      placeholder={placeholder}
      onClick={onClick}
      onChange={onChange}
      type="text"
      className="bg-[#243138] w-full text-sm font-light outline-none focus:bg-[#30424b] transition text-gray-300 px-2 py-[3px]"
    />
  );
}

export default TextInput;
