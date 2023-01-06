import { Box } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/statistics" element={<Statistics/>} />
      <Route path="/settings" element={<Settings/>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
