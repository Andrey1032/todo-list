import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { authService } from "@/services/auth/auth.service";

import { IAuthForm } from "@/shared/types/auth.interface";
import { PRIVATE_URL, PUBLIC_URL } from "@/config/url.config";
import { getUserData } from "@/services/auth/auth-token.service";

export function useAuthForm(isReg?: boolean, refresh?: boolean) {
    const router = useRouter();
    const form = useForm<IAuthForm>({
        defaultValues: {
            login: "",
            password: "",
            repeat_password: "",
            email: "",
        },
        mode: "onSubmit",
    });

    const onSubmit: SubmitHandler<IAuthForm> = (data) => {
        if (refresh) {
            return authService
                .main("refpass", data)
                .then(() => {
                    alert(
                        "На вашу почту было отправлено сообщение с дальнейшими указаниями!"
                    );
                    router.push(PUBLIC_URL.auth("signIn"));
                })
                .catch(() =>
                    form.setError("apiError", {
                        type: "custom",
                        message:
                            "Ошибка восстановаления пароля, попробуйте позже.",
                    })
                );
        }

        if (isReg && data.password !== data.repeat_password) {
            return alert("Пароли не совпадают!");
        }

        return authService
            .main(isReg ? "registration" : "login", data)
            .then((data) => {
                const user = getUserData(data?.data?.accessToken);
                router.push(PRIVATE_URL.home("", user?.role));
            })
            .catch((e) =>
                form.setError("apiError", {
                    type: "custom",
                    message: isReg
                        ? e?.response?.data?.message ||
                          "Ошибка регистрации, попробуйте позже!"
                        : "Не удалось авторизироваться, попробуйте позже!",
                })
            );
    };

    return { onSubmit, form, isSubmitting: form.formState.isSubmitting };
}
