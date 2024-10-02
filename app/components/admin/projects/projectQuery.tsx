"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { projectsTableProps } from "@/app/lib/dtos/project";
import ABMProjectTable from "./table";

export default function ProjectQuery({ usercareers, scholarships, projecttypes, projectstatuses, laboratory_id }: projectsTableProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <ABMProjectTable 
            laboratory_id={laboratory_id}
            usercareers={usercareers}
            scholarships={scholarships}
            projecttypes={projecttypes}
            projectstatuses={projectstatuses}
        />
    </QueryClientProvider>
  );
};