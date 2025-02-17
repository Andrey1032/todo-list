import React, { ButtonHTMLAttributes } from "react";

function Button({
    disabled,
    type,
    value,
    onClick,
    className,
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            disabled={disabled}
            type={type}
            className={`form__button text text_w-400 ${className}`}
            onClick={onClick}
        >
            {value}
        </button>
    );
}

export default Button;
