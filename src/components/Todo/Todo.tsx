import { useRef, useState } from "react";

export const Todo = () => {
  const submitInputRef = useRef<HTMLInputElement>(null);

  type TodoType = { id: number; text: React.ReactNode }[];

  const initialTodo: TodoType = [
    {
      id: 1,
      text: "Learn React",
    },
    {
      id: 2,
      text: "Learn React",
    },
    {
      id: 3,
      text: "Learn React",
    },
  ];
  const [todo, setTodo] = useState<TodoType>(initialTodo);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    setTodo((prev) => [...prev, { id: prev.length, text: submitInputRef.current?.value }]);
  };

  const handleEdit = (id: number) => {
    const newTodoText = prompt(`Edit ${id}`);
    setTodo((prev) => prev.map((item) => (item.id === id ? { ...item, text: newTodoText } : item)));
  };
  const handleDelete = (id: number) => {
    setTodo((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <h1>Todo</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" ref={submitInputRef} required />
        <button type="submit">Add Todo</button>
      </form>

      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {todo.map((singleTodo) => (
          <li key={singleTodo.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <h3>{singleTodo.text}</h3>
            <div>
              <button onClick={() => handleEdit(singleTodo.id)}>Edit</button>
              <button onClick={() => handleDelete(singleTodo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
