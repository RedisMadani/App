import React from 'react';
import { DataTable, Link, TextStyle } from '@shopify/polaris';
import ProductDelete from './ProductDelete';
import { ProductContext } from './Products';

export default function ProductDataTable() {
    const { state } = React.useContext(ProductContext);
    if (!state?.products) return null

    return (
        <DataTable
            columnContentTypes={[
                'text',
                'text',
                'text',
            ]}
            headings={[
                <strong>Title</strong>,
                <strong>Can delete?</strong>,
                <strong>Controls</strong>,
            ]}
            rows={state.products.edges.map(({ node: product }) => ([
                <Link url={product.onlineStorePreviewUrl} external>{product.title}</Link>,
                <TextStyle variation="code">{product.description.length ? 'NO' : 'YES'}</TextStyle>,
                <ProductDelete productId={product.id} />
            ]))}
        />
    );
}
