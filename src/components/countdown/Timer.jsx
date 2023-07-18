import React from 'react'
import { Card } from '@shopify/polaris'
import { useCountdown } from '/src/hooks/countdown'
import DateTimeDisplay from './DateTimeDisplay'

const ShowCounter = ({days, hours, minutes, seconds }) => {
    return (
        <div className='counter'>
            <DateTimeDisplay value={days} type={'Days'} />
            <p>:</p>
            <DateTimeDisplay value={hours} type={'Hours'} />
            <p>:</p>
            <DateTimeDisplay value={minutes} type={'Minutes'} />
            <p>:</p>
            <DateTimeDisplay value={seconds} type={'Seconds'} />
        </div>
    )
}

export default function Timer({ name, targetDate }) {
    const [days, hours, minutes, seconds] = useCountdown(targetDate)

    return (
        <Card sectioned title={name} wrap>
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        </Card>
    )
}
