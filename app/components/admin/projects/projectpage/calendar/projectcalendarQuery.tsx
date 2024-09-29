"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProjectCalendar from "./calendar";

export default function ProjectCalendarQuery({ id }: { id: number }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <ProjectCalendar
            id = {id}
        />
    </QueryClientProvider>
  );
};