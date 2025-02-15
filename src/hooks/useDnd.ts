import ISection from "@/types/Section";
import ITask from "@/types/Task";
import {
    DragEndEvent,
    DragOverEvent,
    MouseSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

interface IUseDnd {
    sections: ISection[];
    setSections: (sections: ISection[]) => void;
}

function useDnd({ sections, setSections }: IUseDnd) {
    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const isActiveASecton = active.data.current?.type === "Section";
        const isOverASection = over.data.current?.type === "Section";

        const activeSectionId = active.id;
        const overSectionId = over.id;

        if (activeSectionId === overSectionId) return;

        if (isActiveASecton && isOverASection) {
            const activeSectionIndex = sections.findIndex(
                (section) => section.id === activeSectionId
            );
            const overSectionIndex = sections.findIndex(
                (section) => section.id === overSectionId
            );
            setSections(
                arrayMove(sections, activeSectionIndex, overSectionIndex)
            );
        }
    };

    const onDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeTaskId = active.id;
        const overTaskId = over.id;

        if (activeTaskId === overTaskId) return;

        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";

        if (isActiveATask && isOverATask) {
            const sectionIndex = sections.findIndex(
                (section) => section.id === active.data.current?.sectionId
            );

            const activeTaskIndex = sections[sectionIndex]?.tasks?.findIndex(
                (task) => task.id === activeTaskId
            );

            const overTaskIndex = sections[sectionIndex]?.tasks?.findIndex(
                (task) => task.id === overTaskId
            );
            const newSections = sections.map((sec) =>
                sec.id === active.data.current?.sectionId
                    ? {
                          ...sections[sectionIndex],
                          tasks: arrayMove(
                              sections[sectionIndex].tasks,
                              activeTaskIndex,
                              overTaskIndex
                          ),
                      }
                    : sec
            );

            setSections(newSections);
        }

        const isOverASection = over.data.current?.type === "Section";

        if (
            (isActiveATask && isOverASection) ||
            (isActiveATask && isOverATask)
        ) {
            const activeSectionIndex = sections.findIndex(
                (section) => section.id === active.data.current?.sectionId
            );
            const overSectionIndex = sections.findIndex(
                (section) =>
                    section.id === over.data.current?.section?.id ||
                    section.id === over.data.current?.sectionId
            );

            if (activeSectionIndex === overSectionIndex) return;

            const activeTaskIndex = sections[
                activeSectionIndex
            ]?.tasks?.findIndex((task) => task.id === activeTaskId);

            const newActiveSection: ISection = {
                ...sections[activeSectionIndex],
                tasks: sections[activeSectionIndex].tasks.filter(
                    (task) => task.id !== activeTaskId
                ),
            };
            const newOverSection: ISection = {
                ...sections[overSectionIndex],
                tasks: sections[overSectionIndex].tasks.concat([
                    sections[activeSectionIndex].tasks[activeTaskIndex],
                ]),
            };

            const newSections = sections

                .map((section) =>
                    section.id === active.data.current?.section?.id ||
                    section.id === active.data.current?.sectionId
                        ? newActiveSection
                        : section
                )
                .map((section) =>
                    section.id === over.data.current?.section?.id ||
                    section.id === over.data.current?.sectionId
                        ? newOverSection
                        : section
                );
            setSections(newSections);
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 2,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 1000,
                tolerance: 10,
            },
        }),
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 2,
            },
        })
    );
    return { onDragEnd, onDragOver, sensors };
}
export default useDnd;
