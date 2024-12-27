import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { ProjectIdClient } from "./client";

const ProjectPage = async () => {
  const res = await useGetProjects();

  if (res.status != 1) {
    return <></>;
  }
  return (
    <div>
      <ProjectIdClient data={res.data} />
    </div>
  );
};
export default ProjectPage;
