"use client"

import { loginFormProps } from "@/app/lib/dtos/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginForm from "./login-form";

export default function LoginQuery({ admin, guest, scholar }: loginFormProps ) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <LoginForm admin={admin} guest={guest} scholar={scholar}/>
    </QueryClientProvider>
  );
};