"use client";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { DataTable } from "./data-table";
import { useTaskFilters } from "../hooks/use-task-filters";
import { useRouter } from "next/navigation";
import { useGetTasks } from "../api/use-get-tasks";
import DataFilters from "./data-filters";
import { columns } from "./columns";
import { DataCalendar } from "./data-calendar";

interface TaskViewSwitcherProps {
  hideProjectFilter?: boolean;
  defaultProject?: string;
}

export const TaskViewSwitcher = ({
  hideProjectFilter,
  defaultProject,
}: TaskViewSwitcherProps) => {
  const router = useRouter();
  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters();

  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });

  //   const { mutate: bulkUpdate } = useBulkUpdateTask();

  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    projectId: defaultProject || projectId,
    assigneeId,
    status,
    dueDate,
  });

  //   const onKanbanChange = useCallback(
  //     (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
  //       // Update task statuses and positions in the database
  //       bulkUpdate({
  //         json: { tasks },
  //       });
  //     },
  //     [bulkUpdate]
  //   );

  return (
    <Tabs
      className="flex-1 w-full border rounded-lg"
      defaultValue={view}
      onValueChange={setView}
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>

          <Button
            size="sm"
            className="w-full lg:w-auto"
            onClick={() => router.push("/tasks/create")}
          >
            <PlusIcon className="size-4 mr-2" /> New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters hideProjectFilter={hideProjectFilter} />
        <DottedSeparator className="my-4" />
        {isLoadingTasks ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks ? tasks.data : []} />
            </TabsContent>
            {/* <TabsContent value="kanban" className="mt-0">
              <DataKanban data={tasks ?? []} onChange={onKanbanChange} />
            </TabsContent>
            */}
            <TabsContent value="calendar" className="mt-0 h-full pb-4">
              <DataCalendar data={tasks ? tasks.data : []} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};
