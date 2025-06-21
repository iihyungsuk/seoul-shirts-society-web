import { LayoutProvider } from "./layout-provider";
import { QueryProvider } from "./query-provider";

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </QueryProvider>
  );
}
