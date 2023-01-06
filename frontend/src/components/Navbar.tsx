import { Box, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <Flex direction="row" align="center" justify="center" gap="275px" p="15px" borderBottom="1px" borderColor="#d1d1d1" >
            <Box>Pomo</Box>
            <Box>Login</Box>
        </Flex>
    );
}

export default Navbar;