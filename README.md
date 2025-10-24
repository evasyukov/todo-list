# Список дел на React
Два варианта реализации:
- С помощью сервиса json-placeholder, где мы только заплашиваем и отрисовываем данные
- С помощью пакета json-server, где реализован функционал CRUD-операций, а также сортировка по алфавиту и поиск по тексу дела

# Установка и запуск проекта
1. Клонируйте репозиторий:
    ```bash
    https://github.com/evasyukov/todo-list
    ```

2. Перейдите в директорию проекта:

   Вариант с json-placeholder
    ```bash
    cd .\1-json-placeholer\
    ```
    Вариант с библиотеками
     ```bash
    cd .\2-json-server\
    ```

4. Установите зависимости:
    ```bash
    npm install
    ```

5. Запустите проект:
    ```bash
    npm run dev
    ```
6. Запустите json-server
    ```bash
    json-server --watch src/db.json --port 3005
    ```
