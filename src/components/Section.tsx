"use client";
import { v4 } from "uuid";
import Grip from "../../public/grip-vertical.svg";
import Button from "./UI/Button/Button";
import Task from "./Task";
import style from "@/styles/Section.module.scss";
import { useMemo, useState } from "react";
import ISection from "@/types/Section";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ISectionComponent {
    section: ISection;
    sections: ISection[];
    setSections: (sections: ISection[]) => void;
    delSection: () => void;
    changeTitleSection: (newTitle: string) => void;
}

export default function Section({
    section,
    sections,
    setSections,
    delSection,
    changeTitleSection,
}: ISectionComponent) {
    const [editMode, setEditMode] = useState<boolean>(false);

    const tasksId = useMemo(
        () => section?.tasks?.map((task) => task?.id),
        [section]
    );
    const delTask = (delId: string) => {
        setSections(
            sections.map((sec) =>
                sec.id === section.id
                    ? {
                          ...sec,
                          tasks: section.tasks.filter(
                              (task) => task.id !== delId && task
                          ),
                      }
                    : sec
            )
        );
    };

    const createTask = () => {
        setSections(
            sections.map((sec) =>
                sec.id === section.id
                    ? {
                          ...sec,
                          tasks: [
                              ...sec.tasks,
                              {
                                  id: v4(),
                                  value: `Задача ${sec.tasks.length + 1}`,
                              },
                          ],
                      }
                    : sec
            )
        );
    };

    const { setNodeRef, attributes, listeners, transform, transition } =
        useSortable({
            id: section.id,
            data: {
                type: "Section",
                section,
            },
        });

    const styleDnd = {
        transition,
        touchAction: "none",
        transform: CSS.Transform.toString(transform),
    };

    const changeValueTask = (taskId: string, newValue: string) => {
        setSections(
            sections.map((sec) =>
                sec.id === section.id
                    ? {
                          ...sec,
                          tasks: sec.tasks.map((task) =>
                              task.id === taskId
                                  ? {
                                        id: task.id,
                                        value: newValue,
                                    }
                                  : task
                          ),
                      }
                    : sec
            )
        );
    };
    return (
        <section
            ref={setNodeRef}
            style={styleDnd}
            className={`${style["section"]}`}
        >
            <div className={style["section__content"]}>
                <div className={style["section__header"]} {...attributes}>
                    <Grip className={style["section__grip"]} {...listeners} />
                    <h3
                        className={style["section__title"]}
                        onDoubleClick={() => setEditMode(!editMode)}
                    >
                        <div className={style["section__task-count"]}>
                            {section.tasks.length}
                        </div>
                        {editMode ? (
                            <input
                                className={"edit-mode"}
                                autoFocus
                                onBlur={() => setEditMode(false)}
                                value={section.title}
                                onChange={(e) =>
                                    changeTitleSection(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.code === "Enter") setEditMode(false);
                                }}
                            />
                        ) : (
                            <>{section.title}</>
                        )}
                    </h3>
                    <Button type="trash" onClick={() => delSection()} />
                </div>
                <div className={style["section__tasks"]}>
                    <SortableContext items={tasksId}>
                        {section.tasks?.map((task) => (
                            <Task
                                key={task.id}
                                sectionId={section.id}
                                task={task}
                                delTask={() => delTask(task.id)}
                                changeValueTask={(newValue) =>
                                    changeValueTask(task.id, newValue)
                                }
                            />
                        ))}
                    </SortableContext>
                </div>

                <div className={style["section__button-add-task"]}>
                    <Button type="add" onClick={() => createTask()}>
                        Добавить задачу
                    </Button>
                </div>
            </div>
        </section>
    );
}
