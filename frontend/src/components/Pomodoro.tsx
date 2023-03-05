import { Flex, Button, Box } from '@chakra-ui/react';

import { useState, useEffect } from 'react'
import { format } from '../hooks/format';

import { RxReload } from 'react-icons/rx'
import useStopwatch from '../hooks/useStopwatch'



const Pomodoro = ({ minutes, activeTab, setActiveTab, sound }: { minutes: number, activeTab: number, setActiveTab: (value: number) => void, sound: any }) => {

    const [showButton, setShowButton] = useState<boolean>(true)

    const { time, start, pause, reset } = useStopwatch(minutes * 60, () => onTimeEnd)

    const onTimeEnd = async () => {
        await sound.play()
        reset()
        setActiveTab(1)
    }

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
    }, [activeTab, pause])

    return (
        <Flex align="center" direction="column">
            {minutes}<br />
            {time / 60}
            <Box mb="15px" fontSize="72px" fontWeight="medium">
                {format(time)}
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