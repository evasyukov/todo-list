// import { useState, useEffect } from "react"

import { useRequestGetTodos } from "./hooks"
import "./App.css"

function App() {
  const todos = useRequestGetTodos()


  return (
    <>
      <form className="add-todo">
        <textarea
          className="add-todo__textarea"
          autocomplete="off"
          placeholder="Что поделаем?"
          rows="2"
          required
        />

        <button className="add-todo_button" type="submit">
          Добавить дело
        </button>
      </form>

      <div className="todo-list">
        {Object.values(todos.todos || {}).map((todo) => (
          <div className="todo" key={todo.id}>
            <div className="todo__title">{todo.title}</div>
            {todo.completed ? (
              <div className="todo_completed true">выполнено</div>
            ) : (
              <div className="todo_completed false">не выполнено</div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
