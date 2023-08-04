"use client";
import { RootState } from "@/store/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import Avatar from "./avatar";

interface Props {
  item: ResRooms;
}
function Room({ item }: Props) {
  const { user } = useSelector((state: RootState) => state.userState);
  const receiver = item.members.filter((member) => member.id !== user.id);

  // Group chats user
  if (receiver.length > 1) {
    return (
      <Link
        href={`/${item.id}`}
        className="flex  py-2 px-2 rounded cursor-pointer hover:bg-[#1b2a33] transition justify-between items-center"
      >
        <div className="flex gap-2 items-center">
          <Avatar name={item.name} size="w-9 h-9" />
          <div className="flex flex-col">
            <h2 className="text-sm text-white">{item.name}</h2>
            <span className="text-sm text-gray-400">message</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs">{item.updated_at}</span>
        </div>
      </Link>
    );
  }
  // single chats user
  return (
    <Link
      href={`/${item.id}`}
      className="flex  py-2 px-2 rounded cursor-pointer hover:bg-[#1b2a33] transition justify-between items-center"
    >
      <div className="flex gap-2 items-center">
        <Avatar
          name={item.name ? item.name : (receiver[0].name as string)}
          size="w-9 h-9"
        />
        <div className="flex flex-col">
          <h2 className="text-sm text-white">
            {item.name ? item.name : receiver[0].name}
          </h2>
          <span className="text-sm text-gray-400">message</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-400 text-xs">{item.updated_at}</span>
      </div>
    </Link>
  );
}

export default Room;
