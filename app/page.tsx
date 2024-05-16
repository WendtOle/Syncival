import Link from "next/link";
import { Festival, festivalNames } from "./data/festivalInformation";
import Item from "./Item";

export default async function Home() {
  return (
    <div className="mt-2">
      {Object.values(Festival).map((key) => {
        const name = festivalNames[key];
        return (
          <Link key={key} href={`/${key}`}>
            <Item
              key={key}
              title={name}
              image={
                <div className="w-16 h-16 flex justify-center items-center bg-gray-100">
                  <p className="font-medium text-lg">{name[0]}</p>
                </div>
              }
            />
          </Link>
        );
      })}
    </div>
  );
}
