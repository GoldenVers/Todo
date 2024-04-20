// Importing necessary modules and styles for the Tasks component
import React, { useEffect, useState } from 'react';
import { styles } from './style.js';

// Base URL for the API
const api_base = 'http://localhost:3001';

// Definition of the Tasks component
const Tasks = () => {
    // State variables for managing todos, new todo input, and popup visibility
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [popupActive, setPopupActive] = useState(false);

    // Effect hook to fetch todos when the component mounts
    useEffect(() => {
        GetTodos();
        console.log(todos); // Logging the fetched todos
        console.log('the data has been fetched'); // Logging a message after data fetch
    }, []);

    // Function to fetch todos from the API
    const GetTodos = () => {
        fetch(api_base + '/todos')
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch((err) => console.error("Error: ", err));
    }

    // Function to add a new todo
    const addTodo = async () => {
        const data = await fetch(api_base + '/todos/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                title: newTodo
            })
        }).then(res => res.json());

        setTodos([...todos, data]); // Adding the new todo to the todo list
        setNewTodo(''); // Clearing the new todo input
        setPopupActive(false); // Closing the popup
    }

    // Function to update the completion status of a todo
    const updateTodo = async (id) => {
        try {
            const response = await fetch(api_base + '/todos/update/' + id, {
                method: 'PUT', // Using PUT method for updating the todo
            });
            if (!response.ok) {
                throw new Error('Failed to update the todo');
            }
            const updatedTodo = await response.json();
            // Updating the todo list with the updated completion status
            setTodos(todos.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo));
        } catch (error) {
            console.error(error);
        }
    };
    
    // Function to delete a todo
    const deleteTodo = async (id) => {
        try {
            const response = await fetch(api_base + '/todos/delete/' + id, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete the todo');
            }
            const data = await response.json();
            // Updating the todo list after deletion
            setTodos(todos.filter(todo => todo._id !== data._id));
        } catch (err) {
            console.error(err);
        }
    };

    // Function to handle Enter key press for adding a new todo
    const handlekeyPress = (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    }

    // Rendering the Tasks component
    return (
        <div className='bg-gray-dark w-96 rounded-xl items-center justify-center flex flex-col p-2 relative space-y-2 '>
            {/* Header */}
            <div className='text-3xl text-white items-start justify-start'>
                Tasks
            </div>
            {/* Rendering todos
                * If there are todos, map through them and render each todo
                * If there are no todos, display a message
                * eah todo item has a delete button, a checkbox for completion status, and the todo title
                * The todo title has a line-through style if the todo is completed
                * The checkbox is checked if the todo is completed
                * The delete button deletes the todo when clicked
                * The checkbox updates the completion status of the todo when clicked
                * The button at the bottom opens the popup to add a new todo
                * 
            */}
            <>
               {todos.length > 0 ? (
                todos.map(todo => (
                    <div className='w-full h-14 m-3 bg-orange rounded-xl px-4 py-6 flex flex-row items-center justify-between' key={todo._id}>
                        {/* Delete button */}
                        <div
                            className='bg-dark-blue hover:bg-red w-6 h-6 rounded-full cursor-pointer text-white  flex items-center justify-center font-sans' 
                            onClick={() => deleteTodo(todo._id)}
                        >
                            X
                        </div>
                        {/* Todo item */}
                        <div className={` font-bold text-xl w-full flex flex-row justify-between items-center p-2 mb-1 ${todo.completed ? 'line-through text-dark_green' : ''}`}>
                            {todo.title}
                        </div>
                        {/* Checkbox for completion status */}
                        <input 
                            type='checkbox'
                            key={todo._id}
                            className='w-6 h-6 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer' 
                            checked={todo.completed}
                            onChange={() => updateTodo(todo._id)}
                        />
                    </div>
                )) )
                // Message for no tasks
                : (
                    <div className='text-white text-2xl items-center justify-center '>
                        No tasks available, try adding one! 
                    </div>
                )}
            </>
            {/* Button to add a new todo */}
            <button className="w-28 mt-3 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 text-3xl" onClick={() => setPopupActive(true)}>
                +
            </button>
            {/* Popup for adding new todo */}
            {popupActive ? (
                <div className="fixed bg-blue-800 rounded-xl p-4 top-50 left-96 items-center justify-center flex flex-col drop-shadow-xl">
                    <h3 className='font-bold'>Add Task</h3>
                    <div className="">
                        {/* Input for new todo */}
                        <input
                            type="text"
                            placeholder="get good at drawing..."
                            className="m-2 p-2 rounded-md bg-white focus:outline-none focus:ring focus:border-blue-300 placeholder:italic placeholder:text-sm placeholder:text-opacity-1"
                            onChange={e => setNewTodo(e.target.value)} value={newTodo}
                            onKeyPress={handlekeyPress}
                        />
                        {/* Button to create new todo */}
                        <input
                            type='button'
                            value='Create Task'
                            className='mt-2 px-4 py-2 bg-orange text-blue-500 rounded-md cursor-pointer hover:bg-blue-600 hover:text-white'
                            onClick={addTodo}
                        />
                    </div>        
                    {/* Button to close the popup */}
                    <div className="closePopup text-white cursor-pointer text-xl font-bold bg-orange rounded-xl p-2 px-4" onClick={() => setPopupActive(false)}>X</div>
                </div>
            ) : ''}
        </div>
    );
}

// Exporting the Tasks component
export default Tasks;
//the fronted is also done
//wallahi we are finished
