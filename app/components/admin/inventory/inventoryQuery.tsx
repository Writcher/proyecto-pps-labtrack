"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ABMInventoryTable from "./table";
import { inventoryTableProps } from "@/app/lib/dtos/supply";

export default function InventoryQuery({ laboratory_id, supplystatuses, supplytypes }: inventoryTableProps ) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <ABMInventoryTable 
            laboratory_id={laboratory_id} 
            supplystatuses={supplystatuses} 
            supplytypes={supplytypes}
        />
    </QueryClientProvider>
  );
};