import { TrueIcon, FalseIcon } from "../../img/svg/Icons.jsx";
import PropTypes from "prop-types";

export default function PasswordRules({ className, values }) {
    const rules = [
        {
            id: 1,
            regex: /[A-Z]/,
            text: "At least one uppercase letter",
        },
        {
            id: 2,
            regex: /[a-z]/,
            text: "At least one lowercase letter",
        },
        {
            id: 3,
            regex: /\d/,
            text: "At least one number",
        },
        {
            id: 4,
            regex: /.{8,}/,
            text: "At least 8 characters",
        },
    ];

    return (
        <ul
            className={className}
        >
            {rules.map(({ id, regex, text }) => {
                return (
                    <li
                        data-valid={regex.test(values) ? '' : undefined}
                        key={id}
                        className="relative group font-noto text-xm pl-6 transition-colors data-valid:text-green-true"
                    >
                        <TrueIcon
                            className="absolute opacity-0 left-0 top-1 h-3 transition-opacity group-data-valid:opacity-100"
                        />
                        <FalseIcon
                            className="absolute opacity-100 left-0 top-1 h-3 transition-opacity group-data-valid:opacity-0"
                        />
                        {text}
                    </li>
                );
            })}
        </ul>
    );
}

PasswordRules.propTypes = {
    values: PropTypes.array.isRequired,
    className: PropTypes.string.isRequired,
}