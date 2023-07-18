import React, { useState } from 'react'
import TimerConfig from './TimerConfig';
import CreatedTimers from './CreatedTimers';
import { Page, Card, Layout, Button, EmptyState } from "@shopify/polaris";

export default function Home() {
    
    const [page, setPage] = useState('empty')

    if (page !== 'empty') return <TimerConfig setPage={setPage} page={page}/>
    if (page === 'haveTimers') return <CreatedTimers setPage={setPage} page={page} />

    const primaryActionButton = (
        <Button primary onClick={() => setPage('timerConfig')}>
            Create a new timer
        </Button>
    )

    const emptyStateProps = {
        content: 'Create a new timer',
        onAction: () => setPage('timerConfig')
    }

    return (
        <Page
            title='Add your own countdown clock!'
            primaryAction={primaryActionButton}
        >
            <Layout sectioned>
                <Card sectioned>
                    <EmptyState
                        image="https://i.ibb.co/6bsTzmN/svg-icon-free-fast-icon-1024848.png"
                        action={emptyStateProps}
                        heading="Here you can create your timers, or manage the existing ones"
                    >
                        <p>Start by creating a new timer</p>
                    </EmptyState>
                </Card>
            </Layout>
        </Page>
    )
}
