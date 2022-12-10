import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';




function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        {/* <Route path="/" element={<Login></Login>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
