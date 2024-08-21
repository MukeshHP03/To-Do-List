import React, { useState } from 'react';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editedTask, setEditedTask] = useState('');
  const [indexToEdit, setIndexToEdit] = useState(null);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleInputKeyDown(event) {
    if (event.key === 'Enter') {
        if(indexToEdit == null)
            addTask();
        else{
            saveEditedTasks()
        }
    }
  }

  function addTask() {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTask('');
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, ind) => ind !== index);
    setTasks(updatedTasks);
  }

  function taskMoveUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function taskMoveDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function editTask(index) {
    setIndexToEdit(index); 
    setEditedTask(tasks[index]); 
  }

  function saveEditedTasks() {
    const updatedTasks = [...tasks];
    updatedTasks[indexToEdit] = editedTask; 
    setTasks(updatedTasks);
    setEditedTask(''); 
    setIndexToEdit(null); 
  }

  return (
    <div className='to-do-list'>
      <h1>To Do List</h1>
      <div>
        <input
          type='text'
          placeholder='Add Task...'
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <button className='add-btn' onClick={addTask}>
          Add
        </button>
      </div>
      <ol>
        {tasks.map((task, ind) => (
          <li key={ind}>
            <span className='text'>
              {indexToEdit === ind ? (
                <input
                  type='text'
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                />
              ) : (
                task
              )}
            </span>
            {indexToEdit === ind ? (
              <button className='save-btn' onClick={saveEditedTasks}>
                Save
              </button>
            ) : (
              <button className='edit-btn' onClick={() => editTask(ind)}>
                Edit
              </button>
            )}
            <button className='delete-btn' onClick={() => deleteTask(ind)}>
              Delete
            </button>
            <button className='move-btn' onClick={() => taskMoveUp(ind)}>
              Up
            </button>
            <button className='move-btn' onClick={() => taskMoveDown(ind)}>
              Down
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ToDoList;
