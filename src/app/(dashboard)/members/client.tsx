"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetUsers } from "@/features/auth/api/use-get-users";
import { columns } from "@/features/members/components/columns";
import { DataTable } from "@/features/members/components/data-table";

export const MembersClient = () => {
  const { data: users, isLoading: isLoadingUsers } = useGetUsers();
  if (isLoadingUsers) {
    return <PageLoader />;
  }
  if (!users) {
    return <PageError message="Something went wrong!" />;
  }
  return (
    <div>
      <DataTable columns={columns} data={users ? users.data : []} />
    </div>
  );
};
