import { Flex, Button, Box } from '@chakra-ui/react';

import { useState, useEffect } from 'react'
import { format } from '../hooks/format';

import { RxReload } from 'react-icons/rx'
import useStopwatch from '../hooks/useStopwatch'

type Props = {
    minutes: number,
    activeTab: number,
    setActiveTab: (value: number) => void,
    sound: any,
    cycle: { start: string, end: string },
    setCycle: any
}



const Pomodoro = ({ minutes, activeTab, setActiveTab, sound, cycle, setCycle }: Props) => {

    console.log(cycle)

    const [showButton, setShowButton] = useState<boolean>(true)

    const onTimeEnd = async () => {
        console.log("time end")
        await sound.play()
        setActiveTab(1)
        reset()
    };

    const onTimeStart = () => {
        console.log("start")
        const date = new Date().toString()
        setCycle({ start: date, end: "" })
    };

    const onTimePause = () => {
        console.log("Finish")
        const date = new Date().toString()
        setCycle({ ...cycle, end: date })
    };

    const { time, start, pause, reset } = useStopwatch(minutes * 60, onTimeEnd, onTimeStart, onTimePause);

    useEffect(() => {
        if (activeTab !== 0) {
            pause()
            setShowButton(true)
        }
    }, [activeTab]);

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
            {/* {minutes}<br />
            {time / 60} */}
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

export default Pomodoro; 