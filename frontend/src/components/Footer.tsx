import { Box, Flex } from '@chakra-ui/react';

import { IoMdHome, IoMdStats, IoMdSettings } from 'react-icons/io'
import FooterIcon from './FooterIcon'

export type ColorObject = {
    color: string
}

type Props = {
    footerTab: number,
    setFooterTab: any
}

const Footer = ({ footerTab, setFooterTab }: Props) => {

    console.log(footerTab)

    const home = () => {
        if (footerTab != 0) {
            setFooterTab(0)
            
        }
    }

    const stats = () => {
        if (footerTab != 1) {
            setFooterTab(1)
        }
    }

    const settings = () => {
        if (footerTab != 2) {
            setFooterTab(2)  
        }
    }

    return (
        <Flex direction="row" align="center" justify="center" gap="100px" py="15px" px="30px" borderTop="1px" borderColor="#d1d1d1">
            <Box onClick={home}>
                <FooterIcon icon={<IoMdHome size="36px" />} path="/" />
            </Box>
            <Box onClick={stats}>
                <FooterIcon icon={<IoMdStats size="36px" />} path="/statistics" />
            </Box>
            <Box onClick={settings}>
                <FooterIcon icon={<IoMdSettings size="36px" />} path="/settings" />
            </Box>
        </Flex>
    );
}

export default Footer;