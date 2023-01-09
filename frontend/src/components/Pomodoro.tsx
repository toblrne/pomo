import { Flex, Button, Box } from '@chakra-ui/react';

import { useTimer } from 'use-timer'
import { useRef, useState } from 'react'

type PomodoroProps = {
    seconds: number
}

type RendererProps = {
    hours: number
    minutes: number
    seconds: number
}

const Pomodoro = ({ seconds }: PomodoroProps) => {

    const [showButton, setShowButton] = useState<boolean>(true)

    const { time, start, pause, reset } = useTimer({ initialTime: 100, timerType: 'DECREMENTAL' })

    const formatTime = (time: number) => {
        let minutes: number | string = Math.floor(time / 60)
        let seconds: number | string = Math.floor(time - minutes * 60)

        if (minutes <= 10) minutes = '0' + minutes
        if (seconds <= 10) seconds = '0' + seconds
        return minutes + ":" + seconds
    }

    return (
        <Flex fontSize="72px" fontWeight="medium" align="center" direction="column">
            <Box mb="15px">
                {formatTime(time)}
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

export default Pomodoro; 