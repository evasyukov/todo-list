import { useState } from "react"

export function useRequestAddTodos(todoText, refreshTodos) {
  const [isCreating, setIsCreating] = useState(false)

  function requestAddTodos() {
    setIsCreating(true)

    fetch("http://localhost:3005/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: todoText,
        completed: false,
      }),
    })
      .then((responce) => responce.json())
      .then(() => refreshTodos())
      .catch((error) => console.log("Ошибка при добавлении дела", error))
      .finally(() => setIsCreating(false))
  }

  return { isCreating, requestAddTodos }
}
