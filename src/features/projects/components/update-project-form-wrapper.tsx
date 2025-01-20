import { Project } from "../types";
import { UpdateProjectForm } from "./update-project-form";

interface UpdateProjectFormWrapperProps {
  onClose: () => void;
  data: Project;
}

export const UpdateProjectFormWrapper = ({
  onClose,
  data,
}: UpdateProjectFormWrapperProps) => {
  return (
    <div>
      <UpdateProjectForm onClose={onClose} initialValues={data} />
    </div>
  );
};
