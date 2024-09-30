"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskPage from "./taskpage";

export default function TaskPageQuery({ task_id, project_id }: { task_id: number, project_id: number }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <TaskPage
            task_id = {task_id}
            project_id = {project_id}
        />
    </QueryClientProvider>
  );
};