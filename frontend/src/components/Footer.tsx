import { Flex } from '@chakra-ui/react';

import { IoMdHome, IoMdStats, IoMdSettings } from 'react-icons/io'
import FooterIcon from './FooterIcon'

export type ColorObject = {
    color: string
}

const Footer = () => {
    return (
        <Flex direction="row" align="center" justify="center" gap="100px" py="15px" px="30px" borderTop="1px" borderColor="#d1d1d1">
            <FooterIcon icon={<IoMdHome size="36px" />} path="/" />
            <FooterIcon icon={<IoMdStats size="36px" />} path="/statistics" />
            <FooterIcon icon={<IoMdSettings size="36px" />} path="/settings" />
        </Flex>
    );
}

export default Footer;