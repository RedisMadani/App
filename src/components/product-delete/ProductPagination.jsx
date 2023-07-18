
import { Pagination } from '@shopify/polaris';
import React from 'react'
import { ProductContext } from './Products';

export default function ProductPagination() {
    const { state, actions } = React.useContext(ProductContext);
    if (!state?.products) return null

    const { hasNextPage, hasPreviousPage } = state.products.pageInfo
    return (
        <Pagination
            hasPrevious={hasPreviousPage}
            onPrevious={() => actions.prevProducts()}
            hasNext={hasNextPage}
            onNext={() => actions.nextProducts()}
        />
    )
}
