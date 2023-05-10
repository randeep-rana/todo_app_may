import { useEffect, useState } from "react";
import InputContainer from "./components/InputContainer";
import './App.css';
import { Check, Edit, Trash } from "lucide-react";

export const getListFromLocalStorage = () => {
  const list = JSON.parse(window?.localStorage?.getItem("todos"));
  if (list) {
    return list;
  }

  return [];
};

export const setListInLocalStorage = (list) => {
  localStorage.setItem('todos', JSON.stringify(list))
};

function App() {
  const [todos, setTodos] = useState(getListFromLocalStorage());
  const [focusedTodo, setFocusedTodo] = useState({});

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
    setListInLocalStorage([...todos, newTodo]);
  };

  const handleDelete = (id) => {
    const newTodoList = todos.filter((todo) => todo.id !== id);
    setTodos(newTodoList);
    setListInLocalStorage(newTodoList);
  };

  const handleUpdate = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    setFocusedTodo(todoToUpdate);
  };

  const handleComplete = (id) => {
    const updatedTodoList = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: todo.done ? false : true
        };
      }

      return todo;
    });

    setTodos(updatedTodoList);
    setListInLocalStorage(updatedTodoList);
  };

  const updateTodo = (updatedTodo) => {
    const updatedTodoList = todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo;
      }

      return todo;
    });

    setTodos(updatedTodoList);
    setListInLocalStorage(updatedTodoList);
    setFocusedTodo({}); 
  };

  return (
    <div className="App">
      <h1>PLAN YOUR DAY</h1>
      <InputContainer addTodo={addTodo} />

      {
        todos.length > 0 ? null : <div className="title-container">
          <h3>Welcome to Beautiful Day planner 👋</h3>
          <p>Make PLANS / SCHEDULES / STRATEGIES with us and achieve your goals</p>
          <p>This app is made with ❤️ by Randeep Rana😄</p>
        </div> 
      }

      <div className="todosContainer">
        {todos.map((todo) => (
          <div className="todo updateContainer" key={todo.id}>
            {focusedTodo.id === todo.id ? (
              <InputContainer updateTodo={updateTodo} todo={focusedTodo} isEditing={true} />
            ) : (
              <>
                <span className={todo?.done ? "done todoItem" : "todoItem"}>
                  {todo.value}
                </span>

                <div className="icons">
                  <Trash className="icon trash-icon" color="red" onClick={() => handleDelete(todo.id)}/>
                  <Edit className="icon edit-icon" color="yellow" onClick={() => handleUpdate(todo.id)}/>
                  <Check className="icon" color="green" onClick={() => handleComplete(todo.id)} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

