"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CustomLink({
  path,
  children,
  prefetch = true,
  className,
}) {
  const pathName = usePathname();
  const active = pathName === path;

  return (
    <>
      <Link
        prefetch={prefetch}
        className={`${className} ${active ? "text-primary" : "text-white"}`}
        href={path}
      >
        {children}
      </Link>
    </>
  );
}
