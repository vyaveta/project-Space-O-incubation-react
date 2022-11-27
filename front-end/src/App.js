import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ClientHome from './pages/ClientHome/ClientHome';
import AdminLogin from './pages/AdminLogin/AdminLogin';


function App() {
  return (
  <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<ClientHome/>} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Signup />} />
    <Route path='/admin/login' element ={<AdminLogin />} />
   </Routes>
   </BrowserRouter>
   <ToastContainer />
  </>
  );
}

export default App;
