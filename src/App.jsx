import './App.css';
import Home from './components/Home.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';
import Aboutus from './components/Aboutus.jsx';
import Features from './components/Features.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';

function App() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      <Navbar />

      {/* Main routes */}
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/features" element={<Features />} />

        {/* Non-modal versions */}
        <Route path="/login" element={<Login isModal={false} />} />
        <Route path="/register" element={<Register isModal={false} />} />
      </Routes>

      {/* Modal routes */}
      {background && (
        <Routes>
          <Route path="/login" element={<Login isModal={true} />} />
          <Route path="/register" element={<Register isModal={true} />} />
        </Routes>
      )}
    </>
  );
}

export default App;
