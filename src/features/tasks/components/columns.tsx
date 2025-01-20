"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CopyIcon, MoreVertical } from "lucide-react";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Badge } from "@/components/ui/badge";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { Task } from "../types";
import { TaskActions } from "./task-actions";
import { TaskDate } from "./task-date";
import { toast } from "sonner";
import Link from "next/link";
import { format } from "date-fns";
import { UserAvatar } from "@/features/members/components/user-avatar";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "issue_type",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="px-0">
          Type
        </Button>
      );
    },
    cell: ({ row }) => {
      const type = row.original.issue_type;
      return <p className="line-clamp-1">{snakeCaseToTitleCase(type)}</p>;
    },
  },
  {
    accessorKey: "task_id",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="px-0">
          Task ID
        </Button>
      );
    },
    cell: ({ row }) => {
      const taskId = row.original.task_id;
      const id = row.original.id;
      const handleCopyInviteLink = () => {
        const fullInviteLink = `${window.location.origin}/tasks/${id}`;
        navigator.clipboard.writeText(fullInviteLink).then(() => {
          toast.success(`Task link copied successfully`);
        });
      };
      return (
        <div className="flex items-center ">
          <CopyIcon
            className="size-5 cursor-pointer mr-2"
            onClick={handleCopyInviteLink}
          />
          <Link href={`/tasks/${id}`}>
            <p className="line-clamp-1 text-red-600 font-semibold">{taskId}</p>
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="px-0">
          Title
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.original.title;
      return <p className="line-clamp-1">{name}</p>;
    },
  },
  {
    accessorKey: "project_id",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="px-0">
          Project
        </Button>
      );
    },
    cell: ({ row }) => {
      const project = row.original.project;
      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <ProjectAvatar
            className="size-6 "
            name={project.name}
            image={project.image || undefined}
          />
          <p className="line-champ-1">{project.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="px-0">
          Assignee
        </Button>
      );
    },
    cell: ({ row }) => {
      const assignee = row.original.assignee;
      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <UserAvatar
            className="size-6"
            fallbackClassName="text-sm"
            name={assignee.name}
          />
          <p className="line-champ-1">{assignee.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "reporter",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="px-0">
          Reporter
        </Button>
      );
    },
    cell: ({ row }) => {
      const reporter = row.original.reporter;
      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <UserAvatar
            className="size-6"
            fallbackClassName="text-sm"
            name={reporter.name}
          />
          <p className="line-champ-1">{reporter.name}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="px-0">
          Status
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge variant={status}>{snakeCaseToTitleCase(status)}</Badge>;
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="px-0">
          Priority
        </Button>
      );
    },
    cell: ({ row }) => {
      const priority = row.original.priority;
      return <Badge variant="default">{snakeCaseToTitleCase(priority)}</Badge>;
    },
  },

  {
    accessorKey: "hours",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="px-0">
          Hours Logged
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="line-champ-1">----</p>;
    },
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="px-0">
          Due Date
        </Button>
      );
    },
    cell: ({ row }) => {
      const dueDate = row.original.due_date;
      return (
        <>{dueDate ? <TaskDate value={dueDate} /> : <span>------</span>}</>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="px-0">
          Created
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
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button variant="ghost" className="px-0">
          Updated
        </Button>
      );
    },
    cell: ({ row }) => {
      const updatedAt = row.original.updated_at;
      return (
        <p className="line-champ-1">
          {" "}
          {format(updatedAt, "dd/MM/yyyy HH:mm:ss")}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      const projectId = row.original.project_id;
      return (
        <TaskActions id={id} projectId={projectId}>
          <Button variant="ghost" className="size-8 p-0">
            <MoreVertical className="size-4" />
          </Button>
        </TaskActions>
      );
    },
  },
];
