import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";

export default function TaskBoard() {
    const defaultTask = {
        'id': crypto.randomUUID(),
        'title': "Learn react",
        'description': "I want to learn react so that I can treat it like my slave and make it do whatever I wanna do.",
        'tags': ["web", "react", "js"],
        'priority': "High",
        'isFavorite': true
    }
    const [tasks, setTasks] = useState([defaultTask]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);

    function handleAddEditTask(newTask, isAdd) {
        if (isAdd) {
            setTasks([...tasks, newTask])
        } else {
            setTasks(tasks.map(task => {
                if (task.id === newTask.id) {
                    return newTask
                }
                return task
            }))
        }

        setShowAddModal(false)
        setTaskToUpdate(null)
    }

    function handleEditTask(task) {
        setTaskToUpdate(task);
        setShowAddModal(true);
    }

    function handleCloseClick() {
        setShowAddModal(false)
        setTaskToUpdate(null)
    }

    function handleDeleteTask(taskId) {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    function handleFav(taskId) {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                return {
                    ...task,
                    isFavorite: !task.isFavorite
                }
            } else {
                return task
            }
        }))
    }

    function handleSearch(searchTerm) {
        console.log(searchTerm);

        const filtered = tasks.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))

        setTasks([...filtered])
    }

    return (
        <section className="mb-20 mx-10 flex justify-center" id="tasks">
            {showAddModal &&
                <AddTaskModal
                    onSave={handleAddEditTask}
                    taskToUpdate={taskToUpdate}
                    onCloseClick={handleCloseClick}
                />
            }
            <div className="container">
                <div className="p-2 flex justify-end">
                    <SearchTask onSearch={handleSearch} />
                </div>
                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskActions
                        onAddClick={() => setShowAddModal(true)}
                        onDeleteAllClick={() => setTasks([])}
                    />
                    {
                        tasks.length > 0 ? (
                            <TaskList
                                tasks={tasks}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                                onFav={handleFav}
                            />
                        ) : (
                            <NoTaskFound />
                        )
                    }
                </div>
            </div>
        </section>
    )
}
