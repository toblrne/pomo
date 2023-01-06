import { Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Footer= () => {
    return (
        <Flex>
            <Link to="/">
                Home
            </Link>
            <Link to="/statistics">
                Statistics
            </Link>
            <Link to="/settings">
                Settings
            </Link>
        </Flex>


    );
}

export default Footer;