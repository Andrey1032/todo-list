"use client";

import React, { useState } from "react";
import Desk from "@/components/Desk";
import IDesk from "@/types/Desk";
import style from "@/styles/Desk.module.scss"

export default function Page() {
    const [desk, setDesk] = useState<IDesk>({
        id: 0,
        title: "Название доски",
        sections: [],
    });
    return (
        <div className={style["desk"]}>
            <Desk
                desk={desk}
                setDesk={(newTitle) => setDesk({ ...desk, title: newTitle })}
            />
        </div>
    );
}
