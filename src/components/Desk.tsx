"use client";

import Menu from "@/components/Menu";
import Section from "@/components/Section";
import Button from "@/components/UI/Button/Button";
import useDnd from "@/hooks/useDnd";
import style from "@/styles/Desk.module.scss";
import IDesk from "@/types/Desk";
import ISection from "@/types/Section";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import { useMemo, useState } from "react";

interface IDeskComponent {
    desk: IDesk;
    setDesk: (newTitle: string) => void;
}

export default function Desk({ desk, setDesk }: IDeskComponent) {
    const [sections, setSections] = useState<ISection[]>([]);
    const [editMode, setEditMode] = useState<boolean>(false);
    const SectionId = useMemo(
        () => sections.map((section) => section.id),
        [sections]
    );

    const delSection = (delId: number) => {
        setSections(sections?.filter((val) => delId !== val.id && val));
    };

    const createSection = () => {
        setSections([
            ...sections,
            {
                id: sections.length,
                title: `Cекция ${sections.length + 1}`,
                tasks: [],
            },
        ]);
    };
    const changeTitleSection = (newTitle: string, sectionId: number) => {
        setSections(
            sections.map((section) =>
                section.id === sectionId
                    ? { ...section, title: newTitle }
                    : section
            )
        );
    };

    const { onDragEnd, onDragOver, sensors } = useDnd({
        sections,
        setSections,
    });
    return (
        <main className={style["desk"]}>
            <div className={`${style["desk__header"]} `}>
                <h1
                    className={style["desk__title"]}
                    onDoubleClick={() => setEditMode(!editMode)}
                >
                    {editMode ? (
                        <input
                            className={"edit-mode"}
                            autoFocus
                            onBlur={() => setEditMode(false)}
                            value={desk.title}
                            onChange={(e) =>
                                setDesk(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.code === "Enter") setEditMode(false);
                            }}
                        />
                    ) : (
                        <>{desk.title}</>
                    )}
                </h1>
                <Menu className={[style["desk__menu"]]}>
                    <Button
                        type="add"
                        onClick={() => {
                            createSection();
                        }}
                    >
                        Добавить секцию
                    </Button>
                </Menu>
            </div>
            <div className={style["sections"]}>
                <DndContext
                    sensors={sensors}
                    onDragEnd={onDragEnd}
                    onDragOver={onDragOver}
                >
                    <SortableContext items={SectionId}>
                        {sections.map((section) => (
                            <Section
                                key={section.id}
                                section={section}
                                sections={sections}
                                setSections={setSections}
                                delSection={() => delSection(section.id)}
                                changeTitleSection={(newTitle: string) =>
                                    changeTitleSection(newTitle, section.id)
                                }
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </main>
    );
}
