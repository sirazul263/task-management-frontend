"use client";
import ResponsiveModal from "@/components/responsive-modal";
import { UpdateProjectFormWrapper } from "./update-project-form-wrapper";
import { Project } from "../types";
interface UpdateProjectModalProps {
  data: Project;
  showUpdate: boolean;
  setShowUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProjectModal = ({
  data,
  showUpdate,
  setShowUpdate,
}: UpdateProjectModalProps) => {
  const close = () => {
    setShowUpdate(false);
  };
  return (
    <ResponsiveModal open={showUpdate} onOpenChange={close}>
      <UpdateProjectFormWrapper onClose={close} data={data} />
    </ResponsiveModal>
  );
};

export default UpdateProjectModal;
