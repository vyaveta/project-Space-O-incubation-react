import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
  <>
   <BrowserRouter>
   <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Signup />} />
   </Routes>
   </BrowserRouter>
   <ToastContainer />
  </>
  );
}

export default App;
