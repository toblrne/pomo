import { Box, Flex } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';

import { useState } from 'react'



function App() {

  const [pomodoroTimer, setPomodoroTimer] = useState<number>(25)
  const [shortBreak, setShortBreak] = useState<number>(5)
  const [longBreak, setLongBreak] = useState<number>(15)

  return (
    <Flex border="1px" direction="column" minHeight="100vh">
      <Navbar />
      <Box>
        <Routes>
          <Route path="/" element={<Home pomodoroTimer={pomodoroTimer} shortBreak={shortBreak} longBreak={longBreak}/>} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings pomodoroTimer={pomodoroTimer} setPomodoroTimer={setPomodoroTimer} shortBreak={shortBreak} setShortBreak={setShortBreak} longBreak={longBreak} setLongBreak={setLongBreak}/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
      <Footer />
    </Flex>
  );
}

export default App;
