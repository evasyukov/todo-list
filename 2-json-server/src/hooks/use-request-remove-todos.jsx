// import { useState } from "react"

export function useRequestRemoveTodos(refreshTodos) {
    
  function requestRemoveTodos(id) {
    fetch(`http://localhost:3005/todos/${id}`, {
      method: "DELETE",
    })
      .then((responce) => responce.json())
      .then(() => refreshTodos())
      .catch((error) => console.log("Ошибка при удалении дела", error))
  }

  return { requestRemoveTodos }
}
