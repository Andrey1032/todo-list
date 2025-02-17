"use client";

import { AuthFields } from "../AuthFields";
import { API_URL } from "@/config/api.config";
import { useRouter } from "next/navigation";
import { useAuthForm } from "@/hooks/useAuthForm";
import Button from "@/components/UI/Form/form-elements/Button";
import { ErrorMessage } from "@hookform/error-message";
import style from "@/styles/Auth.module.scss";
import Loader from "@/components/Loader";

export default function Auth() {
    const router = useRouter();
    const { onSubmit, form, isSubmitting } = useAuthForm(true);

    return (
        <div className={style.auth}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="form">
                <h1 className="form__title text text_size-36 text_w-500">
                    Регистрация
                </h1>
                <AuthFields form={form} isReg={true} />
                {isSubmitting && (
                    <Loader />
                )}
                <ErrorMessage errors={form.formState.errors} name="apiError" />
                <div className="form__buttons">
                    <Button
                        disabled={isSubmitting}
                        className="button_1"
                        type="submit"
                        value="Зарегистрироваться"
                        onClick={() => form.clearErrors("apiError")}
                    />
                    <Button
                        className="button_2"
                        type="button"
                        value="Войти в аккаунт"
                        onClick={() => router.push(API_URL.auth("/signIn"))}
                    />
                </div>
            </form>
        </div>
    );
}
