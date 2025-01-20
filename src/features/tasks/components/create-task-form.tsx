"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IssueType, Priority, TaskStatus } from "../types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { createTaskSchema } from "../schemas";
import { useCreateTask } from "../api/use-create-task";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import Quill from "quill";
import dynamic from "next/dynamic";
import { UserAvatar } from "@/features/members/components/user-avatar";
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

interface CreateTaskFormPros {
  projectOptions: {
    id: string;
    name: string;
    imageUrl?: string;
  }[];
  userOptions: {
    id: string;
    name: string;
  }[];
}

export const CreateTaskForm = ({
  projectOptions,
  userOptions,
}: CreateTaskFormPros) => {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateTask();
  const [error, setError] = useState<string | null>(null);

  //Editor
  const quillRef = useRef<Quill | null>(null);

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      projectId: "",
      issueType: IssueType.TASK,
      title: "",
      dueDate: new Date(),
      assigneeId: "",
      status: TaskStatus.TODO,
      priority: Priority.MEDIUM,
      parent: "",
      storyPoint: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createTaskSchema>) => {
    const text = quillRef.current?.getText();
    const isEmpty =
      !text || text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

    const html = quillRef.current?.root.innerHTML;
    if (isEmpty || !html) {
      setError("Description is required");
      return;
    }
    const finalValue = { ...values, description: html };
    try {
      setError(null);
      const res = await mutateAsync(finalValue);
      router.push("/tasks");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Card className="w-full h-full  border-none shadow-none">
      <div className="px-7 pb-5">
        <DottedSeparator />
      </div>
      <CardContent className="px-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="projectId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Project <span className="text-red-700">*</span>{" "}
                      </FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {projectOptions.map((option) => (
                            <SelectItem key={option.id} value={`${option.id}`}>
                              <div className="flex items-center gap-x-2">
                                <ProjectAvatar
                                  className="size-6"
                                  name={option.name}
                                />
                                {option.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="issueType"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Issue Type <span className="text-red-700">*</span>{" "}
                      </FormLabel>

                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={IssueType.TASK}>Task</SelectItem>
                          <SelectItem value={IssueType.BUG}>Bug</SelectItem>
                          <SelectItem value={IssueType.HISTORY}>
                            History
                          </SelectItem>
                          <SelectItem value={IssueType.EPIC}>Epic</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Status <span className="text-red-700">*</span>{" "}
                      </FormLabel>

                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
                          <SelectItem value={TaskStatus.IN_PROGRESS}>
                            In Progress
                          </SelectItem>
                          <SelectItem value={TaskStatus.IN_REVIEW}>
                            In Review
                          </SelectItem>
                          <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Title <span className="text-red-700">*</span>{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter task title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="assigneeId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Assignee <span className="text-red-700">*</span>{" "}
                      </FormLabel>

                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select assignee" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {userOptions.map((option) => (
                            <SelectItem key={option.id} value={`${option.id}`}>
                              <div className="flex items-center gap-x-2">
                                <UserAvatar
                                  className="size-6"
                                  name={option.name}
                                />
                                {option.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-y-4">
                <FormField
                  name="priority"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Priority <span className="text-red-700">*</span>{" "}
                      </FormLabel>

                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value={Priority.LOW}>Low</SelectItem>
                          <SelectItem value={Priority.LOWEST}>
                            Lowest
                          </SelectItem>
                          <SelectItem value={Priority.MEDIUM}>
                            Medium
                          </SelectItem>
                          <SelectItem value={Priority.HIGH}>High</SelectItem>
                          <SelectItem value={Priority.HIGHEST}>
                            Highest
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="parent"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter parent id"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="storyPoint"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Story Point</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="1.5" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="dueDate"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Due Date<span className="text-red-700">*</span>{" "}
                      </FormLabel>
                      <FormControl>
                        <DatePicker {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <FormLabel>
                Description<span className="text-red-700">*</span>{" "}
              </FormLabel>
              <Editor
                placeholder={"Description"}
                disabled={isPending}
                quillRef={quillRef}
              />
            </div>

            <DottedSeparator className="py-5" />

            {error && (
              <div className="flex items-center">
                <AlertTriangle className="size-5 text-red-700 mr-2" />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <Button
                type="button"
                size="lg"
                variant="destructive"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" disabled={isPending}>
                {isPending ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                ) : (
                  "Create Task"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
