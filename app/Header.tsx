import Image from "next/image";

export default async function Header({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  return (
    <div className="sticky top-0 p-4  bg-white flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl">{title}</h1>
        <Image
          src="/Spotify_Logo_RGB_Black.png"
          alt=""
          width={100}
          height={50}
        />
      </div>
      {children}
    </div>
  );
}
