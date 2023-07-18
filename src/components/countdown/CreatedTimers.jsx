import React from 'react'
import timerSettings from '../../data/timerSettings'
import { Page, Card, Layout, Button } from "@shopify/polaris";

export default function CreatedTimers({setPage, page}) {

    if (page === 'timerConfig') return <TimerConfig/>

    const primaryButton = (
        <Button primary onClick={() => setPage('timerConfig')}>
          Create another timer
        </Button>
      );
  //displaying timers settings
  return (
    <Page title='Your timers is here!' primaryAction={primaryButton}>
        <Layout>
            <Card sectioned>
                {timerSettings.map((timer, index) => {
                    //don't showing default timer
                    if (index === 0) return;

                    return (
                        <Card 
                            title={timer.name + ' will expire after:'} 
                            sectioned key={timer.id}
                        >
                            <p>{timer.days} Days</p>
                            <p>{timer.hours} Hours</p>
                            <p>{timer.minutes} Minutes</p>
                            <p>{timer.seconds} Seconds</p>
                        </Card>
                    )
                })}
            </Card>
        </Layout>
    </Page>
  )
}
