"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { userCareer } from "@/app/lib/dtos/usercareer";
import { scholarshipType } from "@/app/lib/dtos/scholarshiptype";
import ABMScholarTable from "./scholar/table";
import ABMGuestTable from "./guest/table";

interface QueryClientProps {
  laboratory_id: number;
  usercareers: userCareer[];
  scholarships: scholarshipType[];
};

export default function ScholarQuery({ laboratory_id, usercareers, scholarships }: QueryClientProps) {
  const queryClient = new QueryClient();
  const { watch, setValue } = useForm({
    defaultValues: {
      tabValue: "",
    }
  });
  const selectedTab = watch("tabValue");
  const handleTabChange = (event: any, newValue: string) => {
    setValue("tabValue", newValue);
  };
  const renderContent = () => {
    switch (selectedTab) {
      case "":
        return (
          <div className="flex flex-col items-center justify-center text-3xl text-gray-700 text-center font-bold gap-10">
            <p>
              Gestión de Usuarios
            </p>
            <div className="flex flex-col items-center justify-center text-xl text-gray-700 text-center">
              Seleccione una pestaña
            </div>
          </div>
        );
      case "becario":
        return (
          <ABMScholarTable
            usercareers={usercareers}
            scholarships={scholarships}
            laboratory_id={laboratory_id}
          />
        );
      case "invitado":
        return (
          <ABMGuestTable
            laboratory_id={laboratory_id}
          />
        );
    };
  };
  return (
    <main className="flex flex-col w-full h-full">
      <div className="flex h-[10%] bg-gray-700 border-b-4 border-orange-500 md:border-transparent text-white items-center justify-center">
        <Tabs
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          className="items-center"
          value={selectedTab}
          onChange={handleTabChange}
        >
          <Tab
            label="Becarios"
            value="becario"
          />
          <Tab
            label="Invitados"
            value="invitado"
          />
        </Tabs>
      </div>
      <div className="flex flex-col w-full px-4 py-4 md:px-6 md:py-6 h-[90%]">
        <QueryClientProvider client={queryClient}>
          {renderContent()}
        </QueryClientProvider>
      </div>
    </main>
  );
};