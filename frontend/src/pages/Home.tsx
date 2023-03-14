import * as React from 'react';

import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from "@chakra-ui/react"
import Pomodoro from '../components/Pomodoro';
import LongBreak from '../components/LongBreak';
import ShortBreak from '../components/ShortBreak';
import { useState } from 'react';
import audio from '../components/alarm.mp3'


type Props = {
    pomodoroTimer: number,
    shortBreak: number,
    longBreak: number,
    cycle: {start: string, end: string},
    setCycle: any
}

const Home = ({ pomodoroTimer, shortBreak, longBreak, cycle, setCycle }: Props) => {

    const [activeTab, setActiveTab] = useState<number>(0)

    const sound = new Audio(audio)

    const selectedColor = {
        color: useColorModeValue("#000000", "#ffffff")
    }

    return (
        <Flex direction="column" align="center" justify="center" border="1px" borderColor="#d1d1d1" m="25px" marginBottom="70px" borderRadius="12px" py="10px" h="305px">
            <Tabs variant="unstyled" index={activeTab} onChange={(index) => setActiveTab(index)}>
                <TabList>
                    <Tab color="#777777" fontSize="15px" fontWeight="semibold" _selected={ selectedColor }> Pomodoro </Tab>
                    <Tab color="#777777" fontSize="15px" fontWeight="semibold" _selected={ selectedColor }> Short Break </Tab>
                    <Tab color="#777777" fontSize="15px" fontWeight="semibold" _selected={ selectedColor }> Long Break </Tab>
                </TabList>
                <TabPanels display="flex" justifyContent="center">
                    <TabPanel>
                        <Pomodoro minutes={pomodoroTimer} activeTab={activeTab} setActiveTab={setActiveTab} sound={sound} cycle={cycle} setCycle={setCycle} />
                    </TabPanel>
                    <TabPanel>
                        <ShortBreak minutes={shortBreak} activeTab={activeTab} setActiveTab={setActiveTab} sound={sound} />
                    </TabPanel>
                    <TabPanel>
                        <LongBreak minutes={longBreak} activeTab={activeTab} setActiveTab={setActiveTab} sound={sound} />
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Flex>
    );
}

export default Home;