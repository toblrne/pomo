import * as React from 'react';
import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Input, useColorMode } from '@chakra-ui/react'

type SettingsProps = {
    pomodoroTimer: number | undefined
    setPomodoroTimer: (value: number) => void
    shortBreak: number | undefined
    setShortBreak: (value: number) => void
    longBreak: number | undefined
    setLongBreak: (value: number) => void
}

const Settings = ({ pomodoroTimer, setPomodoroTimer, shortBreak, setShortBreak, longBreak, setLongBreak }: SettingsProps) => {

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Flex direction="column" align="start" m="20px" gap="15px">

            <Flex fontSize="18px" fontWeight="semibold"> Time (minutes)</Flex>
            <Flex direction="row" gap="20px" >
                <FormControl>
                    <FormLabel>Pomodoro</FormLabel>
                    <Input type='number' variant="filled" value={pomodoroTimer || ''} onChange={(e) => setPomodoroTimer(Number(e.target.value)) }/>
                </FormControl>

                <FormControl>
                    <FormLabel>Short Break</FormLabel>
                    <Input type='number' variant="filled" value={shortBreak || ''} onChange={(e) => setShortBreak(Number(e.target.value)) }/>
                </FormControl>

                <FormControl>
                    <FormLabel>Long Break</FormLabel>
                    <Input type='number' variant="filled" value={longBreak || ''} onChange={(e) => setLongBreak(Number(e.target.value)) }/>
                </FormControl>
            </Flex>


            <Button onClick={toggleColorMode}>
                Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
            Settings
        </Flex>
    );

}

export default Settings;