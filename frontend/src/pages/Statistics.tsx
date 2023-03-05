import * as React from 'react';
import { useAuth0, User } from "@auth0/auth0-react"
import { Box, Flex, Button, Input, FormControl, FormHelperText, FormLabel } from '@chakra-ui/react';

import { useState } from "react"
import axios from 'axios';

const Statistics = () => {

    const { user, isAuthenticated, isLoading } = useAuth0<User>()

    // const [state, setState] = useState({ username: "", password: "" })

    // const [data, setData] = useState()

    // const handleNameChange = (e: any) => {
    //     setState({ ...state, username: e.target.value })
    // }

    // const handlePasswordChange = (e: any) => {
    //     setState({ ...state, password: e.target.value })
    // }

    // const handleSubmit = (e: any) => {
    //     e.preventDefault()
    //     axios
    //         .post('http://localhost:4000/register', {
    //             username: state.username,
    //             password: state.password
    //         })
    //         .then(response => {
    //             console.log(response.data)
    //         })    
    //     console.log("Submitted!")

    //     axios
    //         .get('http://localhost:4000/test')
    //         .then(res => {
    //             console.log(res.data)
    //             setData(res.data)
    //         })

    //     console.log(data)
    // }

    if (isLoading) {
        return <Box> Loading... </Box>
    }


    return (
        <Box>
            {/* {`${JSON.stringify(user)}`}
            <Box></Box><Box></Box>
            {`${JSON.stringify(isAuthenticated)}`} */}
            {
                user && isAuthenticated ?
                    <Box>
                        {user.sub}
                    </Box> :
                    <Flex justify="center" paddingTop="100px">
                        Log in to view statistics!
                    </Flex>
            }

            {/* <Button>
                Click to add some data to database
            </Button>
            <form onSubmit={handleSubmit}>
                <FormControl >
                    <FormLabel>Username</FormLabel>
                    <Input type='text' value={state.username} onChange={handleNameChange} />
                    <FormLabel>Password</FormLabel>
                    <Input type='password' value={state.password} onChange={handlePasswordChange} />
                    <Button type="submit">
                        Submit
                    </Button>
                </FormControl>
            </form>
            <Box>
                {data && JSON.stringify((data[0] as any).username)}
            </Box> */}
        </Box>

    )
}

export default Statistics;