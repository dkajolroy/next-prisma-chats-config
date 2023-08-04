import { IconSearch } from "@/source/assets/IconSvg";
import { ChangeEventHandler, MouseEventHandler } from "react";

interface Props {
  onClick?: MouseEventHandler<HTMLInputElement> | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder?: string;
}
function SearchInput({ onClick, placeholder, onChange }: Props) {
  return (
    <div className="flex border-b-2 my-4 hover:bg-[#121b20] border-emerald-600 bg-[#0b1216] items-center justify-between">
      <input
        placeholder={placeholder}
        onClick={onClick}
        onChange={onChange}
        type="text"
        className=" w-full group/search_input text-sm bg-transparent font-light outline-none transition text-gray-300 py-1 px-2"
      />
      <button className="text-white px-2">
        <IconSearch />
      </button>
    </div>
  );
}

export default SearchInput;
