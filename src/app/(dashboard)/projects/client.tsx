"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { columns } from "@/features/projects/components/columns";
import { DataTable } from "@/features/projects/components/data-table";

export const ProjectIdClient = () => {
  const { data: result, isLoading } = useGetProjects();
  if (isLoading) {
    return <PageLoader />;
  }
  if (result && result.status !== 1) {
    return <PageError message={result.message} />;
  }
  return (
    <div className="flex flex-col gap-y-4">
      <DataTable columns={columns} data={result ? result.data : []} />
    </div>
  );
};
