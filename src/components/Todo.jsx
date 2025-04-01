import React, { useState, useRef, useEffect } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoItems from './TodoItems';

const Todo = () => {   
const [todoList, setTodoList] = useState(
    localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
);

const inputRef = useRef();

const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText ==="") return;

    const newTodo = {
        id: Date.now(),
        text: inputText,
        isComplete: false,
    }
    setTodoList((prev) => [...prev, newTodo])
    inputRef.current.value = "";
}

const deleteTodo = (id) => {
    setTodoList((prvTodos) => prvTodos.filter((todo) => todo.id !== id));
} 

const toggle = (id) => {
    setTodoList((prevTodos) =>
        prevTodos.map((todo) =>
            todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
        )
    );
}

useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
}, [todoList]);

return (
    <div 
      className="flex items-center justify-center w-full h-screen"
      style={{
        background: "linear-gradient(to right, #CD5C5C, #DE3163)",
        overflow: "hidden",  // Removes Scrollbar
      }}
    >
      <div 
        className="w-11/12 max-w-lg flex flex-col p-6 min-h-[500px] rounded-2xl shadow-xl transition-all duration-300"
        style={{
          background: '#ffffff',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Title */}
        <div className='flex items-center mt-2 gap-3'>
            <img className='w-9' src={todo_icon} alt='Todo Icon'></img>
            <h1 className='text-3xl font-bold text-gray-900'>To-Do List</h1>
        </div>

        {/* Input Box */}
        <div className='flex items-center my-5 p-3 rounded-xl bg-gray-200'>
            <input 
                ref={inputRef} 
                className='bg-transparent border-0 outline-none flex-1 h-12 px-4 text-black placeholder-gray-700 text-lg'
                type="text" 
                placeholder="Add your task"
            />
            <button 
                onClick={add} 
                className='border-none rounded-lg w-24 h-12 text-white text-lg font-semibold cursor-pointer transition-all duration-300'
                style={{ background: 'linear-gradient(to right, #DE3163, #DE3163)' }}
            >
                ADD
            </button>
        </div>

        {/* To-Do List */}
        <div className="flex-1 overflow-auto">
            {todoList.length === 0 ? (
                <p className="text-center text-gray-500 mt-10 text-lg">No tasks added</p>
            ) : (
                todoList.map((item, index) => (
                    <TodoItems 
                        key={index} 
                        text={item.text} 
                        id={item.id} 
                        isComplete={item.isComplete} 
                        deleteTodo={deleteTodo} 
                        toggle={toggle} 
                    />
                ))
            )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
