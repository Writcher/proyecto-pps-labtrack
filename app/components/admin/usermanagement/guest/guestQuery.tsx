"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ABMGuestTable from "./table";

interface QueryClientProps {
    laboratory_id: number;
};

export default function GuestQuery({ laboratory_id }: QueryClientProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ABMGuestTable  laboratory_id={laboratory_id}/>
    </QueryClientProvider>
  );
};