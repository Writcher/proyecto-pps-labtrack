"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { projectsTableProps } from "@/app/lib/dtos/project";
import GuestProjectTable from "./table";

export default function GuestProjectQuery({ usercareers, scholarships, projecttypes, projectstatuses, laboratory_id }: projectsTableProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <GuestProjectTable 
            laboratory_id={laboratory_id}
            usercareers={usercareers}
            scholarships={scholarships}
            projecttypes={projecttypes}
            projectstatuses={projectstatuses}
        />
    </QueryClientProvider>
  );
};