import React from "react";
import { PulseLoader } from "react-spinners";

import style from "@/styles/Loader.module.scss";

export default function Loader() {
    return (
        <div className={style["loader"]}>
            <PulseLoader color={"#171717"} />
        </div>
    );
}
