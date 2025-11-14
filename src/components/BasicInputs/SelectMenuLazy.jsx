'use client'

import {
    Label,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions
} from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/16/solid';
import { CheckIcon } from '@heroicons/react/20/solid';
import PropTypes from 'prop-types';
import {useMemo, useRef, useCallback, useEffect} from 'react';
import { SPECIAL } from '../../../constants.js';

export default function SelectMenuLazy({
    query,
    value,
    label,
    onChange,
    withColor = false,
}) {
    const containerRef = useRef(null);

    // Собираем все items из infinite query
    const array = useMemo(() => {
        return query.data?.pages.flatMap((p) => p.items) ?? [];
    }, [query.data]);

    const getColorByName = (name) =>
        Object.values(SPECIAL.TAG_COLORS).find((c) => c.name === name)?.text;

    const selectedItem = array.length
        ? array.find((i) => i.id === value) || array[0]
        : null;

    useEffect(() => {
        const selectedItem = array.length
            ? array.find((i) => i.id === value) || array[0]
            : null;

        onChange(selectedItem.id);
    }, [array.length, value]);

    // Scroll handler
    const onScroll = useCallback(() => {
        const el = containerRef.current;
        if (!el) return;

        const bottom = el.scrollHeight - el.scrollTop - el.clientHeight;

        if (bottom < 80 && query.hasNextPage && !query.isFetching) {
            query.fetchNextPage();
        }
    }, [query]);

    return (
        <Listbox value={selectedItem} onChange={(val) => onChange(val.id)}>
            <Label className="block text-xm font-semibold ml-1 font-noto text-gray-900">
                {label}
            </Label>

            <div className="relative mt-2 font-noto">
                <ListboxButton className="flex w-full justify-between cursor-default rounded-md bg-main-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline outline-1 outline-gray-300 sm:text-sm">
                    <div className="flex items-center">
                        {withColor && selectedItem && (
                            <div
                                className="rounded-full w-4 h-4 mr-2"
                                style={{ backgroundColor: getColorByName(selectedItem.name) }}
                            />
                        )}
                        <span className="truncate pr-6">
                            {selectedItem ? selectedItem.name : ''}
                        </span>
                    </div>
                    <ChevronUpDownIcon className="size-5 text-gray-500" />
                </ListboxButton>

                <ListboxOptions
                    ref={containerRef}
                    onScroll={onScroll}
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline outline-1 outline-black/5 sm:text-sm"
                >
                    {array.map((item) => (
                        <ListboxOption
                            key={item.id}
                            value={item}
                            className="group relative flex items-center cursor-default py-2 pr-9 pl-3 text-gray-900 data-focus:bg-indigo-600 data-focus:text-white"
                        >
                            {withColor && (
                                <div
                                    className="rounded-full w-4 h-4 mr-2"
                                    style={{ backgroundColor: getColorByName(item.name) }}
                                />
                            )}

                            <span className="block truncate font-normal group-data-selected:font-semibold">
                                {item.name}
                            </span>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                <CheckIcon className="size-5" />
                            </span>
                        </ListboxOption>
                    ))}

                    {/*{query.isFetching && (*/}
                    {/*    <div className="w-full text-center py-2 text-gray-400">*/}
                    {/*        Loading...*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </ListboxOptions>
            </div>
        </Listbox>
    );
}

SelectMenuLazy.propTypes = {
    query: PropTypes.object.isRequired,
    value: PropTypes.any,
    label: PropTypes.string,
    onChange: PropTypes.func,
    withColor: PropTypes.bool,
};