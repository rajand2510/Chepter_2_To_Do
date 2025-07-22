import React, { useState } from 'react'

const Todo = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'task 1', status: 'todo' },
        { id: 2, title: 'task 2', status: 'in-progress' },
        { id: 3, title: 'task 3', status: 'todo' },
        { id: 4, title: 'task 1', status: 'todo' },
        { id: 5, title: 'task 2', status: 'in-progress' },
        { id: 6, title: 'task 3', status: 'todo' },
        { id: 7, title: 'task 3', status: 'todo' },
        { id: 8, title: 'task 1', status: 'todo' },
        { id: 9, title: 'task 2', status: 'in-progress' },
        { id: 10, title: 'task 3', status: 'todo' },
        { id: 11, title: 'task 3', status: 'todo' },
        { id: 12, title: 'task 1', status: 'todo' },
        { id: 13, title: 'task 2', status: 'in-progress' },
        { id: 14, title: 'task 3', status: 'todo' },
    ]);
    const [newTask, setNewTask] = useState('');

    // Add new task
    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTask.trim() === '') return;
        setTasks([
            ...tasks,
            {
                id: Date.now(),
                title: newTask,
                status: 'todo'
            }
        ]);
        setNewTask('');
    };

    const handleStatusChange = (id, newStatus) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, status: newStatus } : task
        ));
    };

const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
};

const renderTasks = (status, color, textColor) => (
    <ul className='overflow-y-auto max-h-[100%]'>
        {tasks.filter(task => task.status === status).map((task) => (
            <li
                key={task.id}
                    className={`${color} p-2 px-4 mb-1 rounded-3xl ${textColor} font-semibold flex justify-between items-center`}
                >
                    <span>{task.title}</span>
                    {/* Dropdown Actions */}
                    <div className="hs-dropdown relative inline-flex">
                        
                        <button
                            id={`hs-dropdown-default-${task.id}`}
                            type="button"
                            className="hs-dropdown-toggle py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-2xl border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            aria-label="Dropdown"
                            onClick={e => {
                                e.stopPropagation();
                                const menu = document.getElementById(`dropdown-menu-${task.id}`);
                                if (menu) menu.classList.toggle('hidden');
                            }}
                        >
                           
                            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </button>
                        <button onClick={() => handleDeleteTask(task.id)} className='text-xs px-1 h-4 my-2 ml-2 bg-black text-white rounded-3xl'>X</button>
                        <div
                            id={`dropdown-menu-${task.id}`}
                            className="transition-[opacity,margin] duration opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 absolute z-10 right-0"
                            style={{ opacity: 1 }}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby={`hs-dropdown-default-${task.id}`}
                            onMouseLeave={e => e.currentTarget.classList.add('hidden')}
                        >
                            <div className="p-1 space-y-0.5">
                                <button
                                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 w-full text-left"
                                    onClick={() => handleStatusChange(task.id, 'todo')}
                                >
                                    To Do
                                </button>
                                <button
                                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 w-full text-left"
                                    onClick={() => handleStatusChange(task.id, 'in-progress')}
                                >
                                    In Progress
                                </button>
                                <button
                                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 w-full text-left"
                                    onClick={() => handleStatusChange(task.id, 'completed')}
                                >
                                    Completed
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
    return (
        <div className='flex flex-col items-center'>
            {/* Input for adding new task */}
            <form onSubmit={handleAddTask} className="flex gap-2 mb-6 w-1/2 bg-[#282828] mt-2 p-1 rounded-3xl">
                <input
                    type="text"
                    className="flex-1 p-2 rounded text-[#CBD87D] placeholder:text-[#CBD87D] focus:outline-none outline-none"
                    placeholder="Add new task..."
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-white text-black  px-5 mr-1 h-10 m rounded-3xl"
                >
                    Add
                </button>
            </form>
            <div className='flex flex-row m-10 gap-5 w-full justify-center'>

                <div className='font-sans flex flex-col items-center w-[30%] h-[70vh] bg-[#CBD87D] p-2 rounded-3xl'>
                    <div className='flex flex-row justify-between w-full py-2 px-4'>
                        <h3 className='font-bold text-lg text-white'>To Do</h3>
                        <p className='text-xs py-1 mt-1 text-gray-500 bg-gray-200/60 px-2 rounded-3xl'>
                            Task : {tasks.filter(task => task.status === 'todo').length}
                        </p>
                    </div>
                    <div className='bg-white w-full rounded-2xl p-2 h-[90%] '>
                        {renderTasks('todo', 'bg-[#CBD87D]', 'text-white')}
                    </div>
                </div>

                <div className='font-sans flex flex-col justify-center items-center w-[30%] h-auto bg-[#A6A0D2] p-2 rounded-3xl'>
                    <div className='flex flex-row justify-between w-full py-2 px-4'>
                        <h3 className='font-bold text-lg text-white'>In Progress</h3>
                        <p className='text-xs py-1 mt-1 text-gray-500 bg-gray-200/60 px-2 rounded-3xl'>
                            Task : {tasks.filter(task => task.status === 'in-progress').length}
                        </p>
                    </div>
                    <div className='bg-white w-full rounded-2xl p-2 h-[90%]'>
                        {renderTasks('in-progress', 'bg-[#A6A0D2]', 'text-white')}
                    </div>
                </div>

                <div className='font-sans flex flex-col justify-center items-center w-[30%] h-auto bg-[#EAECEB] p-2 rounded-3xl'>
                    <div className='flex flex-row justify-between w-full py-2 px-4'>
                        <h3 className='font-bold text-lg text-black'>Completed</h3>
                        <p className='text-xs py-1 mt-1 text-gray-500 bg-black/10 px-2 rounded-3xl'>
                            Task : {tasks.filter(task => task.status === 'completed').length}
                        </p>
                    </div>
                    <div className='bg-white w-full rounded-2xl p-2 h-[90%]'>
                        {renderTasks('completed', 'bg-[#EAECEB]', 'text-black')}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Todo