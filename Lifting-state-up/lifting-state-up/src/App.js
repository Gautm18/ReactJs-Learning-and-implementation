import {useState} from 'react'
import ChildA from './ChildA'
import ChildB from './ChildB';

function App() {

  const [count, setCount] = useState(0)

  return (
    <div style={{display:"flex", flexDirection:"column"}}>
    <div> hello world</div>
     <ChildA handleCount={setCount}/>
     <ChildB count={count}/>
    </div>
  );
}

export default App;
