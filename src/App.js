import React, { useReducer } from 'react';
import TaskList from './components/TaskList'
import { StateContext } from './context'
import './App.css';

function App() {
  const initialState = {
    tasks: [
      { id: 1, name: '簡単なモックUIを作成', status: 'completed', createdAt: '2020-07-13' },
      { id: 2, name: 'ドラッグ＆ドロップAPIを調べる', status: 'progress', createdAt: '2020-07-15' },
      { id: 3, name: 'フロントエンドを実装', status: 'beforeWork', createdAt: '2020-07-16' },
      { id: 4, name: 'バックエンドを実装', status: 'beforeWork', createdAt: '2020-07-17' },
      { id: 5, name: 'タグ付け', status: 'beforeWork', createdAt: '2020-07-20' },
    ]
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TASK':
        console.log('addtask')
        return state
      case 'MOVE_TASK':
        const { id, newStatus } = action.payload
        const task = state.tasks.find(task => task.id === id)
        const changedTask = { ...task, status: newStatus, order: state.tasks.length + 1 }
        return {
          ...state,
          tasks: state.tasks.map(task =>
            task.id !== id ? task : changedTask)
        }
      case 'DELETE_TASK':
        return state
      default:
        return state
    }
  }
  const [globalState, dispatch] = useReducer(reducer, initialState)

  const beforeWorkTasks = () => {
    return globalState.tasks.filter(task => task.status === 'beforeWork')
  }

  const progressTasks = () => {
    return globalState.tasks.filter(task => task.status === 'progress')
  }

  const completedTasks = () => {
    return globalState.tasks.filter(task => task.status === 'completed')
  }

  return (
    <StateContext.Provider value={{ globalState, dispatch }}>
      <div className="App">
        <div className="header-bar">
          <header>
            <div className="logo">KANBAN</div>
          </header>
        </div>

        <div className="sidebar">
          <ul>
            <li>
              <a href="#">プロジェクト管理</a>
            </li>
          </ul>
        </div>

        <main>
          <div className="content-wrapper">
            <h2>プロジェクト管理</h2>
            <div className="box-container">
              <TaskList tasks={beforeWorkTasks()} title="作業前" status="beforeWork" />
              <TaskList tasks={progressTasks()} title="進行中" status="progress" />
              <TaskList tasks={completedTasks()} title="完了" status="completed" />
            </div>
          </div>
        </main>
      </div>
    </StateContext.Provider>
  );
}

export default App;
