"use client";
import { useUsers } from "@/lib/fetcher";
import { RootState } from "@/store/store";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useSelector } from "react-redux";
import SearchInput from "../global/SearchInput";
import Loading from "../global/loading";
interface Props {
  setActiveUserList: React.Dispatch<
    React.SetStateAction<{
      search: boolean;
      group: boolean;
    }>
  >;
}
function GroupUserList({ setActiveUserList }: Props) {
  const { user } = useSelector((state: RootState) => state.userState);
  const { isLoading, users } = useUsers(user.id);

  const [addedUsers, setAddedUsers] = useState<ResUser[]>([]);
  function broadcastSearch(searchText: string) {
    // Search
    console.log(searchText);
  }
  function createGroup() {
    // addUsers
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="lg:w-3/6 bg-[#21313b] p-2 h-[calc(100vh-100px)] rounded "
    >
      <h2 className="text-white text-2xl text-center">Create Group</h2>
      <div className="w-3/4 mx-auto">
        <SearchInput
          onChange={({ target }) => broadcastSearch(target.value)}
          placeholder="Search name/email/username..."
        />
      </div>
      {/* Map added users */}
      <div className="flex items-center gap-1  flex-wrap">
        {addedUsers.length
          ? addedUsers.map((u, i) => (
              <AddedUserItem
                addUsers={addedUsers}
                setAddedUsers={setAddedUsers}
                user={u}
                key={i}
              />
            ))
          : null}
        {addedUsers.length ? (
          <button className="text-white rounded focus:outline-none hover:bg-emerald-700 transition bg-emerald-600 px-2 py-1 text-sm">
            Create group
          </button>
        ) : null}
      </div>

      {isLoading && (
        <div className="mt-28">
          <Loading />
        </div>
      )}
      <div className="grid lg:grid-cols-2 my-2 grid-cols-1 gap-1">
        {/* Map user list */}
        {users &&
          users.map((item, i) => (
            <User
              setActiveUserList={setActiveUserList}
              key={i}
              user={item}
              setAddedUsers={setAddedUsers}
              addedUsers={addedUsers}
            />
          ))}
      </div>
    </div>
  );
}

export default GroupUserList;

interface UserProps {
  user: ResUser;
  setAddedUsers: Dispatch<SetStateAction<ResUser[]>>;
  setActiveUserList: React.Dispatch<
    React.SetStateAction<{
      search: boolean;
      group: boolean;
    }>
  >;
  addedUsers: ResUser[];
}
function User({ setAddedUsers, addedUsers, user }: UserProps) {
  return (
    <>
      <div className="flex cursor-pointer bg-slate-700 items-center justify-between p-2">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col">
            {!user.image ? (
              <div className="flex items-center w-9 h-9 rounded-full bg-slate-800 justify-center">
                <span className="text-slate-400">
                  {user.name && user.name.slice(0, 1)}
                </span>
              </div>
            ) : (
              <Image src={user.image} width={50} height={50} alt="icon" />
            )}
          </div>
          <div className="flex flex-col">
            <h2 className="text-white">{user.name && user.name}</h2>
          </div>
        </div>
        <button
          onClick={() => {
            const existUser = addedUsers.find((item) => item.id === user.id);
            if (!existUser) {
              setAddedUsers((s) => [...s, user]);
            }
          }}
          className="text-white rounded focus:outline-none hover:bg-slate-900 transition bg-slate-800 px-2 py-1 text-sm"
        >
          Add User
        </button>
      </div>
    </>
  );
}

interface AddedUserProp {
  user: ResUser;
  setAddedUsers: Dispatch<SetStateAction<ResUser[]>>;
  addUsers: ResUser[];
}
function AddedUserItem({ user, setAddedUsers, addUsers }: AddedUserProp) {
  function removeUsers(x: ResUser) {
    const removed = addUsers.filter((u) => u.id !== x.id);
    setAddedUsers(removed);
  }
  return (
    <div className="bg-slate-900  cursor-pointer items-center flex px-1 py-[2px] justify-between gap-1 rounded">
      <span className="text-white text-sm">{user.name}</span>
      <button
        onClick={() => removeUsers(user)}
        className="focus:outline-none text-white transition text-sm  rounded-full hover:bg-slate-600 p-1"
      >
        <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em">
          <path
            fill="currentColor"
            d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
          />
        </svg>
      </button>
    </div>
  );
}
