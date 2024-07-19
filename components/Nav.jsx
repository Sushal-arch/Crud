import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <nav className="flex justify-between bg-slate-800 px-8 py-3 items-center">
      <Link href="/" className="text-white font-bold">
        ABC.
      </Link>
      <Link href="/addtopic" className="bg-white py-2">
        Add Topic
      </Link>
    </nav>
  );
}
