import * as React from 'react';

import { Flex, Box, Tab, TabList, TabPanel, TabPanels, Tabs, Button } from "@chakra-ui/react"
import Pomodoro from '../components/Pomodoro';

const Home = () => {

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
                        <Pomodoro seconds={500}/>
                    </TabPanel>
                    <TabPanel>
                        <Box fontSize="72px" fontWeight="medium">5:00</Box>
                    </TabPanel>
                    <TabPanel>
                        <Box fontSize="72px" fontWeight="medium">10:00</Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>


        </Flex>
    );
}

export default Home;