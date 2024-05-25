import Image from "next/image";
import Link from "next/link";

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
        <div className="flex flex-row items-center space-x-2">
          <Link href="/" className="w-4 h-4"><img src="/back-icon.svg" /></Link>
          <h1 className="text-xl">{title}</h1>
        </div>
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
