import { useState } from "react"

import { Box } from "@chakra-ui/react"
import { NavLink } from "react-router-dom"

import type { ColorObject } from "./Footer"

type FooterIconProps = {
    icon: React.ReactNode
    path: string
}

const FooterIcon = ({ icon, path } : FooterIconProps) => {

    const [isHover, setIsHover] = useState<boolean>(false)

    const selectedColor = {
        color: "#000000"
    }

    const unselectedColor = {
        color: "#d1d1d1"
    }

    const hoverColor = {
        color: "#aeaeae"
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