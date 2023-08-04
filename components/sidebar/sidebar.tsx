"use client";

import Menu from "@/components/menu/menu";
import { useRooms } from "@/lib/fetcher";
import { IconPencilSquare, IconThreeDots } from "@/source/assets/IconSvg";
import { RootState } from "@/store/store";
import { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import Room from "../common/Room";
import Avatar from "../common/avatar";
import SearchInput from "../global/SearchInput";
import Loading from "../global/loading";
import GroupUserList from "./groupUserList";
import UserList from "./userList";

interface Props {
  activeMenu: boolean;
  setActiveMenu: Dispatch<SetStateAction<boolean>>;
}

function Sidebar({ activeMenu, setActiveMenu }: Props) {
  const { user } = useSelector((state: RootState) => state.userState);
  const [activeUserList, setActiveUserList] = useState({
    search: false,
    group: false,
  });

  const { isLoading, isError, rooms } = useRooms(user.id);

  return (
    <>
      <div className="my-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <Avatar name="Kajol Roy" />
            <h2 className="text-white font-medium">Chats</h2>
          </div>
          <div className="flex gap-5 items-center">
            <button
              title="Create group"
              onClick={() => setActiveUserList((s) => ({ ...s, group: true }))}
              className="outline-none text-white hover:bg-slate-700 transition p-[6px] rounded-full"
            >
              <IconPencilSquare />
            </button>
            <div className="text-gray-300 flex items-center relative">
              <button
                onClick={() => setActiveMenu((s) => !s)}
                className="outline-none  hover:bg-slate-700 transition p-[6px] rounded-full"
              >
                <IconThreeDots />
              </button>
              <div
                onClick={(e) => e.stopPropagation()}
                className={`absolute ${
                  activeMenu
                    ? "visible opacity-100 scale-100"
                    : "invisible opacity-0 scale-0"
                } origin-top-right transition-all top-full w-52 right-0 bg-[#1b2a33] rounded z-30`}
              >
                <Menu />
              </div>
            </div>
          </div>
        </div>
        <SearchInput
          onClick={() => {
            setActiveMenu(false);
            setActiveUserList((s) => ({ ...s, search: true }));
          }}
          placeholder="Search or start new chat"
        />
        {/* search user list */}
        <div
          onClick={() => setActiveUserList((s) => ({ ...s, search: false }))}
          className={`absolute top-0 left-0 w-full bg-[#00000077] h-screen ${
            activeUserList.search ? "flex" : "hidden"
          } items-center justify-center`}
        >
          <UserList setActiveUserList={setActiveUserList} />
        </div>
        {/* Group user list */}
        <div
          onClick={() => setActiveUserList((s) => ({ ...s, group: false }))}
          className={`absolute top-0 left-0 w-full bg-[#00000077] h-screen ${
            activeUserList.group ? "flex" : "hidden"
          } items-center justify-center`}
        >
          <GroupUserList setActiveUserList={setActiveUserList} />
        </div>
      </div>
      {isLoading ? (
        <div className="my-10">
          <Loading />
        </div>
      ) : null}
      {/* Render All rooms */}
      <div onClick={() => setActiveMenu(false)} className="flex flex-col">
        {rooms ? rooms.map((x, i) => <Room item={x} key={i} />) : null}
      </div>
    </>
  );
}

export default Sidebar;
