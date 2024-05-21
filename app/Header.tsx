import Image from "next/image";

export default async function Header({ title }: { title: string }) {
  return (
    <div className="flex justify-between p-4 sticky top-0 bg-white items-center">
      <h1 className="text-xl">{title}</h1>
      <Image src="/Spotify_Logo_RGB_Black.png" alt="" width={100} height={50} />
    </div>
  );
}
