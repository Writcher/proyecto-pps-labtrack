"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProjectPage from "./projectpage";

export default function ProjectPageQuery({ id }: { id: number }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <ProjectPage
            id = {id}
        />
    </QueryClientProvider>
  );
};