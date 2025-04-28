export const isArrayWithItems = <T>(array: T[] | undefined | null): array is T[] =>
    Array.isArray(array) && array.length > 0;
