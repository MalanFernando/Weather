import { useState } from 'react';
import './App.css';
import InfoWheather from './components/InfoWheather';
import Spinner from './components/Spinner';

function App() {

  const [load, setLoad] = useState(true);
    setTimeout(()=>{
      setLoad(false)
    },3000);

  if (load) {
    return(
      <Spinner/>
    )
  }else{

  return (
    <div className="App">
      <InfoWheather/>
    </div>
  );
}
}
export default App;
