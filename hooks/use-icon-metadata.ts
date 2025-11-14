// hooks/useIconMetadata.ts
import { useQuery } from "@tanstack/react-query";

interface Icon {
  name: string;
  tags: string[];
}

interface IconMetadata {
  icons: Icon[];
}

export function useIconMetadata() {
  return useQuery<IconMetadata>({
    queryKey: ["iconMetadata"],
    queryFn: async () => {
      const response = await fetch("/api/icons/metadata");
      if (!response.ok) {
        throw new Error("Failed to fetch metadata");
      }
      return response.json();
    },
  });
}
