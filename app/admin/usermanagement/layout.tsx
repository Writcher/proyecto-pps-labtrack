"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Layout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <div className="flex-grow md:overflow-y-auto">{children}</div>
        </QueryClientProvider>
    )
}