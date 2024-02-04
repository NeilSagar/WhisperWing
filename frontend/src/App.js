import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Home from './pages/Home';
import {AuthProvider} from "./context/AuthContext.js";
import {UserProvider} from "./context/UserContext.js";
import PrivateComponent from './components/PrivateComponent.jsx';
import FetchingPage from './pages/FetchingPage.jsx';
function App() {
  return (
    <AuthProvider>
    <UserProvider>
    <div className='flex items-center justify-center h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/Login' element={<LogIn/>} />
          <Route path='/Register' element={<Register/>} />
          <Route element={<PrivateComponent/>}>
            <Route path='/Home' element={<Home/>} />
            <Route path='/loading' element={<FetchingPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
    </UserProvider>
    </AuthProvider>
  );
}

export default App;
