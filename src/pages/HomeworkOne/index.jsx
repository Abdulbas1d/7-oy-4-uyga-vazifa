import React, { useContext, useEffect, useState, useRef } from 'react';
import './index.css';
import { Tasks } from '../../App';
import { Toaster, toast } from 'react-hot-toast';
import DeleteImage from '../../assets/images/remove.png'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function HomeworkOne() {
    const { data, setData } = useContext(Tasks);
    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "todo",
    });

    const inputRef = useRef(null);

    function validate() {
        if (!task.name) {
            alert("Biror bir task kiritishingiz kerak!");
            return false;
        }

        if (task.name.length < 3) {
            alert("Task eng kamida 3 ta belgidan iborat bo'lishi kerak!");
            return false;
        }

        return true;
    }

    if (!data || !setData) {
        console.error("Tasks context is not properly initialized.");
        return <p>Tasks context error.</p>;
    }

    function handleSubmit(event) {
        event.preventDefault();

        let isValid = validate();
        if (!isValid) {
            return;
        }

        const newTask = { ...task, id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}` };
        const newTasks = [...data, newTask];

        setData(newTasks)
        localStorage.setItem('tasks', JSON.stringify(newTasks));

        toast.success("Task muvaffaqiyatli qo'shildi!");

        setTask({
            id: '',
            name: "",
            status: 'todo',
        });
    }

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        if (savedTasks) {
            setData(savedTasks);
        }
    }, [setData]);

    useEffect(() => {
        if (data && data.length > 0) {
            localStorage.setItem('tasks', JSON.stringify(data));
        }
    }, [data]);

    function handleDelete(taskId) {
        const updatedTasks = data.filter((t) => t.id !== taskId);
        if (window.confirm("Rostdan ham o'chirmoqchimisiz?")) {
            setData(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            toast.error("Task o'chirildi!");
        }
    }

    function onDragEnd(result) {
        const { source, destination } = result;

        if (!destination) return;

        const reorderedTasks = Array.from(data);
        const [removed] = reorderedTasks.splice(source.index, 1);
        reorderedTasks.splice(destination.index, 0, removed);

        setData(reorderedTasks);
        localStorage.setItem("tasks", JSON.stringify(reorderedTasks));
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="container_Drop">
                <form onSubmit={handleSubmit} className="form">
                    <label htmlFor="text">Biror bir task kiriting!</label>
                    <input ref={inputRef} value={task.name} onChange={(e) => setTask({ ...task, name: e.target.value })} type="text" name="text" id="text" placeholder="Enter your task..." />
                    <button type="submit" className="btn">Add task</button>
                </form>

                <Toaster />

                <Droppable droppableId="tasks">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="taskChange">
                            {data && data.length > 0 ? (
                                data.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="task">
                                                <h2>
                                                    {task.name}
                                                    <button onClick={() => handleDelete(task.id)} className="delete">
                                                        <img src={DeleteImage} alt="Delete task" />
                                                    </button>
                                                </h2>
                                            </div>
                                        )}
                                    </Draggable>
                                ))
                            ) : (
                                <p className="no-tasks">No tasks available.</p>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
}

export default HomeworkOne;