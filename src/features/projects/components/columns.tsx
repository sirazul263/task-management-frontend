"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { ProjectActions } from "./project-actions";
import { Project } from "../types";
import { format } from "date-fns";
import { ProjectAvatar } from "./project-avatar";
import { UserAvatar } from "@/features/members/components/user-avatar";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Project Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      const image = row.original.image;
      return (
        <div className="flex items-center gap-x-2 ">
          <ProjectAvatar
            className="size-8"
            fallbackClassName="text-sm"
            name={name}
            image={image || undefined}
          />
          <p className="line-clamp-1">{name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "key",
    header: ({ column }) => {
      return (
        <Button
          className="px-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project Key
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const key = row.original.key;
      return <p className="line-clamp-1">{key}</p>;
    },
  },
  {
    accessorKey: "user.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Created By
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <UserAvatar
            className="size-6"
            fallbackClassName="text-sm"
            name={user.name}
          />
          <p className="line-champ-1">{user.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.original.created_at;
      return (
        <p className="line-champ-1">
          {format(createdAt, "dd/MM/yyyy HH:mm:ss")}
        </p>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <ProjectActions data={row.original}>
          <Button variant="ghost" className="size-8 p-0">
            <MoreVertical className="size-4" />
          </Button>
        </ProjectActions>
      );
    },
  },
];
