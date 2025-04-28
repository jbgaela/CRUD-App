import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [theme, setTheme] = useState("dark");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const addTodoHandler = async () => {
    if (!newTodo.trim()) return;

    try {
      await axios.post(API_URL, { title: newTodo, completed: 0 });
      setNewTodo("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodoHandler = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const editTodoHandler = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };

  const updateTodoHandler = async (id) => {
    if (!editText.trim()) return;

    try {
      await axios.put(`${API_URL}/${id}`, { title: editText });
      setEditingId(null);
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleToggleComplete = async (id, currentStatus, title) => {
    try {
      await axios.put(`${API_URL}/${id}`, {
        title,
        completed: currentStatus ? 0 : 1,
      });
      fetchTodos();
    } catch (error) {
      console.error("Error toggling completion status:", error);
    }
  };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter") {
      updateTodoHandler(id);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center p-6 relative">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 btn btn-sm btn-accent"
      >
        {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
      <h1 className="text-3xl font-bold mb-6 mt-4">Todo List App</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Add new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodoHandler()}
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={addTodoHandler} className="btn btn-primary">
          Add
        </button>
      </div>
      <div className="w-full max-w-md">
        {todos.length === 0 ? (
          <p className="text-center">No todos yet.</p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`flex items-center justify-between p-4 bg-base-100 shadow rounded-lg ${
                  todo.completed ? "opacity-70" : ""
                }`}
              >
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, todo.id)}
                    onBlur={() => updateTodoHandler(todo.id)}
                    autoFocus
                    className="input input-bordered input-sm w-full"
                  />
                ) : (
                  <span className={todo.completed ? "line-through" : ""}>
                    {todo.title}
                  </span>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleToggleComplete(todo.id, todo.completed, todo.title)
                    }
                    className={`btn btn-sm ${
                      todo.completed ? "btn-success" : "btn-ghost"
                    }`}
                    disabled={editingId === todo.id}
                  >
                    {todo.completed ? "✓" : "○"}
                  </button>
                  <button
                    onClick={() => editTodoHandler(todo)}
                    className="btn btn-warning btn-sm"
                    disabled={editingId === todo.id}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodoHandler(todo.id)}
                    className="btn btn-error btn-sm"
                    disabled={editingId === todo.id}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
