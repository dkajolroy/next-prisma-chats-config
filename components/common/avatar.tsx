import Image from "next/image";

interface Props {
  name: string;
  image?: string;
  size?: string | undefined;
}

function Avatar({ name, image, size }: Props) {
  return (
    <div
      className={`${
        size ? size : "w-8 h-8"
      } flex justify-center items-center cursor-pointer font-bold rounded-full bg-emerald-500`}
    >
      {image ? (
        <Image src={image} width={35} height={35} alt="avatar" />
      ) : (
        name?.slice(0, 1)
      )}
    </div>
  );
}

export default Avatar;
