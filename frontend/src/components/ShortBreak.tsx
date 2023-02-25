import { Flex, Button, Box } from '@chakra-ui/react';

import { useTimer } from 'use-timer'
import { useEffect, useState } from 'react'
import { useFormat } from '../hooks/useFormat';


const ShortBreak = ({ minutes, activeTab, setActiveTab }: { minutes: number, activeTab: number, setActiveTab: (value: number) => void }) => {

    const [showButton, setShowButton] = useState<boolean>(true)

    const { time, start, pause, reset } = useTimer({ initialTime: minutes * 60, timerType: 'DECREMENTAL', endTime: 0, onTimeOver: () => setActiveTab(0) })

    useEffect(() => {
        if (activeTab !== 0) {
            pause()
            setShowButton(true)
        }
    }, [activeTab])

    return (
        <Flex align="center" direction="column">
            <Box mb="15px" fontSize="72px" fontWeight="medium" >
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

export default ShortBreak; 
