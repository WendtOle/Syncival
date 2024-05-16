export default async function Header({ title }: { title: string }) {
  return (
    <div className="flex justify-center p-4 sticky top-0 bg-white">
      <h1 className="text-xl">{title}</h1>
    </div>
  );
}
