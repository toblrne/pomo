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
  const [footerTab, setFooterTab] = useState<number>(0)

  const [cycle, setCycle] = useState<{ start: string, end: string }>({ start: "", end: "" })

  const { user, isAuthenticated } = useAuth0<User>();

  console.log(cycle)

  useEffect(() => {
    if (isAuthenticated) {
      axios.post('https://pomo-22kr.onrender.com/userData',
        {
          type: "settings",
          user: user?.sub
        }).then((res) => {
          setPomodoroTimer(res.data.settings.pomodoro)
          setShortBreak(res.data.settings.shortBreak)
          setLongBreak(res.data.settings.longBreak)
        })
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      axios.post('https://pomo-22kr.onrender.com/updateSettings',
        {
          user: user?.sub,
          timer: "pomodoro",
          time: pomodoroTimer
        }).then((res) => console.log("pomodoro timer updated"))
    }
  }, [pomodoroTimer]) //eslint-disable-line

  useEffect(() => {
    if (isAuthenticated) {
      axios.post('https://pomo-22kr.onrender.com/updateSettings',
        {
          user: user?.sub,
          timer: "shortBreak",
          time: shortBreak
        }).then((res) => console.log("short break updated"))
    }
  }, [shortBreak]) //eslint-disable-line

  useEffect(() => {
    if (isAuthenticated) {
      axios.post('https://pomo-22kr.onrender.com/updateSettings',
        {
          user: user?.sub,
          timer: "longBreak",
          time: longBreak
        }).then((res) => console.log("long break updated"))
    }
  }, [longBreak]) //eslint-disable-line

  useEffect(() => {
    if (isAuthenticated && cycle && cycle.end) {
      console.log(cycle)
      axios.post('https://pomo-22kr.onrender.com/updateLogs',
        {
          user: user?.sub,
          cycleStart: cycle.start,
          cycleEnd: cycle.end
        }).then((res) => console.log("updated log"))
    }
  }, [cycle])

  return (
    <Box>
      <Flex justify="center" align="center" minH="95vh">
        <Flex border="1px" borderRadius="36px" borderColor="#d1d1d1" direction="column" h="550px" w="450px" >
          <Navbar />
          <Box>
            <Routes>
              <Route path="/" element={<Home footerTab={footerTab} setFooterTab={setFooterTab} pomodoroTimer={pomodoroTimer} shortBreak={shortBreak} longBreak={longBreak} cycle={cycle} setCycle={setCycle} />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/settings" element={<Settings pomodoroTimer={pomodoroTimer} setPomodoroTimer={setPomodoroTimer} shortBreak={shortBreak} setShortBreak={setShortBreak} longBreak={longBreak} setLongBreak={setLongBreak} user={user} isAuthenticated={isAuthenticated} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
          <Footer footerTab={footerTab} setFooterTab={setFooterTab}/>
        </Flex>
      </Flex>
    </Box>
  );
}

export default App;
