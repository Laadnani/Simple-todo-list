import { useEffect, useState } from 'react'
import './App.css'




function App() {
  
  const [Item, setItem] = useState('');
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("Items")
      if (localValue == null) return []
      return JSON.parse(localValue)
  });

  useEffect(() => {
    localStorage.setItem("Items", JSON.stringify(todos))
  }, [todos])

  function handleSubmit (e) {
    e.preventDefault() 

    setTodos(currentTodos => {
      return [
        ...currentTodos, 
        {
          id: crypto.randomUUID(),
          title: Item,
          completed: false,
        }
      ]
    })
  }

function toggletodo (id, completed) {
  setTodos(currentTodos => {
    return currentTodos.map(todo => {
      if (todo.id === id) { 
      return {...todo, completed}
    }

      return todo
    })
  })
}

function deletetodo (id) {
  setTodos(currentTodos => {
    return currentTodos.filter(todo => todo.id != id)
  })
}


  return (
    <> 
    <section className='Top-bar' >
      <h2>To do list</h2>
      <label htmlFor="search">Add Todos</label>
      <br />
      <input type="text" 
      value={Item}
       onChange={e => setItem(e.target.value)}
       
       className='search' />
       <br />
      <button className='Add' onClick={handleSubmit}> add </button>
    </section>
    <ul className='list'> <h2> To do list : </h2> 
    <br/>
    
      {todos.map(todo => {
        return (
          <li key={todo.id}>
          <input 
          type="checkbox" 
          checked={todo.completed}
          onChange={(e) => toggletodo(todo.id, e.target.checked)} />
          <label>{todo.title}</label> 
          <button className="Delete" onClick={() => deletetodo(todo.id)}>delete</button>
         </li>
        )
      })}

  </ul>
    </>
  )
}

export default App
