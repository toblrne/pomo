import { useAuth0, User } from "@auth0/auth0-react"
import { Box, Flex, Select } from '@chakra-ui/react';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

import { Bar } from 'react-chartjs-2'

import { useEffect, useState } from "react"
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Statistics = () => {

    const [chartData, setChartData] = useState<{ labels: any[], datasets: any[] }>({ labels: [], datasets: [] })
    const [chartOptions, setChartOptions] = useState({})
    const [resData, setResData] = useState([])
    const [time, setTime] = useState<string>("week")
    const [width, setWidth] = useState<number>(400)

    const { user, isAuthenticated, isLoading } = useAuth0<User>()

    const getPastWeek = (n: number) => {
        const today = new Date();
        const pastWeek = [];
        for (let i = n; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            pastWeek.push(`${month}-${day}`);
        }
        return pastWeek;
    }

    const weekArray = getPastWeek(6)
    const allTimeArray = getPastWeek(365)

    const getLabelArray = () => {
        return time === "week" ? weekArray : allTimeArray;
    }

    useEffect(() => {
        if (isAuthenticated) {
            axios.post('https://pomo-22kr.onrender.com/displayData',
                {
                    user: user?.sub,
                    type: time
                })
                .then((res) => {
                    const x = res.data
                    console.log(x)
                    const y = x.map((item: { time: number }) => item.time / 3600)
                    setResData(y)
                    console.log("set response data!")

                })
        }
    }, [isAuthenticated, time])

    useEffect(() => {
        if (isAuthenticated) {
            setChartData({
                labels: getLabelArray(),
                datasets: [
                    {
                        data: resData,
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgba(53, 162, 235, 0.4)"
                    }
                ]
            })
            setChartOptions({
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: "Hours Spent Per Day",
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            display: true,
                            stepSize: 2

                        },
                        suggestedMax: 12,
                    },

                }
            })
        }
    }, [resData, isAuthenticated])

    useEffect(() => {
        if (chartData.labels.length > 7) {
            setWidth(400 + ((chartData.labels.length - 7) * 30))
        } else {
            setWidth(400)
        }
    }, [chartData.labels.length])

    console.log(width)


    if (isLoading) {
        return <Flex h="400px" justify="center" align="center"> Loading... </Flex>
    }


    return (
        <Flex align="center" justify="center" direction="column" h="400px">
            <Box>
                {user && isAuthenticated ?
                    null :
                    <Flex justify="center" minH="300px" h="340px" w="400px">
                        Log in to view statistics!
                    </Flex>}
            </Box>
            {user && isAuthenticated ? <Flex direction="column" h="340px" p="15px" justify="center" align="center">
                <Select onChange={(e) => {
                    setTime(e.target.value)
                }}>
                    <option value='week'>Weekly Stats</option>
                    <option value='total'>All Time Stats</option>
                </Select>
                <Flex maxW="400px" overflowX={width > 400 ? "scroll" : "hidden"} h="340px" >
                    <Flex minW={width} width="100%" direction="row-reverse">
                        <Bar options={chartOptions} data={chartData} />
                    </Flex>
                </Flex>

            </Flex> : null}
        </Flex>
    )

}

export default Statistics;