"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegisterForm from "./register-form";

export default function RegisterQuery() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <RegisterForm />
    </QueryClientProvider>
  );
};