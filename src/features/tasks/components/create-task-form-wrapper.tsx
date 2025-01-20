"use client";

import PageLoader from "@/components/page-loader";
import { useGetUsers } from "@/features/auth/api/use-get-users";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { Project } from "@/features/projects/types";
import { CreateTaskForm } from "./create-task-form";
import { User } from "@/features/members/types";

export const CreateTaskFormWrapper = () => {
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects();
  const { data: users, isLoading: isLoadingUsers } = useGetUsers();

  const isLoading = isLoadingProjects || isLoadingUsers;

  const projectOptions = projects?.data.map((project: Project) => ({
    id: project.id,
    name: project.name,
    imageUrl: project.image,
  }));

  const userOptions = users?.data.map((user: User) => ({
    id: user.id,
    name: user.name,
  }));

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <CreateTaskForm
        projectOptions={projectOptions}
        userOptions={userOptions}
      />
    </div>
  );
};
