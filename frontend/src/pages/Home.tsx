import * as React from 'react';

import { Flex, Box, Tab, TabList, TabPanel, TabPanels, Tabs, Button } from "@chakra-ui/react"
import Countdown from '../components/Countdown';

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
                        <Flex fontSize="72px" fontWeight="medium" align="center" direction="column">
                            <Box mb="15px">
                                25:00
                            </Box>
                            <Button colorScheme='teal' size='lg' mb="10px">
                                START
                            </Button>
                        </Flex>

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