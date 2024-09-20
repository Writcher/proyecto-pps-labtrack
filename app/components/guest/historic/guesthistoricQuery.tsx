"use client"

import { historicTableProps } from "@/app/lib/dtos/historicproject";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HistoricTable from "./table";

export default function GuestHistoricQuery({ historicusercareers, historicscholarships, historicprojecttypes, historicprojectstatus, laboratory_id }: historicTableProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <HistoricTable 
            laboratory_id={laboratory_id}
            historicusercareers={historicusercareers}
            historicscholarships={historicscholarships}
            historicprojecttypes={historicprojecttypes}
            historicprojectstatus={historicprojectstatus}
        />
    </QueryClientProvider>
  );
};