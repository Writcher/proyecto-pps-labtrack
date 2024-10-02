"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProjectPage from "./projectpage";

export default function ProjectPageQuery({ id, current_id }: { id: number, current_id: number }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <ProjectPage
            id={id}
            current_id={current_id}
        />
    </QueryClientProvider>
  );
};