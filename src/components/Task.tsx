import React, { useState } from "react";
import Button from "./UI/Button/Button";
import style from "@/styles/Task.module.scss";
import ITask from "@/types/Task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface ITaskComponent {
    sectionId?: number;
    task: ITask;
    delTask: () => void;
    changeValueTask: (value: string) => void;
}

export default function Task({
    sectionId,
    task,
    delTask,
    changeValueTask,
}: ITaskComponent) {
    const [editMode, setEditMode] = useState<boolean>(false);

    const { setNodeRef, attributes, listeners, transform, transition } =
        useSortable({
            id: task.id,
            data: {
                type: "Task",
                task,
                sectionId,
            },
        });

    const styleDnd = {
        transition,
        touchAction: "none",
        transform: CSS.Transform.toString(transform),
    };

    
    return (
        <div
            ref={setNodeRef}
            style={styleDnd}
            {...attributes}
            {...listeners}
            className={`${style["task"]}`}
        >
            <span
                className={style["task__text"]}
                onDoubleClick={() => setEditMode(!editMode)}
            >
                {editMode ? (
                    <input
                        className={"edit-mode edit-mode_align-s"}
                        autoFocus
                        onBlur={() => setEditMode(false)}
                        value={task.value}
                        onChange={(e) => changeValueTask(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.code === "Enter") setEditMode(false);
                        }}
                    />
                ) : (
                    <>{task.value}</>
                )}
            </span>
            <Button type="remove" onClick={delTask} />
        </div>
    );
}
