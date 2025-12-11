'use client'

import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import PropTypes from "prop-types";
import { SPECIAL } from "../../../constants/constants.js";
import {useEffect} from "react";

export default function SelectMenu({
   array,
   value,
    error,
   label,
   onChange = null,
   withColor = false
}) {
    const getColorByName = (name) =>
        Object.values(SPECIAL.TAG_COLORS).find(color => color.name === name)?.text;

    // Находим объект по ID для отображения имени и цвета
    const selectedItem = value != null
        ? array.find(item => item.id === value) || array.find(item => item.name === value)
        : array[0] || null;

    useEffect(() => {
        if (!onChange || !selectedItem) return;
        onChange(selectedItem.id);
    }, [selectedItem]);


    const handleOnChange = (id) => {
        if (onChange) {
            onChange(id);
        }
    };

    return (
        <Listbox value={selectedItem?.id} onChange={handleOnChange}>
            <Label className="block text-xm font-semibold ml-1 font-noto text-main-black">
                {label}
            </Label>

            <div className="relative mt-2 font-noto">
                <ListboxButton className="flex w-full justify-between cursor-default rounded-md bg-main-white py-1.5 pr-2 pl-3 text-left text-main-black outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent text-sm/6">
                    <div className="flex items-center">
                        {withColor && selectedItem && (
                            <div
                                className="rounded-full w-4 h-4 mr-2"
                                style={{ backgroundColor: getColorByName(selectedItem.name) }}
                            />
                        )}
                        <span className="truncate pr-6">{selectedItem?.name || ''}</span>
                    </div>
                    <ChevronUpDownIcon
                        aria-hidden="true"
                        className="self-center justify-self-end text-gray-500 size-4"
                    />
                </ListboxButton>

                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 sm:text-sm">
                    {array?.map((item) => (
                        <ListboxOption
                            key={item.id}
                            value={item.id} // теперь value — это ID
                            className="group relative flex items-center cursor-default py-2 pr-9 pl-3 text-gray-900 data-focus:bg-accent data-focus:text-main-white"
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
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-accent group-not-data-selected:hidden group-data-focus:text-main-white">
                                <CheckIcon aria-hidden="true" className="size-5" />
                            </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
            <p className="mt-2 block text-xs ml-1 text-red-false h-4">
                {error}
            </p>
        </Listbox>
    )
}

SelectMenu.propTypes = {
    array: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.any.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired,
    value: PropTypes.any,
    error: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    withColor: PropTypes.bool,
}