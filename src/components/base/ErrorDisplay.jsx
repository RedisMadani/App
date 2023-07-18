import { Card, InlineError, Page } from '@shopify/polaris'
import React from 'react'

export default function ErrorDisplay({ error }) {
    return (
        <Page>
            <Card sectioned>
                <InlineError message={error.toString()} />
            </Card>
        </Page>
    )
}
