"use client";
import { IconSend } from "@/source/assets/IconSvg";
import { useContext, useState } from "react";
import SocketContext from "../context/socketContext";

interface Props {
  room: ResRooms | undefined;
}
function MessageInput({ room }: Props) {
  const [inputMassage, setInputMassage] = useState("");
  const socket = useContext(SocketContext);
  function submit() {
    socket?.emit("send-message", { message: inputMassage, roomId: room?.id });
  }
  return (
    <div className="flex items-center bg-[#17242c] rounded px-4 gap-6 w-full ">
      <input
        type="text"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            submit();
          }
        }}
        onChange={(e) => setInputMassage(e.target.value)}
        placeholder="Type a message..."
        className="bg-transparent  w-full  font-light outline-none  transition text-gray-300 p-[6px]"
      />
      <button
        onClick={submit}
        className="text-gray-400 text-xl hover:text-white"
      >
        <IconSend />
      </button>
    </div>
  );
}

export default MessageInput;
