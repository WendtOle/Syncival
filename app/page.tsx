import Link from "next/link";
import { Festival, festivalNames } from "./data/festivalInformation";

export default async function Home() {
  return (
    <ul>
      {Object.values(Festival).map((key) => (
        <li key={key}>
          <Link href={`./${key}`}>{festivalNames[key]}</Link>
        </li>
      ))}
    </ul>
  );
}
