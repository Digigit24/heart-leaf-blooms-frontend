import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes (Data is fresh for 5 mins)
            gcTime: 1000 * 60 * 10,   // 10 minutes (Garbage collect after 10 mins unused)
            refetchOnWindowFocus: false, // Don't refetch when clicking back to window
            retry: 1,
        },
    },
});

export default function QueryProvider({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
