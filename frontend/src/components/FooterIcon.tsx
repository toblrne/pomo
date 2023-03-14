import { useState } from "react"

import { Box, useColorModeValue } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"

import type { ColorObject } from "./Footer"

type FooterIconProps = {
    icon: React.ReactNode
    path: string
}

const FooterIcon = ({ icon, path } : FooterIconProps) => {

    const hoverColor = {
        color: "#aeaeae"
    }

    const [isHover, setIsHover] = useState<boolean>(false)

    const selectedColor = {
        color: useColorModeValue("#000000", "#808080")
    }

    const unselectedColor = {
        color: "#d1d1d1"
    }

    

    const pickStyle = ({ isActive }: { isActive: boolean }): ColorObject => {
        if (isActive) {
            return selectedColor
        } else if (isHover) {
            return hoverColor
        } else {
            return unselectedColor
        }
    }

    return (
        <Box
            onMouseEnter={() => { setIsHover(true) }}
            onMouseLeave={() => { setIsHover(false) }}>
            <NavLink to={path} style={pickStyle}>
                {icon}
            </NavLink>
        </Box>
    );
}

export default FooterIcon;