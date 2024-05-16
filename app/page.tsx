import Link from "next/link";
import { Festival, festivalNames } from "./data/festivalInformation";

export default async function Home() {
  return (
    <div className="max-w-xl flex justify-center text-xl mt-8">
      <ul>
        {Object.values(Festival).map((key) => (
          <li key={key} className="mb-2 px-4 p-2 border rounded">
            <Link className="block" href={`./${key}`}>
              {festivalNames[key]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
