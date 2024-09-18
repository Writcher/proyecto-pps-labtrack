"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { chatMenuProps } from "@/app/lib/dtos/message";
import ChatScholar from "./chat";

export default function ChatQuery({ laboratory_id, current_id, usertype_id }: chatMenuProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChatScholar laboratory_id={laboratory_id} current_id={current_id} usertype_id={usertype_id}/>
    </QueryClientProvider>
  );
};