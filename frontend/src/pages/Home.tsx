import * as React from 'react';

import { Flex, Box, Tab, TabList, TabPanel, TabPanels, Tabs, Button } from "@chakra-ui/react"
import Pomodoro from '../components/Pomodoro';
import LongBreak from '../components/LongBreak';
import ShortBreak from '../components/ShortBreak';
import { useState } from 'react';


const Home = ({ pomodoroTimer, shortBreak, longBreak }: { pomodoroTimer: number, shortBreak: number, longBreak: number }) => {

    const [activeTab, setActiveTab] = useState<number>(0)

    return (
        <Flex direction="column" align="center" justify="center" border="1px" m="25px" borderRadius="12px" py="10px">
            <Tabs variant="unstyled" index={activeTab} onChange={(index) => setActiveTab(index)}>
                <TabList>
                    <Tab color="#777777" fontSize="15px" fontWeight="semibold" _selected={{ color: "#000000" }}> Pomodoro </Tab>
                    <Tab color="#777777" fontSize="15px" fontWeight="semibold" _selected={{ color: "#000000" }}> Short Break </Tab>
                    <Tab color="#777777" fontSize="15px" fontWeight="semibold" _selected={{ color: "#000000" }}> Long Break </Tab>
                </TabList>
                <TabPanels display="flex" justifyContent="center">
                    <TabPanel>
                        <Pomodoro minutes={pomodoroTimer} setActiveTab={setActiveTab}/>
                    </TabPanel>
                    <TabPanel>
                        <ShortBreak minutes={shortBreak} setActiveTab={setActiveTab}/>
                    </TabPanel>
                    <TabPanel>
                        <LongBreak minutes={longBreak} setActiveTab={setActiveTab}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>


        </Flex>
    );
}

export default Home;