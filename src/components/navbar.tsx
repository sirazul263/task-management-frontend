"use client";

import { UserButton } from "@/features/auth/components/user-button";
import MobileSidebar from "./mobile-sidebar";
import { usePathname } from "next/navigation";
const pathnameMap = {
  tasks: {
    title: "My Tasks",
    description: "View all of your tasks",
  },
  project: {
    title: "My Projects",
    description: "View tasks  of your projects",
  },
};

const defaultMap = {
  title: "Home",
  description: "Monitor all of your projects and tasks here",
};

const Navbar = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;
  const { title, description } = pathnameMap[pathnameKey] || defaultMap;
  return (
    <nav className="pt-4 px-6 flex justify-between items-center">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};
export default Navbar;