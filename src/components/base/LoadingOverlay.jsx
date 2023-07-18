import React from "react";
import { Card, EmptyState, Page, Spinner } from '@shopify/polaris'

export default function LoadingOverlay({ title = '' }) {
    return (
        <Page fullWidth>
            <Card sectioned>
                <EmptyState
                    heading={title}
                >
                    <Spinner size="large" />
                </EmptyState>
            </Card>
        </Page>
    )
}
