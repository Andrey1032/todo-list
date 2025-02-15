"use client";

import DashCircle from "../../../../public/dash-circle.svg";
import Trash from "../../../../public/trash3.svg";
import style from "./Button.module.scss";

interface IButton {
    type: "add" | "remove" | "trash";
    text?: string;
    onClick: () => void;
}

export default function Button({ type, text, onClick }: IButton) {
    switch (type) {
        case "add":
            return (
                <button className={style["button-add"]} onClick={onClick}>
                    + {text}
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
            return <button></button>;
    }
}
