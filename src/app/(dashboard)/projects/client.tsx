"use client";

import { columns } from "@/features/projects/components/columns";
import { DataTable } from "@/features/projects/components/data-table";
import { Project } from "@/features/projects/types";

export const ProjectIdClient = ({ data }: { data: Project[] }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <DataTable columns={columns} data={data ?? []} />
    </div>
  );
};
