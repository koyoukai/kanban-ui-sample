import React, { useContext } from 'react'
import Task from './Task'
import { StateContext } from '../context'

const TaskList = ({ status, title, tasks }) => {
  const { globalState, dispatch } = useContext(StateContext)

  const handleDragOver = (e) => {
    e.preventDefault()
    if (e.dataTransfer) {
      console.log('drop ok')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('text/plain').split(',')
    dispatch({ type: 'MOVE_TASK', payload: { id: Number(data[0]), prevStatus: data[1], newStatus: status } })
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    console.log('dragleave')
  }


  return (
    <div className="box"
      id={status}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={e => handleDragLeave(e)}>
      <div className="box-title">{title}</div>
      {status === 'beforeWork' && <button className="new-task">課題を作成</button>}

      {tasks && tasks.map((task, idx) => (
        <Task key={idx} {...task} />
      ))}
    </div>
  )
}

export default TaskList
