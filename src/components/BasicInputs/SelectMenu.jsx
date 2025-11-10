'use client'

import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import PropTypes from "prop-types";
import {SPECIAL} from "../../../constants.js";

export default function SelectMenu({array, value, label, onChange, withColor}) {
    const getColorByName = (name) =>
        Object.values(SPECIAL.tagColors).find(color => color.name === name)?.text;

    return (
        <Listbox value={value} onChange={onChange}>
            <Label className="block text-xm font-semibold ml-1 font-noto text-gray-900">{label}</Label>
            <div className="relative mt-2">
                <ListboxButton className="flex w-full justify-between cursor-default grid-cols-1 rounded-md bg-main-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                    <div className="flex items-center">
                        {withColor && (
                            <div className="rounded-full w-4 h-4 mr-2" style={{backgroundColor: getColorByName(value)}}/>
                        )}
                        <span className="truncate pr-6">{value}</span>
                    </div>
                    <ChevronUpDownIcon
                        aria-hidden="true"
                        className="size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                >
                    {array.map((item) => (
                        <ListboxOption
                            key={item}
                            value={item}
                            className="group relative flex items-center font-noto cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                        >
                            {withColor && (
                                <div className="rounded-full w-4 h-4 mr-2" style={{backgroundColor: getColorByName(item)}}/>
                            )}
                            <span className="block font-noto truncate font-normal group-data-selected:font-semibold">{item}</span>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                                <CheckIcon aria-hidden="true" className="size-5" />
                            </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}

SelectMenu.propTypes = {
    array: PropTypes.objectOf(PropTypes.string).isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    withColor: PropTypes.bool,
}
