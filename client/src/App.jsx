import reactLogo from './assets/react.svg'
import './App.css'
import {useEffect} from 'react'

function App() {
  useEffect(() => {
    fetch('http://localhost:9000').then(res=>res.json()).then(data=>{debugger})
  }, [])
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </div>
  )
}

export default App
