"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ABMScholarTable from "./table";
import { userCareer } from "@/app/lib/dtos/usercareer";
import { scholarshipType } from "@/app/lib/dtos/scholarshiptype";

interface QueryClientProps {
    laboratory_id: number;
    usercareers: userCareer[];
    scholarships: scholarshipType[];
};

export default function ScholarQuery({ laboratory_id, usercareers, scholarships }: QueryClientProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ABMScholarTable  
                    usercareers={usercareers}
                    scholarships={scholarships}
                    laboratory_id={laboratory_id}/>
    </QueryClientProvider>
  );
};