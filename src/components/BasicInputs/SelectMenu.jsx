'use client'

import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import PropTypes from "prop-types";
import {SPECIAL} from "../../../constants.js";
import {useEffect} from "react"; // Предполагается, что путь верный

export default function SelectMenu({
   array,
   value,
   label,
   onChange = null,
   withColor = false
}) {
    const getColorByName = (name) =>
        Object.values(SPECIAL.TAG_COLORS).find(color => color.name === name)?.text;

    // Находим полный объект по 'value', который теперь является 'id'
    const selectedItem = array.length > 0
        ? array.find(item => item.id === value) || array[0]
        : null;

    // Внутренний onChange Headless UI вернет весь объект
    // Мы извлекаем из него 'id' и передаем дальше
    const handleOnChange = (selectedObject) => {
        if (onChange) {
            onChange(selectedObject.id); // Передаем только ID
        }
    };

    useEffect(() => {
        if (value == null && array.length > 0) {
            onChange(array[0].id);
        }
        // вызывается только при первом появлении array
    }, [array.length]);

    return (
        // Listbox теперь в качестве 'value' использует весь найденный объект
        <Listbox value={selectedItem} onChange={handleOnChange}>
            <Label className="block text-xm font-semibold ml-1 font-noto text-gray-900">{label}</Label>
            <div className="relative mt-2 font-noto">
                <ListboxButton className="flex w-full justify-between cursor-default grid-cols-1 rounded-md bg-main-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
                    <div className="flex items-center">
                        {withColor && selectedItem && ( // Проверяем, что selectedItem найден
                            <div
                                className="rounded-full w-4 h-4 mr-2"
                                style={{backgroundColor: getColorByName(selectedItem.name)}} // Используем .name
                            />
                        )}
                        <span className="truncate pr-6">{selectedItem ? selectedItem.name : ''}</span>
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
                            key={item.id} // Ключ по ID
                            value={item}    // Значение - весь объект
                            className="group relative flex items-center cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                        >
                            {withColor && (
                                <div
                                    className="rounded-full w-4 h-4 mr-2"
                                    style={{backgroundColor: getColorByName(item.name)}} // Используем .name
                                />
                            )}
                            {/* Отображаем .name */}
                            <span className="block truncate font-normal group-data-selected:font-semibold">
                                {item.name}
                            </span>

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
    array: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.any.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired,
    value: PropTypes.any,
    label: PropTypes.string,
    onChange: PropTypes.func,
    withColor: PropTypes.bool,
}