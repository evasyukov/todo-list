import { useState, useEffect } from "react"
import "./App.css"

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch("http://localhost:3005/todos")
      .then((response) => response.json())
      .then((todoList) => {
        setTodos(todoList)
      })
      .catch(() => console.log("Ошибка запроса"))
  }, [])

  console.log(todos)

  return (
    <div className="todo-list">
      {Object.entries(todos).map(({ id, title, completed }) => (
        <div className="todo" key={id}>
          <div className="todo__title"> {title}</div>
          {completed ? (
            <div className="todo_completed true">выполнено</div>
          ) : (
            <div className="todo_completed false"> не выполнено</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default App
