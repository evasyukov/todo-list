import { useState, useEffect } from "react"

export function useRequestGetTodos(refresh) {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch("http://localhost:3005/todos")
      .then((response) => response.json())
      .then((todoList) => {
        setTodos(todoList)
      })
      .catch(() => console.log("Ошибка запроса"))
  }, [refresh])

  return todos
}
