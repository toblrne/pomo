import * as React from 'react';
import { Button, Flex, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useColorMode } from '@chakra-ui/react'
import axios from 'axios';

import { useEffect } from 'react'
import { NavLink } from 'react-router-dom';

type Props = {
    pomodoroTimer: number | undefined
    setPomodoroTimer: (value: number) => void
    shortBreak: number | undefined
    setShortBreak: (value: number) => void
    longBreak: number | undefined
    setLongBreak: (value: number) => void
    user: any
    isAuthenticated: any
}

const Settings = ({ pomodoroTimer, setPomodoroTimer, shortBreak, setShortBreak, longBreak, setLongBreak, user, isAuthenticated }: Props) => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Flex direction="column" align="start" m="20px" gap="15px" h="360px">
            <Flex fontSize="18px" fontWeight="semibold"> Time (minutes)</Flex>
            <Flex direction="row" gap="20px" >
                <FormControl>
                    <FormLabel>Pomodoro</FormLabel>
                    <NumberInput defaultValue={pomodoroTimer} min={0} max={120} step={1} variant="filled" value={pomodoroTimer} onChange={(valueAsNumber) => setPomodoroTimer(Number(valueAsNumber))}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>

                <FormControl>
                    <FormLabel>Short Break</FormLabel>
                    <NumberInput defaultValue={shortBreak} min={0} max={90} step={1} variant="filled" value={shortBreak} onChange={(valueAsNumber) => setShortBreak(Number(valueAsNumber))}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>

                <FormControl>
                    <FormLabel>Long Break</FormLabel>
                    <NumberInput defaultValue={longBreak} min={0} max={90} step={1} variant="filled" value={longBreak} onChange={(valueAsNumber) => setLongBreak(Number(valueAsNumber))}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>
            </Flex>


            <Button onClick={toggleColorMode}>
                Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>

        </Flex>
    );

}

export default Settings;