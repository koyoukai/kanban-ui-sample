import React from 'react'

const Task = ({ id, name, status }) => {

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', `${e.target.id.replace('task-', '')},${status}`)
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="task" draggable="true" id={`task-${id}`} onDragStart={e => handleDragStart(e)}>
      <div className="task-name">{name}</div>
    </div>
  )
}

export default Task
