import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE ="http://localhost:3000";
const API_PATH = "/api/todo"; 
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
});

const Todo = () => {
  const [inp, setInp] = useState("");
  const [todos, setTodos] = useState([]); 
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`${API_PATH}`);
        setTodos(data);
      } catch (e) {
        setServerError(e?.response?.data?.message || e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
 console.log(todos)
  const addOrUpdate = async () => {
    setError("");
    setServerError("");

    const text = inp.trim();
    if (!text) {
      setError("text is required");
      return;
    }

    if (!editId && todos.some((t) => t.text === text && !t.done)) {
      setError("already exists");
      return;
    }

    try {
      if (editId) {
        const { data: updated } = await api.patch(`${API_PATH}/${editId}`, { text });
        setTodos((curr) => curr.map((t) => (t._id === editId ? updated : t)));
        setEditId(null);
        setInp("");
        return;
      }
      const { data: created } = await api.post(`${API_PATH}`, { text });
      setTodos((curr) => [created, ...curr]); // newest first
      setInp("");
    } catch (e) {
      setServerError(e?.response?.data?.message || e.message || "Request failed");
    }
  };

  const handleDelete = async (_id) => {
    setServerError("");
    try {
      await api.delete(`${API_PATH}/${_id}`);
      setTodos((curr) => curr.filter((t) => t._id !== _id));
    } catch (e) {
      setServerError(e?.response?.data?.message || e.message || "Delete failed");
    }
  };

  const handleEdit = (todo) => {
    setInp(todo.text);
    setEditId(todo._id);
  };

  const handleToggleDone = async (_id) => {
    setServerError("");
    const t = todos.find((x) => x._id === _id);
    if (!t) return;

    try {
      const { data: updated } = await api.patch(`${API_PATH}/${_id}`, {
        done: !t.done,
      });
      setTodos((curr) => curr.map((x) => (x._id === _id ? updated : x)));
    } catch (e) {
      setServerError(e?.response?.data?.message || e.message || "Toggle failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-5">
        <div className="text-gray-600">Loading…</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="mb-4 text-2xl font-bold text-center text-blue-600">
          Todo App
        </h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addOrUpdate()}
            placeholder="Write here..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            onClick={addOrUpdate}
            className="px-4 py-2 font-medium text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
        {serverError && <p className="mb-3 text-sm text-red-500">{serverError}</p>}
        {todos.some((t) => !t.done) ? (
          <>
            <h2 className="mt-5 mb-2 text-lg font-semibold text-gray-700">
              Active Tasks
            </h2>
            <ul className="space-y-3">
              {todos
                .filter((t) => !t.done)
                .map((todo) => (
                  <li
                    key={todo._id}
                    className="flex items-center justify-between px-3 py-2 border rounded-lg shadow-sm bg-gray-50"
                  >
                    <span className="font-medium text-gray-800">
                      {todo.text}
                    </span>
                    <div className="flex gap-2">
                      <button
                        disabled={!!editId}
                        onClick={() => handleEdit(todo)}
                        className="px-2 py-1 text-white bg-yellow-400 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-yellow-500"
                      >
                        Edit
                      </button>
                      <button
                        disabled={!!editId}
                        onClick={() => handleDelete(todo._id)}
                        className="px-2 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Delete
                      </button>
                      <button
                        disabled={!!editId}
                        onClick={() => handleToggleDone(todo._id)}
                        className="px-2 py-1 text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Done
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </>
        ) : (
          <h1>No Todos Yet</h1>
        )}

        {/* Done Tasks */}
        {todos.some((t) => t.done) && (
          <>
            <h2 className="mt-6 mb-2 text-lg font-semibold text-gray-700">
              Done Tasks
            </h2>
            <ul className="space-y-3">
              {todos
                .filter((t) => t.done)
                .map((todo) => (
                  <li
                    key={todo._id}
                    className="flex items-center justify-between px-3 py-2 border rounded-lg shadow-sm bg-green-50"
                  >
                    <span className="font-medium text-gray-600 line-through">
                      {todo.text}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(todo._id)}
                        className="px-2 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleToggleDone(todo._id)}
                        className="px-2 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        Undo
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;
