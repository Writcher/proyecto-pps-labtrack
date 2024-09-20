"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SideNavLinksScholar } from "./sidenav-links";

interface QueryClientProps {
    current_id_number: number;
}

export default function SideNavQuery({ current_id_number }: QueryClientProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SideNavLinksScholar current_id_number={current_id_number}/>
    </QueryClientProvider>
  );
};