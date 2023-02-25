import { Flex, Button, Box } from '@chakra-ui/react';

import { useTimer } from 'use-timer'
import { useState, useEffect } from 'react'
import { useFormat } from '../hooks/useFormat';

import { RxReload } from 'react-icons/rx'
import audio from './alarm.mp3'


const Pomodoro = ({ minutes, activeTab, setActiveTab }: { minutes: number, activeTab: number, setActiveTab: (value: number) => void}) => {

    const [showButton, setShowButton] = useState<boolean>(true)

    const sound = new Audio(audio)

    const onTimeEnd = () => {
        sound.play()
        setActiveTab(1)
    }

    const { time, start, pause, reset } = useTimer({ initialTime: minutes * 60, timerType: 'DECREMENTAL', endTime: 0, onTimeOver: () => onTimeEnd() })

    const handleReset = () => {
        if (time !== minutes * 60) {
            reset()
            setShowButton(prev => !prev)
        }
    }

    useEffect(() => {
        if (activeTab !== 0) {
            pause()
            setShowButton(true)
        }
    }, [activeTab])

    return (
        <Flex align="center" direction="column">
            <Box mb="15px" fontSize="72px" fontWeight="medium">
                {useFormat(time)}
            </Box>
            <Flex align="center" gap="12px">

                <Box minW="68px">
                </Box>

                <Box onClick={() => setShowButton(prev => !prev)} display={showButton ? "flex" : "none"}>
                    <Button colorScheme='teal' size='lg' mb="10px" onClick={start}> START </Button>
                </Box>
                <Box onClick={() => setShowButton(prev => !prev)} display={showButton ? "none" : "flex"}>
                    <Button colorScheme='teal' size='lg' mb="10px" onClick={pause}> PAUSE </Button>
                </Box>

                <Box pl="12px" pb="12px" _hover={{ color: "black" }} color="#777777">
                    <Button onClick={handleReset}> <RxReload size={24} /> </Button>
                </Box>

            </Flex>


        </Flex>
    );
}

export default Pomodoro; 