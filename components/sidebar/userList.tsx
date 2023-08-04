"use client";
import { useUsers } from "@/lib/fetcher";
import { RootState } from "@/store/store";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useSWRConfig } from "swr";
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
function UserList({ setActiveUserList }: Props) {
  const { user } = useSelector((state: RootState) => state.userState);
  const { isLoading, users } = useUsers(user.id);
  function broadcastSearch(searchText: string) {
    // Search
    console.log(searchText);
  }
  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="lg:w-3/6 bg-[#21313b] p-2 h-[calc(100vh-100px)] rounded "
      >
        <h2 className="text-white text-2xl text-center">Start Chats</h2>
        <div className="w-3/4 mx-auto">
          <SearchInput
            onChange={({ target }) => broadcastSearch(target.value)}
            placeholder="Search name/email/username..."
          />
        </div>
        {isLoading && (
          <div className="mt-28">
            <Loading />
          </div>
        )}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-1">
          {/* Map user list */}

          {users &&
            users.map((user, i) => (
              <User
                setActiveUserList={setActiveUserList}
                key={i}
                userItem={user}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default UserList;
interface UserProps {
  userItem: ResUser;
  setActiveUserList: React.Dispatch<
    React.SetStateAction<{
      search: boolean;
      group: boolean;
    }>
  >;
}
function User({ userItem, setActiveUserList }: UserProps) {
  const { user } = useSelector((state: RootState) => state.userState);
  const { mutate } = useSWRConfig();
  const { push } = useRouter();
  async function sending() {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URI}/api/v1/rooms`,
        { userId: user.id, membersId: [userItem.id] }
      );
      // console.log(res);
      if (res.status === 200) {
        toast.success("Start chats !", { duration: 3000 });
        mutate(
          `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URI}/api/v1/rooms/${user.id}`
        );
        setActiveUserList((s) => ({ ...s, search: false }));
        push(`/${res.data.rooms.id}`);
      }
    } catch (error: any) {
      console.log(error.response.data.rooms.id);
      if (error.response?.data) {
        push(`/${error.response.data.rooms.id}`);
        setActiveUserList((s) => ({ ...s, search: false }));
      } else {
        toast.error(
          error.response || error.message
            ? error.response.data.message
            : error.message || "Something want wrong !",
          {
            duration: 3000,
          }
        );
      }
    }
  }
  return (
    <>
      <div className="flex cursor-pointer bg-slate-700 items-center justify-between p-2">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col">
            {!userItem.image ? (
              <div className="flex items-center w-9 h-9 rounded-full bg-slate-800 justify-center">
                <span className="text-slate-400">
                  {userItem.name && userItem.name.slice(0, 1)}
                </span>
              </div>
            ) : (
              <Image src={userItem.image} width={50} height={50} alt="icon" />
            )}
          </div>
          <div className="flex flex-col">
            <h2 className="text-white">{userItem.name && userItem.name}</h2>
          </div>
        </div>
        <button
          onClick={sending}
          className="text-white rounded focus:outline-none hover:bg-slate-900 transition bg-slate-800 px-2 py-1 text-sm"
        >
          Send message
        </button>
      </div>
    </>
  );
}
