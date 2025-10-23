import { useState } from "react"

import { useRequestGetTodos, useRequestAddTodos } from "./hooks"
import "./App.css"

function App() {
  const [todoText, setTodoText] = useState("")
  const [refresh, setRefresh] = useState(false)

  const refreshTodos = () => setRefresh(!refresh) // для повторного рендера списка

  const todos = useRequestGetTodos(refresh)

  function handleChange(event) {
    setTodoText(event.target.value)
  }

  const { isCreating, requestAddTodos } = useRequestAddTodos(todoText, refreshTodos)

  function submitTodos(event) {
    event.preventDefault()
    requestAddTodos()
    setTodoText("")
  }

  return (
    <>
      <form className="add-todo" onSubmit={submitTodos}>
        <textarea
          className="add-todo__textarea"
          autoComplete="off"
          placeholder="Что поделаем?"
          rows="2"
          required
          value={todoText}
          onInput={handleChange}
        />

        <button className="add-todo_button" type="submit">
          Добавить дело
        </button>
      </form>

      <div className="todo-list">
        {todos.map((todo) => (
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
