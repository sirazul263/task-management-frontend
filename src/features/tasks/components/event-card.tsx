import { cn } from "@/lib/utils";
import { TaskStatus } from "../types";
import { Project } from "@/features/projects/types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useRouter } from "next/navigation";
import { User } from "@/features/members/types";
import { UserAvatar } from "@/features/members/components/user-avatar";

interface EventCardProps {
  id: string;
  title: string;
  assignee: User;
  project: Project;
  status: TaskStatus;
}

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "border-l-red-500",
  [TaskStatus.IN_PROGRESS]: "border-l-yellow-500",
  [TaskStatus.DONE]: "border-l-emerald-500",
  [TaskStatus.IN_REVIEW]: "border-l-blue-500",
  [TaskStatus.RE_OPENED]: "border-l-orange-500",
  [TaskStatus.CLOSED]: "border-l-gray-500",
  [TaskStatus.PASSED_QA]: "border-l-green-500",
  [TaskStatus.RESOLVED]: "border-l-purple-500",
};

export const EventCard = ({
  id,
  title,
  assignee,
  project,
  status,
}: EventCardProps) => {
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`/workspaces/tasks/${id}`);
  };
  return (
    <div className="px-2 mb-1">
      <div
        onClick={onClick}
        className={cn(
          "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition ",
          statusColorMap[status]
        )}
      >
        <p>{title}</p>
        <div className="flex  gap-x-1">
          <UserAvatar name={assignee?.name} />
          <div className="size-1 rounded-full bg-neutral-300">
            <ProjectAvatar
              name={project.name}
              image={project.image || undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
