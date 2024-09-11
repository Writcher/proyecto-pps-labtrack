"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChatAdmin from "./chat";
import { chatMenuProps } from "@/app/lib/dtos/message";

export default function ChatQuery({ laboratory_id, current_id, usertype_id }: chatMenuProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChatAdmin laboratory_id={laboratory_id} current_id={current_id} usertype_id={usertype_id}/>
    </QueryClientProvider>
  );
}