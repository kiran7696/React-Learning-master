import './App.css';
import {useState} from 'react'
function App() {
  let [counter, setCounter] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <h1>I am learning react once again!!!</h1>
        <div>{counter}</div>
        <button onClick={()=>setCounter(counter = counter+1)}>Add Counter</button>
        <button onClick={()=>setCounter(counter = counter-1)}>Minus Counter</button>
        <button onClick={()=>setCounter(0)}>Reset Counter</button>
      </header>
    </div>
  );
}

export default App;
