import { Box, Flex } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';

import { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuth0, User } from '@auth0/auth0-react';

function App() {

  const [pomodoroTimer, setPomodoroTimer] = useState<number>(25)
  const [shortBreak, setShortBreak] = useState<number>(5)
  const [longBreak, setLongBreak] = useState<number>(10)

  const { user, isAuthenticated } = useAuth0<User>();

  useEffect(() => {
    if (isAuthenticated) {
      axios.post('http://localhost:4000/userData',
        {
          type: "settings",
          user: "test2" // user?.sub
        }).then((res) => {
          setPomodoroTimer(res.data.settings.pomodoro)
          setShortBreak(res.data.settings.shortBreak)
          setLongBreak(res.data.settings.longBreak)
        })
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      axios.post('http://localhost:4000/updateSettings',
        {
          user: "test2",
          timer: "pomodoro",
          time: pomodoroTimer
        }).then((res) => console.log("pomodoro timer updated"))
    }
  }, [pomodoroTimer]) //eslint-disable-line

  useEffect(() => {
    if (isAuthenticated) {
      axios.post('http://localhost:4000/updateSettings',
        {
          user: "test2",
          timer: "shortBreak",
          time: shortBreak
        }).then((res) => console.log("pomodoro timer updated"))
    }
  }, [shortBreak]) //eslint-disable-line

  useEffect(() => {
    if (isAuthenticated) {
      axios.post('http://localhost:4000/updateSettings',
        {
          user: "test2",
          timer: "longBreak",
          time: longBreak
        }).then((res) => console.log("pomodoro timer updated"))
    }
  }, [longBreak]) //eslint-disable-line

  return (
    <Flex justify="center" align="center" minH="95vh">
      <Flex border="1px" borderRadius="36px" borderColor="#d1d1d1" direction="column" h="500px" w="450px" >
        <Navbar />
        <Box>
          <Routes>
            <Route path="/" element={<Home pomodoroTimer={pomodoroTimer} shortBreak={shortBreak} longBreak={longBreak} />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/settings" element={<Settings pomodoroTimer={pomodoroTimer} setPomodoroTimer={setPomodoroTimer} shortBreak={shortBreak} setShortBreak={setShortBreak} longBreak={longBreak} setLongBreak={setLongBreak} user={user} isAuthenticated={isAuthenticated} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
        <Footer />
      </Flex>
    </Flex>
  );
}

export default App;
