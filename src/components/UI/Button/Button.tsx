"use client";

import { ReactNode } from "react";
import DashCircle from "../../../../public/dash-circle.svg";
import Trash from "../../../../public/trash3.svg";
import style from "./Button.module.scss";

interface IButton {
    type?: "add" | "remove" | "trash";
    children?: ReactNode,
    onClick: () => void;
}

export default function Button({ type, children, onClick }: IButton) {
    switch (type) {
        case "add":
            return (
                <button className={style["button-add"]} onClick={onClick}>
                    + {children}
                </button>
            );
        case "remove":
            return (
                <DashCircle
                    className={style["button-remove"]}
                    onClick={onClick}
                />
            );
        case "trash":
            return (
                <Trash
                    className={style["button-trash"]}
                    src="/trash3.svg"
                    width={16}
                    height={16}
                    onClick={onClick}
                />
            );
        default:
            return (
                <button className={style["button-add"]} onClick={onClick}>
                    {children}
                </button>
            );
    }
}
