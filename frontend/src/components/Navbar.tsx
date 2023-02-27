import { Box, Flex, Button } from '@chakra-ui/react';
import { useAuth0, User } from "@auth0/auth0-react";

const Navbar = () => {

    const { loginWithRedirect, logout, isAuthenticated } = useAuth0<User>();

    return (
        <Flex direction="row" align="center" justify="center" gap="225px" p="15px" borderBottom="1px" borderColor="#d1d1d1" >
            <Box fontSize="20px" fontWeight="semibold">Pomo</Box>
            {isAuthenticated ?
            <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}> Log Out </Button> :
            <Button onClick={() => loginWithRedirect()}> Login </Button>
            }
        </Flex>
    );
}

export default Navbar;