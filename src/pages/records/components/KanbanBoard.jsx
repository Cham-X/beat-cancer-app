import React, { useMemo, useState } from 'react';

import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import ColumnContainer from './ColumnContainer';

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
                                <ColumnContainer
                                    key={col.id}
                                    column={col}
                                    deleteColumn={deleteColumn}
                                    updateColumn={updateColumn}
                                    createTask={createTask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                    tasks={tasks.filter((task) => task.columnId === col.id)}
                                />
                            })}
                        </SortableContext>
                    </div>
                    <button
                        onClick={() => createNewColumn()}
                        className="flex h-[60px] w-[350px] min-w-[350px] cursor-pointer gap-2 rounded-lg border-2 border-columnBackgroundColor bg-mainBackgroundColor p-4 ring-green-500 hover:ring-2"
                    >
                        <IconPlus />
                        Add Column
                    </button>
                </div>
            </DndContext>
        </div>
    );

    function createTask(columnId) {
        const newTask = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.lenght + 1}`
        }

        setTasks([...tasks, newTask]);
    }

    function deleteTask(id) {
        const newTask = tasks.filter((task) => task.id !== id)
        setTasks(newTask)
    }

    function updateColumn(id, title) {
        setColumns(columns.map((col) => (col.id === id ? { ...col, title } : col)))
    }

    function updateTask(id, content) {
        const newTask = tasks.map((task) => task.id === id ? { ...task, content } : task,
        )
        setTasks(newTask)
    }

    function createNewColumn() {

    }

    function deleteColumn(id) {
        setColumns(columns.filter((col) => col.id !== id))
        setTasks(tasks.filter((task) => task.columnId !== id))
    }
}

export default KanbanBoard;
