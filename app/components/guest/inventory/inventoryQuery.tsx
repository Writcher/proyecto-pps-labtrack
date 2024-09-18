"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { guestInventoryTableProps } from "@/app/lib/dtos/supply";
import GuestInventoryTable from "./table";

export default function GuestInventoryQuery({ laboratory_id }: guestInventoryTableProps ) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <GuestInventoryTable 
            laboratory_id={laboratory_id} 
        />
    </QueryClientProvider>
  );
};