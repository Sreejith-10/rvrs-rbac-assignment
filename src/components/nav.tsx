"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export const Nav = () => {
  const path = usePathname()

  return (
    <div className="w-full h-auto">
      <nav className="w-fit h-10 grid grid-cols-3 gap-2 bg-zinc-200 p-1 rounded-md relative">
        <Link href={"/"} className={`${path === "/" && "bg-white"} w-full h-full px-20 rounded-md grid place-content-center font-semibold`}>Users</Link>
        <Link href={"/roles"} className={`${path === "/roles" && "bg-white"} w-full h-full px-20 rounded-md grid place-content-center font-semibold`}>Roles</Link>
        <Link href={"/permissions"} className={`${path === "/permissions" && "bg-white"} w-full h-full px-20 rounded-md grid place-content-center font-semibold`}>Permission</Link>
      </nav>
    </div>
  )
}
