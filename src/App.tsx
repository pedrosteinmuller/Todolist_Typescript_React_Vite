import Card from './components/Card';
import './App.css';
import { ChangeEvent, useEffect, useState } from 'react';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const App = () => {
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      return JSON.parse(storedTodos);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    setTodos((previousTodos) =>
      [...previousTodos, { id: Math.random(), title: todoInput, completed: false }]
    );

    setTodoInput('');
  }

  const completeTodo = (id: number) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) => todo.id !== id ? todo : { ...todo, completed: !todo.completed })
    );
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoInput(e.target.value);
  }

  const deleteTodo = (id: number) => {
    setTodos((previousTodos) => previousTodos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="App">
      <div className="add-todo">
        <input placeholder="Digite alguma tarefa" value={todoInput} onChange={handleInputChange} />
        <button onClick={addTodo}>Adicionar</button>
      </div>

      {
        todos.map((todo) => (
          <Card key={todo.id} todo={todo} completeTodo={completeTodo} deleteTodo={deleteTodo} />
        ))
      }
    </div>
  )
}

export default App