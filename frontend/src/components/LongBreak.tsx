import { Flex, Button, Box } from '@chakra-ui/react';

import { useState, useEffect } from 'react'
import { format } from '../hooks/format';
import useStopwatch from '../hooks/useStopwatch';
import { RxReload } from 'react-icons/rx';


const LongBreak = ({ footerTab, setFooterTab, minutes, activeTab, setActiveTab, sound }: { footerTab: number, setFooterTab: any, minutes: number, activeTab: number, setActiveTab: (value: number) => void, sound: any }) => {

    const [showButton, setShowButton] = useState<boolean>(true)

    const onTimeEnd = async () => {
        await sound.play()
        reset()
        setActiveTab(0)
    }

    const { time, start, pause, reset } = useStopwatch(minutes * 60, onTimeEnd)

    useEffect(() => {
        if (activeTab !== 2) {
            pause()
            setShowButton(true)
        }
    }, [activeTab, pause])

    useEffect(() => {
        if (footerTab !== 0) {
            pause()
            setShowButton(true)
        }
    }, [footerTab]);

    const handleReset = () => {
        if (time !== minutes * 60) {
            reset()
            if (!showButton) {
                setShowButton(prev => !prev)
            }
        }
    }

    return (
        <Flex align="center" direction="column">
            <Box mb="15px" fontSize="72px" fontWeight="medium">
                {format(time)}
            </Box>
            <Flex align="center" gap="12px">

                <Box minW="68px">
                </Box>

                <Box onClick={() => { setShowButton(prev => !prev) }} display={showButton ? "flex" : "none"}>
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

export default LongBreak; 