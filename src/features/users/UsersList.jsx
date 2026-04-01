import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodos,
  updateTodo,
  deleteTodo,
  addTodo,
} from "../todos/todosSlice";

function UsersList() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.list);
  const loading = useSelector((state) => state.todos.loading);

  const [users, setUsers] = useState([]);
  const [todosMap, setTodosMap] = useState({});
  const [view, setView] = useState("list");
  const [newTodoText, setNewTodoText] = useState({});
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    const map = {};
    todos.forEach((todo) => {
      if (!map[todo.userId]) map[todo.userId] = [];
      map[todo.userId].push(todo);
    });
    setTodosMap(map);
  }, [todos]);

  const handleAddTodo = (userId) => {
    if (!newTodoText[userId]) return;
    const newTodo = {
      id: Date.now(),
      todo: newTodoText[userId],
      completed: false,
      userId,
    };
    dispatch(addTodo(newTodo));
    setNewTodoText({ ...newTodoText, [userId]: "" });
  };

  const handleEditTodo = (todo) => {
    setEditingTodoId(todo.id);
    setEditingText(todo.todo);
  };

  const handleSaveTodo = (id) => {
    dispatch(updateTodo({ id, data: { todo: editingText } }));
    setEditingTodoId(null);
    setEditingText("");
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-6 justify-center">
        <button
          className={`px-14 py-2 rounded font-semibold ${view === "card" ? "bg-blue-900 text-white" : "bg-gray-300"}`}
          onClick={() => setView("card")}
        >
          Card View
        </button>
        <button
          className={`px-14 py-2 rounded font-semibold ${view === "list" ? "bg-blue-900 text-white" : "bg-gray-300"}`}
          onClick={() => setView("list")}
        >
          List View
        </button>
      </div>
      {view === "list" && (
        <div className="space-y-2">
          {users.map((user) => (
            <div key={user.id} className="bg-gray-200 p-3 rounded">
              {user.firstName} {user.lastName} - {user.email}
            </div>
          ))}
        </div>
      )}

      {view === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white border border-gray-300 p-4 rounded shadow hover:shadow-md transition"
            >
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
              />

              <h3 className="text-lg font-bold mb-1 text-center">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-600 mb-3 text-center">
                {user.email}
              </p>

              <div className="relative mt-2">
                <input
                  className="border p-2 w-full pr-16"
                  placeholder="Add new todo"
                  value={newTodoText[user.id] || ""}
                  onChange={(e) =>
                    setNewTodoText({
                      ...newTodoText,
                      [user.id]: e.target.value,
                    })
                  }
                />
                <button
                  className="absolute right-0 top-0 bottom-0 bg-green-600 text-white px-4 py-1 font-semibold"
                  onClick={() => handleAddTodo(user.id)}
                >
                  Add Todo
                </button>
              </div>

              <ul className="list-disc ml-5 space-y-1 mb-3 max-h-48 mt-3 overflow-y-auto">
                {(todosMap[user.id] || []).map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center justify-between gap-2"
                  >
                    {editingTodoId === todo.id ? (
                      <div className="flex gap-2 flex-1">
                        <input
                          className="border p-1 rounded flex-1"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                        />
                        <button
                          className="bg-green-400 text-white px-2 py-1 rounded"
                          onClick={() => handleSaveTodo(todo.id)}
                        >
                          💾
                        </button>
                        <button
                          className="bg-gray-900 text-white px-2 py-1 rounded"
                          onClick={() => setEditingTodoId(null)}
                        >
                          ✖
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 flex-1">
                        <span
                          className={
                            todo.completed ? "line-through flex-1" : "flex-1"
                          }
                        >
                          {todo.todo}
                        </span>
                        <button
                          className="bg-blue-300 text-white px-2 py-1 rounded"
                          onClick={() =>
                            dispatch(
                              updateTodo({
                                id: todo.id,
                                data: { completed: !todo.completed },
                              }),
                            )
                          }
                        >
                          Toggle
                        </button>
                        <button
                          className="bg-purple-300 text-white px-2 py-1 rounded"
                          onClick={() => handleEditTodo(todo)}
                        >
                          ✏️
                        </button>
                        <button
                          className="bg-red-300 text-white px-2 py-1 rounded"
                          onClick={() => dispatch(deleteTodo(todo.id))}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {loading && <p className="text-center mt-4">Loading todos...</p>}
    </div>
  );
}

export default UsersList;
