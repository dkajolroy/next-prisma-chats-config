import {
  IconCameraVideo,
  IconSearch,
  IconTelephone,
} from "@/source/assets/IconSvg";
import Avatar from "./avatar";

function MessageHeading() {
  return (
    <div className="flex items-center py-5 justify-between">
      <div className="flex gap-2 items-center">
        <Avatar name="Kajol Roy" size="w-9 h-9" />
        <div className="flex flex-col">
          <h2 className="text-white text-sm">Sender Name</h2>
          <span className="text-gray-400 text-xs">online</span>
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <span className="text-white">
          <IconTelephone />
        </span>
        <span className="text-white flex relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full  p-1 bg-emerald-700">
            <IconCameraVideo />
          </span>
        </span>
        <div className="h-5 w-[1px] bg-gray-600"></div>
        <span className="text-white">
          <IconSearch />
        </span>
      </div>
    </div>
  );
}

export default MessageHeading;
