import { type QueryClient } from "@tanstack/react-query";

/**
 * Common query utilities for TanStack Query v5
 */

// Query key factory utilities
export const createQueryKey = <T extends readonly unknown[]>(...keys: T): T =>
  keys;

/**
 * Creates a query keys factory for a specific feature/entity
 * This provides a standardized way to create hierarchical query keys
 */
export const createQueryKeys = <TBase extends string>(base: TBase) => {
  return {
    _def: [base] as const,
    all: [base] as const,
    list: (filters?: Record<string, unknown>) =>
      [base, "list", ...(filters ? [filters] : [])] as const,
    detail: (id: string) => [base, "detail", id] as const,
    byCategory: (category: string) => [base, "category", category] as const,
    custom: (...keys: readonly unknown[]) => [base, ...keys] as const,
  };
};

/**
 * Merges multiple query keys objects into a single object
 */
export const mergeQueryKeys = <T extends Record<string, unknown>[]>(
  ...queryKeys: T
) => {
  return Object.assign({}, ...queryKeys);
};

// Error handling utilities
export const isQueryError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const getErrorMessage = (error: unknown): string => {
  if (isQueryError(error)) {
    return error.message;
  }
  return "An unexpected error occurred";
};

// Query client utilities for invalidation with v5 API
export const invalidateQueries = (
  queryClient: QueryClient,
  queryKey: readonly unknown[],
) => {
  return queryClient.invalidateQueries({
    queryKey,
    exact: false,
  });
};

export const invalidateQueriesExact = (
  queryClient: QueryClient,
  queryKey: readonly unknown[],
) => {
  return queryClient.invalidateQueries({
    queryKey,
    exact: true,
  });
};

// Prefetch utilities
export const prefetchQuery = (
  queryClient: QueryClient,
  queryKey: readonly unknown[],
  queryFn: () => Promise<unknown>,
  options?: { staleTime?: number; gcTime?: number },
) => {
  return queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
    gcTime: options?.gcTime ?? 10 * 60 * 1000, // 10 minutes
  });
};

// Cache utilities
export const setQueryData = <T>(
  queryClient: QueryClient,
  queryKey: readonly unknown[],
  data: T,
) => {
  return queryClient.setQueryData(queryKey, data);
};

export const getQueryData = <T>(
  queryClient: QueryClient,
  queryKey: readonly unknown[],
): T | undefined => {
  return queryClient.getQueryData<T>(queryKey);
};

// Remove queries utilities
export const removeQueries = (
  queryClient: QueryClient,
  queryKey: readonly unknown[],
) => {
  return queryClient.removeQueries({
    queryKey,
    exact: false,
  });
};

export const removeQueriesExact = (
  queryClient: QueryClient,
  queryKey: readonly unknown[],
) => {
  return queryClient.removeQueries({
    queryKey,
    exact: true,
  });
};

// Reset queries with v5 API
export const resetQueries = (
  queryClient: QueryClient,
  queryKey: readonly unknown[],
) => {
  return queryClient.resetQueries({
    queryKey,
    exact: false,
  });
};

// Common query options presets
export const commonQueryOptions = {
  // Short-lived data (user interactions, live data)
  shortLived: {
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes
  },

  // Medium-lived data (product lists, user preferences)
  mediumLived: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  },

  // Long-lived data (static content, configuration)
  longLived: {
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  },

  // Persistent data (rarely changes)
  persistent: {
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    gcTime: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
} as const;
