"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SideNavLinksAdmin } from "./sidenav-links";

interface QueryClientProps {
    current_id_number: number;
}

export default function SideNavQuery({ current_id_number }: QueryClientProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SideNavLinksAdmin current_id_number={current_id_number}/>
    </QueryClientProvider>
  );
};