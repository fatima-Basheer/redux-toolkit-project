// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchTodos, updateTodo, deleteTodo } from "./todosSlice";

// export default function TodosList() {
//   const { list, loading, page, total } = useSelector((state) => state.todos);
//   const dispatch = useDispatch();

//   const [editingId, setEditingId] = useState(null);
//   const [editText, setEditText] = useState("");

//   useEffect(() => {
//     dispatch(fetchTodos(page));
//   }, [dispatch, page]);

//   const handleEdit = (todo) => {
//     setEditingId(todo.id);
//     setEditText(todo.todo);
//   };

//   const handleSave = (id) => {
//     dispatch(updateTodo({ id, data: { todo: editText } }));
//     setEditingId(null);
//   };

//   return (
//     <div className="my-4">
//       <h2 className="text-2xl font-bold mb-4">Todos</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {list.map((todo) => (
//             <div key={todo.id} className="bg-white shadow p-4 rounded">
//               {editingId === todo.id ? (
//                 <>
//                   <input
//                     className="border p-2 w-full mb-2 rounded"
//                     value={editText}
//                     onChange={(e) => setEditText(e.target.value)}
//                   />

//                   <div className="flex gap-2">
//                     <button
//                       className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                       onClick={() => handleSave(todo.id)}
//                     >
//                       Save
//                     </button>

//                     <button
//                       className="bg-gray-400 text-white px-3 py-1 rounded"
//                       onClick={() => setEditingId(null)}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <p className="font-semibold">{todo.todo}</p>

//                   <div className="flex gap-2 mt-3 flex-wrap">
//                     <button
//                       className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                       onClick={() =>
//                         dispatch(
//                           updateTodo({
//                             id: todo.id,
//                             data: { completed: !todo.completed },
//                           }),
//                         )
//                       }
//                     >
//                       Toggle
//                     </button>

//                     <button
//                       className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                       onClick={() => handleEdit(todo)}
//                     >
//                       ✏️ Edit
//                     </button>

//                     <button
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-900"
//                       onClick={() => dispatch(deleteTodo(todo.id))}
//                     >
//                       ❌ Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "./todosSlice";

export default function TodosList() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.todos);

  const [newTodoText, setNewTodoText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // const handleAddTodo = () => {
  //   if (!newTodoText) return;

  //   const newTodo = { todo: newTodoText, completed: false };
  //   fetch("'https://dummyjson.com/todos", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(newTodo),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => dispatch(addTodo(data)));

  //   setNewTodoText("");
  // };


const handleAddTodo = (userId) => {
  if (!newTodoText[userId]) return;

  const newTodo = {
    todo: newTodoText[userId],
    completed: false,
    userId,
  };

  fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTodo),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch(addTodo(data)); 
      setNewTodoText({ ...newTodoText, [userId]: "" }); 
    });
};



  
  const handleSave = (id) => {
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: editText }),
    })
      .then((res) => res.json())
      .then((data) => dispatch(updateTodo({ id, data })));

    setEditingId(null);
  };

  const handleDelete = (id) => {
    fetch(`https://dummyjson.com/todos/${id}`, { method: "DELETE" })
      .then(() => dispatch(deleteTodo(id)));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Todos</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded flex-1"
          placeholder="New todo"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {list.map((todo) => (
            <li key={todo.id} className="flex justify-between items-center bg-gray-200 p-2 rounded">
              {editingId === todo.id ? (
                <div className="flex gap-2 flex-1">
                  <input
                    className="border p-1 rounded flex-1"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    className="bg-green-400 text-white px-2 py-1 rounded"
                    onClick={() => handleSave(todo.id)}
                  >
                    💾
                  </button>
                  <button
                    className="bg-gray-900 text-white px-2 py-1 rounded"
                    onClick={() => setEditingId(null)}
                  >
                    ✖
                  </button>
                </div>
              ) : (
                <>
                  <span className={todo.completed ? "line-through flex-1" : "flex-1"}>
                    {todo.todo}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() =>
                        handleSave(todo.id, { completed: !todo.completed })
                      }
                    >
                      Toggle
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => {
                        setEditingId(todo.id);
                        setEditText(todo.todo);
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(todo.id)}
                    >
                      ❌ Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}