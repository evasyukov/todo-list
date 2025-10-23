import { useState } from "react"

import {
  useRequestGetTodos,
  useRequestAddTodos,
  useRequestRemoveTodos,
  useRequestUpdateTodos,
} from "./hooks"
import "./App.css"

function App() {
  const [todoText, setTodoText] = useState("")
  const [refresh, setRefresh] = useState(false) // флаг для отслеживания изменений в списке
  const [editingId, setEditingId] = useState(null) // отслеживаем процесс редактирования
  const [editingText, setEditingText] = useState("") // обновленный текст дела

  const refreshTodos = () => setRefresh(!refresh)

  // хуки для взаимодействия со списком дел
  const todos = useRequestGetTodos(refresh) // получаем список
  const { requestAddTodos } = useRequestAddTodos(todoText, refreshTodos)
  const { requestUpdateTodos } = useRequestUpdateTodos(refreshTodos)
  const { requestRemoveTodos } = useRequestRemoveTodos(refreshTodos)

  // получаем текст дела
  function handleChange(event) {
    setTodoText(event.target.value)
  }

  // добавление дела
  function submitTodos(event) {
    event.preventDefault()
    requestAddTodos()
    setTodoText("")
  }

  // удаляем дело из списка
  function deleteTodo(id) {
    requestRemoveTodos(id)
  }

  // начало редактирования
  function startEditing(todo) {
    setEditingId(todo.id)
    setEditingText(todo.title)
  }

  // измеяем текст дела
  function handleTitleChange(event) {
    setEditingText(event.target.value)
  }

  // сохраняем изменения
  function saveTitle(todo) {
    requestUpdateTodos(todo.id, { title: editingText })
    setEditingId(null)
  }

  // изменение статуса дела
  function toggleCompleted(todo) {
    requestUpdateTodos(todo.id, { completed: !todo.completed })
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
            <div className="todo__title">
              {editingId === todo.id ? (
                <input
                  value={editingText}
                  onChange={handleTitleChange}
                  onBlur={() => saveTitle(todo)} // сохраняем при потере фокуса
                  onKeyDown={(event) => {
                    if (event.key === "Enter") saveTitle(todo)
                  }}
                  autoFocus
                />
              ) : (
                todo.title
              )}
            </div>

            <div className="todo__management">
              <div
                className={`todo_completed ${todo.completed}`}
                onClick={() => toggleCompleted(todo)}
              >
                {todo.completed ? "выполнено" : "не выполнено"}
              </div>

              <div className="todo__buttons">
                <button onClick={() => startEditing(todo)}>
                  Редактировать
                </button>
                <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
