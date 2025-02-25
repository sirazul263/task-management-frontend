import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useDeleteProject } from "../api/use-delete-project";
import { useState } from "react";
import UpdateProjectModal from "./update-project-modal";
import { Project } from "../types";
interface ProjectActionsProps {
  data: Project;
  children: React.ReactNode;
}
export const ProjectActions = ({ data, children }: ProjectActionsProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Project",
    "This action can not be undone",
    "destructive"
  );

  const { mutate, isPending } = useDeleteProject();
  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) {
      return;
    }
    mutate({
      projectId: data.id,
    });
  };

  //Update the project Project
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      {showUpdate && (
        <UpdateProjectModal
          data={data}
          showUpdate={showUpdate}
          setShowUpdate={setShowUpdate}
        />
      )}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            className="font-medium p-[10px]"
            onClick={() => setShowUpdate(true)}
          >
            <PencilIcon className="size-4 mr-2 stroke-2" />
            Edit Project
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-amber-500 focus:text-amber-700 font-medium p-[10px]"
            onClick={onDelete}
            disabled={isPending}
          >
            <TrashIcon className="size-4 mr-2 stroke-2" />
            Delete Project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
