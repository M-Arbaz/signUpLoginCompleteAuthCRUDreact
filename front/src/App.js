import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Nav from './component/Nav';
import Home from './component/Home';
import Signup from './component/Signup'
import Login from './component/Login'
import Verify from './component/Verify';
import Signout from './component/Signout';
import Del from './component/Del';
import Update from './component/Update';
import Table from './component/Table';
function App() {
  return (
<>
<Router>
  <Routes> 
  <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/' element={<Nav/>} >
     <Route index element={<Table/>} />
     <Route path='create' element={<Verify/>}/>
     <Route path='update' element={<Update/>}/>
     <Route path='delete' element={<Del/>}/>
     {/* <Route path='signout' element={<Signout/>}/> */}
     <Route path='*' element={<Home/>}/>
    </Route>
  </Routes>
</Router>
</>
  );
}

export default App;
