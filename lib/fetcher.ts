import useSWR from "swr";
export const fetcher = (args: string) => fetch(args).then((res) => res.json());
export function useRooms(userId: string) {
  const { data, mutate, error, isLoading } = useSWR<ResRooms[]>(
    `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URI}/api/v1/rooms/${userId}`,
    fetcher
  );

  return {
    rooms: data,
    isLoading,
    mutate,
    isError: error,
  };
}
export function useRoom(roomId: string) {
  const { data, mutate, error, isLoading } = useSWR<ResRooms>(
    `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URI}/api/v1/room/${roomId}`,
    fetcher
  );

  return {
    room: data,
    isLoading,
    mutate,
    isError: error,
  };
}
export function useUsers(userId: string) {
  const { data, mutate, error, isLoading } = useSWR<ResUser[]>(
    `/api/users?userId=${userId}`,
    fetcher
  );
  return {
    users: data,
    isLoading,
    mutate,
    isError: error,
  };
}
export function useUser(userId: string) {
  const { data, mutate, error, isLoading } = useSWR<ResUser[]>(
    `/api/user?userId=${userId}`,
    fetcher
  );
  return {
    user: data,
    isLoading,
    mutate,
    isError: error,
  };
}
