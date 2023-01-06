import { Flex, Box } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import { IoMdHome, IoMdStats, IoMdSettings } from 'react-icons/io'
import FooterIcon from './FooterIcon'


export type ColorObject = {
    color: string
}

const Footer = () => {


    return (
        <Flex direction="row" align="center" justify="center" gap="100px" py="15px" px="30px" borderTop="1px" borderColor="#d1d1d1" marginTop="auto">
            <FooterIcon icon={<IoMdHome size="36px"/>} path="/" />
            <FooterIcon icon={<IoMdStats size="36px"/>} path="/statistics" />
            <FooterIcon icon={<IoMdSettings size="36px"/>} path="/settings" />
            
            
            {/* <Box
                onMouseEnter={() => { setIsHover(true) }}
                onMouseLeave={() => { setIsHover(false) }}>
                <NavLink to="/" style={pickStyle}>
                    <IoMdHome size="36px" />
                </NavLink>
            </Box> */}
            {/* <NavLink to="/statistics" style={({ isActive }) =>
                isActive ? selectedColor : unselectedColor}>
                <IoMdStats size="36px" />
            </NavLink>
            <NavLink to="/settings" style={({ isActive }) =>
                isActive ? selectedColor : unselectedColor}>
                <IoMdSettings size="36px" />
            </NavLink> */}
        </Flex>


    );
}

export default Footer;