import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
// import { useDeleteTask } from "../api/use-delete-task";
import { useRouter } from "next/navigation";
import { useUpdateProjectModal } from "../hooks/use-update-project-modal";
// import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
// import { useUpdateTaskModal } from "../hooks/use-update-task-modal";

interface ProjectActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}
export const ProjectActions = ({
  id,
  projectId,
  children,
}: ProjectActionsProps) => {
  const router = useRouter();

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task",
    "This action can not be undone",
    "destructive"
  );

  const { open } = useUpdateProjectModal();

  // const { mutate, isPending } = useDeleteTask();

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) {
      return;
    }
    // mutate({
    //   param: {
    //     taskId: id,
    //   },
    // });
  };

  const onOpenTask = () => {
    router.push(`/projects/${id}`);
  };

  const onOpenProject = () => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            disabled={false}
            className="font-medium p-[10px]"
            onClick={onOpenTask}
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Project Details
          </DropdownMenuItem>
          <DropdownMenuItem
            className="font-medium p-[10px]"
            onClick={onOpenProject}
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            className="font-medium p-[10px]"
            onClick={() => open(id)}
          >
            <PencilIcon className="size-4 mr-2 stroke-2" />
            Edit Task
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-amber-500 focus:text-amber-700 font-medium p-[10px]"
            onClick={onDelete}
            // disabled={isPending}
          >
            <TrashIcon className="size-4 mr-2 stroke-2" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
