import * as React from 'react';
import { Box, Button, useColorMode } from '@chakra-ui/react'

const Settings = () => {

    const { colorMode, toggleColorMode } = useColorMode()
    
    return (
        <Box>
            <Button onClick={toggleColorMode}>
                Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
            Settings
        </Box>
    );

}

export default Settings;