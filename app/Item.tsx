export default async function Item({
  title,
  image,
}: {
  title: string;
  image?: any;
}) {
  return (
    <div className="flex items-center mx-2 mb-1">
      {image}
      <p className="ml-4"> {title}</p>
    </div>
  );
}
