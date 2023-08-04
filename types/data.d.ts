interface ResUser {
  id: string;
  name: string;
  email: string;
  emailVerified: strn;
  username: string;
  password: string;
  status: "OFFLINE" | "ONLINE";
  image: string;
  socketId: string;
  account: string;
  roomId: string;
  created_at: string;
  updated_at: string;
}
interface RoomsUser {
  conversationId: string[];
  created_at: string;
  email: string | null;
  emailVerified: string;
  id: string;
  image: string | null;
  name: string | null;
  password: string | null;
  socketId: string | null;
  status: "ONLINE" | "OFFLINE";
  updated_at: string;
  username: string | null;
}

interface ResRooms {
  created_at: string;
  icon: string;
  id: string;
  isGroup: boolean;
  members: RoomsUser[];
  name: string;
  updated_at: string;
}
