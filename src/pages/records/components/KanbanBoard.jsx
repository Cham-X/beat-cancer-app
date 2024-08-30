import React, { useMemo, useState } from 'react';

import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"

const KanbanBoard = ({ state }) => {
    const defaultCols = state?.state?.columns.map((col) => ({
        id: col?.id,
        title: col?.title,
    })) || [];

    const defaultTasks = state?.state?.tasks.map((task) => ({
        id: task?.id,
        columnId: task?.columnId,
        content: task?.content,
    })) || [];

    const [columns, setColumns] = useState(defaultCols)
    const [tasks, setTasks] = useState(defaultTasks)

    const columnId = useMemo(() => columns.map((col) => col.id))
    const [activeTask, setActiveTask] = useState(null)
    const [activeColumn, setActiveColumn] = useState(null)

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    )



    return (
        <div className='mt-5 min-h-screen w-72 text-white'>
            <DndContext
                sensors={sensors}
                onDragStart={() => { }}
                onDragEnd={() => { }}
                onDragOver={() => { }}
            >
                <div className='m-auto gap-4'>
                    <div className='flex gap-4'>
                        <SortableContext>
                            {columns.map((col) => {
                                <p>column container</p>
                            })}
                        </SortableContext>
                    </div>
                </div>
            </DndContext>
        </div>
    );
}

export default KanbanBoard;
