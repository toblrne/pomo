import { Flex, Button, Box } from '@chakra-ui/react';

import Countdown from 'react-countdown';
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

    const [showStart, setShowStart] = useState<boolean>(true)

    const clockRef = useRef<any>();

    const handleStart = async () => {
        await clockRef.current.start()
    }

    const handlePause = async () => {
        await clockRef.current.pause()
    }

    const renderer = ({ hours, minutes, seconds }: RendererProps) => {
        if (hours >= 1) {
            return (
                <span> {hours}:{minutes}:{seconds}</span>
            )
        }
        if (seconds < 10) {
            return (
                <span> {minutes}:0{seconds} </span>
            )
        } else {
            return (
                <span> {minutes}:{seconds} </span>
            )
        }
    }

    return (
        <Flex fontSize="72px" fontWeight="medium" align="center" direction="column">
            <Box mb="15px">
                <Countdown
                    date={Date.now() + seconds * 1000}
                    intervalDelay={3}
                    zeroPadTime={2}
                    autoStart={false}
                    daysInHours={true}
                    renderer={renderer}
                    ref={clockRef}
                />
            </Box>
            <Button colorScheme='teal' size='lg' mb="10px" onClick={handleStart}> START </Button>
            <Button colorScheme='teal' size='lg' mb="10px" onClick={handlePause}> PAUSE </Button>
        </Flex>
    );
}

export default Pomodoro; 