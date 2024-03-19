import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LaunchLever } from 'launch-lever'
import { flags } from './flags'

function App() {
  const [count, setCount] = useState(0)

  const { pfx_123, pfx_1255 } = new LaunchLever(flags).flags

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {pfx_123 === "on" && <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>}
       {
        pfx_1255 === "on" && <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
       } 
        
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
