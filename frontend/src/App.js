import { BrowserRouter, Routes, Route } from 'react-router-dom'


import Principal from './paginas/Principal';
import Login from './paginas/Login';
import Registrar from './paginas/Registro';

function App() {
  return (

    <BrowserRouter> 

      <Routes>
        <Route path='/'  element={<Principal/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/registrar' element={<Registrar/>}/>




      </Routes>


    </BrowserRouter>
  );
}

export default App;
