"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ABMTable from "./table";

interface QueryClientProps {
    table: string;
};

export default function ABMQuery({ table }: QueryClientProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ABMTable  table={table}/>
    </QueryClientProvider>
  );
};