import Link from "next/link";

export default function Home() {
  return (
    <div className="absolute inset-0 flex justify-center items-center flex-col px-12">
      <div className="flex flex-col gap-4 items-start animate-fade-in">
        <p className="text-4xl">
          Welcome to <span className="font-bold text-orange-500">my2sats</span>
        </p>
        <Link
          className="px-4 py-2 rounded bg-orange-500 text-2xl"
          href={{ pathname: "/blog" }}
        >
          Blog
        </Link>
      </div>
    </div>
  );
}
