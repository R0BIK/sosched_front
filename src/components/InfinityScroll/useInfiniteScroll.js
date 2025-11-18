import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

/**
 * Хук для бесконечной прокрутки с использованием React Query.
 *
 * @param {Object} query - Объект запроса от useInfiniteQuery (содержит hasNextPage, fetchNextPage, isFetchingNextPage)
 * @param {Object} options - Опции для IntersectionObserver (необязательно)
 * @returns {Function} ref - Реф, который нужно повесить на нижний элемент-триггер
 */
export function useInfiniteScroll(query, options = {}) {
    const { ref, inView } = useInView({
        threshold: 0,
        ...options, // Позволяет переопределить настройки, если нужно
    });

    useEffect(() => {
        // Проверяем:
        // 1. Элемент виден (inView)
        // 2. Есть следующая страница (query.hasNextPage)
        // 3. Прямо сейчас не идет загрузка (чтобы не спамить запросами)
        if (inView && query.hasNextPage && !query.isFetchingNextPage) {
            query.fetchNextPage();
        }
    }, [inView, query.hasNextPage, query.fetchNextPage, query.isFetchingNextPage, query]);

    return ref;
}