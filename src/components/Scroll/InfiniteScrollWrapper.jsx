import { useEffect, useRef, useCallback, useState } from "react";
import PropTypes from "prop-types";

export default function InfiniteScrollWrapper({
    query,
    children,
    scrollThreshold = 200,
    loadingText = "Loading...",
    showNoMoreText = true,
    className = "",
}) {
    const containerRef = useRef(null);
    const [isManualLoading, setIsManualLoading] = useState(false); // защита от параллельных вызовов

    // React Query flags
    const isFetchingNext = !!query.isFetchingNextPage;
    const isFetchingAny = !!query.isFetching;
    const hasMore = !!query.hasNextPage;

    const loadMore = useCallback(async () => {
        if (isFetchingNext || isManualLoading || !hasMore) return;
        setIsManualLoading(true);
        try {
            await query.fetchNextPage?.();
        } finally {
            setIsManualLoading(false);
        }
    }, [query, isFetchingNext, isManualLoading, hasMore]);

    const onScroll = useCallback(() => {
        const el = containerRef.current;
        if (!el || isFetchingNext || isManualLoading || !hasMore) return;

        const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
        if (remaining < scrollThreshold) {
            loadMore();
        }
    }, [isFetchingNext, isManualLoading, hasMore, scrollThreshold, loadMore]);

    // Подписываемся на scroll
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, [onScroll]);

    // Если при монтировании контент не заполняет контейнер, доберём страницы автоматически
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const tryAutoLoad = async () => {
            // пока есть следующая страница и контент не заполняет контейнер, грузим
            while (hasMore && (el.scrollHeight <= el.clientHeight + 1)) {
                // защита от параллельных fetch
                if (isFetchingNext) break;
                await loadMore();
                // небольшая пауза даст браузеру подстроить размеры
                await new Promise((r) => setTimeout(r, 50));
            }
        };

        tryAutoLoad().catch(() => {});
    }, [hasMore, query.data?.pages?.length, loadMore, isFetchingNext]);

    return (
        <div
            ref={containerRef}
            className={`overflow-y-auto overflow-x-hidden no-scrollbar h-full ${className}`}
        >
            {children}

            {/*{(isFetchingAny || isManualLoading) && (*/}
            {/*    <div className="flex justify-center py-4 text-gray-500">*/}
            {/*        {loadingText}*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*{!isFetchingAny && !hasMore && showNoMoreText && (*/}
            {/*    <div className="flex justify-center py-4 text-gray-400 text-sm">*/}
            {/*        --- no more items ---*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}

InfiniteScrollWrapper.propTypes = {
    query: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    scrollThreshold: PropTypes.number,
    loadingText: PropTypes.string,
    showNoMoreText: PropTypes.bool,
    className: PropTypes.string,
};