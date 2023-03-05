import { Flex, Button, Box } from '@chakra-ui/react';

import { useTimer } from 'use-timer'
import { useEffect, useState } from 'react'
import { format } from '../hooks/format';
import useStopwatch from '../hooks/useStopwatch';


const ShortBreak = ({ minutes, activeTab, setActiveTab, sound }: { minutes: number, activeTab: number, setActiveTab: (value: number) => void, sound: any }) => {

    const [showButton, setShowButton] = useState<boolean>(true)

    const onTimeEnd = async () => {
        await sound.play()
        reset()
        setActiveTab(0)
    }

    const { time, start, pause, reset } = useStopwatch( minutes * 60, onTimeEnd)

    useEffect(() => {
        if (activeTab !== 1) {
            pause()
            setShowButton(true)
        }
    }, [activeTab, pause])

   

    return (
        <Flex align="center" direction="column">
            <Box mb="15px" fontSize="72px" fontWeight="medium" >
                {format(time)}
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

export default ShortBreak;

