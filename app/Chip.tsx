import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

interface ChipProps {
  text: string;
  href: Url;
  selected?: boolean;
}

export const Chip = ({ text, href, selected }: ChipProps) => {
  return (
    <Link href={href}>
      <p
        className={`px-2 py-1 rounded-lg shadow hover:shadow-none ${
          selected ? "bg-slate-100" : "bg-white"
        }`}
      >
        {text}
      </p>
    </Link>
  );
};
