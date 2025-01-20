import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";

const TaskPage = async () => {
  return (
    <div className="h-full flex-col">
      <TaskViewSwitcher />
    </div>
  );
};
export default TaskPage;
