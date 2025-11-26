import PropTypes from "prop-types";
import {useState} from "react";

export default function ToggleWithDescription({title, description, onChange}) {
    const [checked, setChecked] = useState(false);

    const handleChange = (e) => {
        setChecked(e.target.checked);
        onChange?.(e.target.checked); // передаём значение наверх
    };

    return (
        <div className="flex items-center justify-between my-4 gap-10 w-full">
            <span className="flex grow flex-col">
                <label id={title + "-label"} htmlFor={title} className="text-xm font-medium text-gray-900">
                  {title}
                </label>
                <span id={title + "-description"} className="text-sm text-gray-500">
                  {description}
                </span>
            </span>
            <div className="group relative inline-flex w-11 shrink-0 rounded-full bg-gray-200 p-0.5 inset-ring inset-ring-gray-900/5 outline-offset-2 outline-accent transition-colors duration-200 ease-in-out has-checked:bg-accent has-focus-visible:outline-2">
                <span className="size-5 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-5" />
                <input
                    id={title}
                    name={title}
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                    aria-labelledby={title + "-label"}
                    aria-describedby={title + "-description"}
                    className="absolute inset-0 appearance-none focus:outline-hidden"
                />
            </div>
        </div>
    )
}

ToggleWithDescription.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    onChange: PropTypes.func,
}
