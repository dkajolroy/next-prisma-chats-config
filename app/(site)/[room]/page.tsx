"use client";

import MessageHeading from "@/components/common/messageHeading";
import SocketContext from "@/components/context/socketContext";
import MessageInput from "@/components/global/messageInput";
import { useRoom } from "@/lib/fetcher";
import { IconEmojiSmile, IconLink } from "@/source/assets/IconSvg";
import { RootState } from "@/store/store";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";

interface Props {
  params: { room: string };
}
function Page({ params }: Props) {
  const { user } = useSelector((state: RootState) => state.userState);
  const { isError, isLoading, mutate, room } = useRoom(params.room);
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket?.emit("join-room", { userId: user.id, roomId: room?.id });
    // mutate();
    socket?.on("receive-message", (message) => {
      console.log(message);
    });
  }, [room, socket]);
  return (
    <>
      <div className="px-5">
        {/* Message Heading */}
        <MessageHeading />
        <div className="flex-col flex">
          {/* {message.map((item, i) => (
        <Message key={i} item={item} />
      ))} */}
        </div>
      </div>
      {/* Write a message */}
      <div className="flex px-5 py-2 gap-4 bg-[#111b21] items-center ">
        <div className="flex  items-center gap-8">
          <button className="text-gray-400 text-xl hover:text-white">
            <IconEmojiSmile />
          </button>
          <button className="text-gray-400 text-xl hover:text-white">
            <IconLink />
          </button>
        </div>
        <>
          <MessageInput room={room} />
        </>
      </div>
    </>
  );
}

export default Page;
