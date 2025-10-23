import { useState } from "react"

import {
  useRequestGetTodos,
  useRequestAddTodos,
  useRequestRemoveTodos,
  // useRequestUpdateTodos
} from "./hooks"
import "./App.css"

function App() {
  const [todoText, setTodoText] = useState("")
  const [refresh, setRefresh] = useState(false)

  const refreshTodos = () => setRefresh(!refresh) // для повторного рендера списка

  const todos = useRequestGetTodos(refresh) // получаем список

  const { isCreating, requestAddTodos } = useRequestAddTodos(
    todoText,
    refreshTodos
  ) // добавляем дело в список

  const { requestRemoveTodos } = useRequestRemoveTodos(refreshTodos) // вызываем хук для удаления

  function deleteTodo(id) {
    requestRemoveTodos(id) // удаляем дело из списка
  }

  function handleChange(event) {
    setTodoText(event.target.value)
  }

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

            <div className="todo__management">
              {todo.completed ? (
                <div className="todo_completed true">выполнено</div>
              ) : (
                <div className="todo_completed false">не выполнено</div>
              )}
              <div className="todo__buttons">
                <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
                <button>Редактировать</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
