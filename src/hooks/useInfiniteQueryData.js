import { useMemo } from "react";

/**
 * Хук для зручного отримання даних з useInfiniteQuery.
 * Автоматично робить flatMap для сторінок і дістає totalCount.
 *
 * @param {object} queryResult - Результат виконання хука useInfiniteQuery
 * @returns {object} { items, totalCount, ...queryResult }
 */
export function useInfiniteQueryData(queryResult) {

    // Мемоізуємо масив items, щоб flatMap не виконувався при кожному рендері,
    // якщо дані не змінилися.
    const items = useMemo(() => {
        return queryResult.data?.pages.flatMap((page) => page.items) ?? [];
    }, [queryResult.data]);

    // Дістаємо totalCount з першої сторінки (або 0, якщо даних немає)
    const totalCount = queryResult.data?.pages?.[0]?.totalCount ?? 0;

    return {
        ...queryResult, // Прокидаємо всі оригінальні поля (isLoading, isError, fetchNextPage...)
        items,          // Наш готовий плоский масив
        totalCount      // Загальна кількість
    };
}