import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="z-10 w-full h-20 bg-zinc-800 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Link className="text-white font-black text-2xl" href="/">
              <p>my2sats</p>
            </Link>
            <ul className="flex gap-x-6 text-white items-center">
              <li>
                <Link href={{ pathname: "/" }}>
                  <p>Home</p>
                </Link>
              </li>
              <li>
                <Link href={{ pathname: "/blog" }}>
                  <p>Blog</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
