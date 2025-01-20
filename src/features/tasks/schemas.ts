import { z } from "zod";
import { Priority, TaskStatus } from "./types";

export const createTaskSchema = z.object({
  title: z.string().trim().min(5, "Task title must be at least 5 characters"),
  issueType: z.string().min(1, { message: "Please select a Issue Type" }),
  status: z.nativeEnum(TaskStatus),
  projectId: z.string().min(1, { message: "Please select a project" }),
  dueDate: z.coerce.date(),
  assigneeId: z.string().min(1, { message: "Please select a assignee" }),
  priority: z.nativeEnum(Priority, { message: "Please select a priority" }),
  storyPoint: z.string().optional(),
  parent: z.string().optional(),
});
