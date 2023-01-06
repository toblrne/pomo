import * as React from 'react';

import { Flex, Box } from "@chakra-ui/react"
import Countdown from '../components/Countdown';

const Home = () => {

    return (
        <Flex direction="column" align="center" justify="center" border="1px" m="25px" borderRadius="12px"> 
            <Flex direction="row" justify="center" align="center" gap="2rem" border="1px" my="15px">
                <Box> Pomodoro </Box>
                <Box> Short Break </Box>
                <Box> Long Break </Box>
            </Flex>

            <Countdown />



        </Flex>
    );
}

export default Home;