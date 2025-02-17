"use client";

import { ReactNode } from "react";
import style from "../styles/Menu.module.scss";
import Button from "./UI/Button/Button";
import { getAccessToken } from "@/services/auth/auth-token.service";
import { useRouter } from "next/navigation";
import { PUBLIC_URL } from "@/config/url.config";

export default function Menu({
    className,
    children,
}: {
    className?: string[];
    children: ReactNode;
}) {
    const isAuth = getAccessToken();
    const router = useRouter();
    return (
        <nav
            className={`${style["menu"]} ${className?.map(
                (style) => `${style}`
            )}`}
        >
            {children}
            <Button onClick={() => router.push(PUBLIC_URL.auth("signIn"))}>
                {isAuth ? "Выйти" : "Войти"}
            </Button>
        </nav>
    );
}
