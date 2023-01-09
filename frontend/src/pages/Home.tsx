import * as React from 'react';

import { Flex, Box, Tab, TabList, TabPanel, TabPanels, Tabs, Button } from "@chakra-ui/react"
import Pomodoro from '../components/Pomodoro';
import LongBreak from '../components/LongBreak';
import ShortBreak from '../components/ShortBreak';


const Home = ({ pomodoroTimer, shortBreak, longBreak }: { pomodoroTimer: number, shortBreak: number, longBreak: number }) => {

    

    return (
        <Flex direction="column" align="center" justify="center" border="1px" m="25px" borderRadius="12px" py="10px">
            <Tabs variant="unstyled">
                <TabList>
                    <Tab color="#777777" fontSize="15px" fontWeight="semibold" _selected={{ color: "#000000" }}> Pomodoro </Tab>
                    <Tab color="#777777" fontSize="15px" fontWeight="semibold" _selected={{ color: "#000000" }}> Short Break </Tab>
                    <Tab color="#777777" fontSize="15px" fontWeight="semibold" _selected={{ color: "#000000" }}> Long Break </Tab>
                </TabList>
                <TabPanels display="flex" justifyContent="center">
                    <TabPanel>
                        <Pomodoro minutes={pomodoroTimer} />
                    </TabPanel>
                    <TabPanel>
                        <ShortBreak minutes={shortBreak} />
                    </TabPanel>
                    <TabPanel>
                        <LongBreak minutes={longBreak}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>


        </Flex>
    );
}

export default Home;