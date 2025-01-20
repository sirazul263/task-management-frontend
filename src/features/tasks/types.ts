export type Task = {
  id: number;
  assignee: {
    id: number;
    name: string;
    email: string;
  };
  project_id: number;
  task_id: string;
  title: string;
  description: string;
  due_date: string | null;
  issue_type: string;
  status: TaskStatus;
  priority: string;
  parent: number | null;
  story_point: number | null;
  position: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  reporter: {
    id: number;
    name: string;
    email: string;
  };
  project: {
    id: number;
    name: string;
    key: string;
    image: string | null;
  };
};

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  RE_OPENED = "RE_OPENED",
  CLOSED = "CLOSED",
  PASSED_QA = "PASSED_QA",
  RESOLVED = "RESOLVED",
  DONE = "DONE",
}

export enum Priority {
  LOW = "LOW",
  LOWEST = "LOWEST",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  HIGHEST = "HIGHEST",
}

export enum IssueType {
  TASK = "TASK",
  BUG = "BUG",
  HISTORY = "HISTORY",
  EPIC = "EPIC",
}
