import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header";
import Tasks from "./components/Tasks";

import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About"

// Arrow function
const App = () => {

  const [ showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

// 
const fetchTasks = async () => {
  const response = await fetch('http://localhost:5000/tasks')
  const data = await response.json()

  return data
}

const fetchTask = async (id) => {
  const response = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await response.json()

  return data
}
// Add Task
const addTask = async (task) => {
  const insert = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await insert.json()

  setTasks([...tasks, data])

  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = { id, ...task }
  // setTasks([ ...tasks, newTask ])
}

// Delete Task
const deleteTask = async (id) => {
  // console.log('delete', id)
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  })

  setTasks(tasks.filter((task) => task.id !== id))
}

// Toggle Reminder
const toggleReminder = async (id) => {

  const taskToToggle = await fetchTask(id)
  const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

  const update = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updatedTask)
  })

  const data = await update.json()

  // console.log(id)
  setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
}

  return (
    <Router>
     <div className="container">
       <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
       {showAddTask && <AddTask onAdd={addTask}/>}
       {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks To Show'}
       <Footer/>
       <Routes>
        <Route path="/" exact render= { props => {(
              <>
          {showAddTask && <AddTask onAdd={addTask}/>}
       {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks To Show'}
          </>
            )}} />
        <Route path="/about" element={<About />} />
       </Routes>
     </div>
     </Router>
   );
 }


 export default App;

 // function

//  function App() {
//   return (
//      <div className="container">
//        <Header/>
//      </div>    
//    );
//  }
//  export default App;

// import React from "react";
// If we need to use Class instead of function
// class App extends React.Component {
//   render() {
//     return <h1>Hello from class</h1>
    
//   }
// }
// export default App;
