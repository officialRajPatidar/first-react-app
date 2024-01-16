
import { useState } from 'react';
import './App.css';
import About from './components/About';
import Form from './components/Form';
import Navbar from './components/Navbar';


function App() {

  const [mode, setMode] = useState('light');
  const toggleMode =() =>{
    
    if(mode==='light'){
      setMode('dark');
      document.body.style.backgroundColor='black';
    }else{
      setMode('light');
      document.body.style.backgroundColor='white';

    }
  };
  return (
    <>
  
<Navbar tittle="TextUtils.."  mode={mode}  toggleMode={toggleMode} />

<div className='container'>
  <Form heading="Enter the text to analize below" />
  </div>
<About />
    </>
  );
}

export default App;
