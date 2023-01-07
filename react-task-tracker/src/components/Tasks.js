import Task from "./Task"

const Tasks = ({tasks, onDelete, onToggle}) => {    
  return (
    <>
      {tasks.map((task, index) => (
        // task not working then we use index
        // <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
        <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle}/>
      ))}
    </>
  )
}

export default Tasks
