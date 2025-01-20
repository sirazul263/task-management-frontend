"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  CheckCircle,
  ShieldIcon,
  UserIcon,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { UserAvatar } from "@/features/members/components/user-avatar";
import { User } from "../types";
import { snakeCaseToTitleCase } from "@/lib/utils";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      return (
        <div className="flex items-center gap-x-2 ">
          <UserAvatar
            className="size-6"
            fallbackClassName="text-sm"
            name={name}
          />
          <p className="line-clamp-1">{name}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const email = row.original.email;
      return <p className="line-champ-1">{email}</p>;
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <div className="flex items-center">
          {role === "ADMIN" ? (
            <ShieldIcon className="size-5 mr-2" />
          ) : (
            <UserIcon className="size-5 mr-2" />
          )}

          <p className="line-champ-1 font-bold">{snakeCaseToTitleCase(role)}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className="flex items-center">
          {status === "ACTIVE" ? (
            <CheckCircle color="green" className="size-4 mr-2" />
          ) : (
            <XCircle color="red" className="size-4 mr-2" />
          )}

          <p className="line-champ-1 ">{snakeCaseToTitleCase(status)}</p>
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

  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     return (
  //       <ProjectActions data={row.original}>
  //         <Button variant="ghost" className="size-8 p-0">
  //           <MoreVertical className="size-4" />
  //         </Button>
  //       </ProjectActions>
  //     );
  //   },
  // },
];
