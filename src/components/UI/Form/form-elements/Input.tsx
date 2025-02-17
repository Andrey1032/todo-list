import { IAuthForm } from "@/types/auth.interface";
import { ErrorMessage } from "@hookform/error-message";
import { HTMLInputAutoCompleteAttribute } from "react";
import { ControllerRenderProps, FieldErrors } from "react-hook-form";

interface IInput {
    field:
        | ControllerRenderProps<IAuthForm, "email">
        | ControllerRenderProps<IAuthForm, "login">
        | ControllerRenderProps<IAuthForm, "password">
        | ControllerRenderProps<IAuthForm, "repeat_password">;
    type?: string;
    placeholder: string;
    onClick?: () => void;
    errors?: FieldErrors<IAuthForm>;
    name: keyof IAuthForm;
    autoComplete?: HTMLInputAutoCompleteAttribute;
}

export default function Input({
    field,
    type = "text",
    placeholder,
    onClick,
    errors,
    name,
    autoComplete,
}: IInput) {
    return (
        <>
            <input
                {...field}
                className="form__input text text_size-20 text_w-300 text_let-spac-2"
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                onClick={onClick}
            />
            {errors && <ErrorMessage errors={errors} name={name} />}
        </>
    );
}
