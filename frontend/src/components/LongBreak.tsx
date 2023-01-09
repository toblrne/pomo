import { Flex, Button, Box } from '@chakra-ui/react';

import { useTimer } from 'use-timer'
import { useState } from 'react'
import { useFormat } from '../hooks/useFormat';


const LongBreak = ({ minutes }: { minutes: number}) => {

    const [showButton, setShowButton] = useState<boolean>(true)

    const { time, start, pause, reset } = useTimer({ initialTime: minutes * 60, timerType: 'DECREMENTAL' })

    return (
        <Flex fontSize="72px" fontWeight="medium" align="center" direction="column">
            <Box mb="15px">
                {useFormat(time)}
            </Box>
            <Box onClick={() => setShowButton(prev => !prev)} display={showButton ? "flex" : "none"}>
                <Button colorScheme='teal' size='lg' mb="10px" onClick={start}> START </Button>
            </Box>
            <Box onClick={() => setShowButton(prev => !prev)} display={showButton ? "none" : "flex"}>
                <Button colorScheme='teal' size='lg' mb="10px" onClick={pause}> PAUSE </Button>
            </Box>
        </Flex>
    );
}

export default LongBreak; 