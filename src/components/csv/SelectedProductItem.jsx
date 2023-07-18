import React from 'react';
import { ResourceItem, Thumbnail, Stack, TextStyle } from '@shopify/polaris';

export default function SelectedProductItem(product) {

    const id = product.variants[0].displayName;
    const image = product.images[0] ? (
        <Thumbnail
            source={product.images[0].originalSrc}
            alt={'thumbnail'} />
    ) : (
        <Thumbnail
            source={'../../src/assets/placeholder.jpg'}
            alt={'thumbnail'} />
    );

    return (
        <ResourceItem id={id} media={image}>
            <Stack>
                <Stack.Item>
                    <TextStyle variation="strong">
                        {product.variants[0].displayName}
                    </TextStyle>
                </Stack.Item>
                <Stack.Item>
                    <TextStyle variation="strong">
                        {product.variants[0].price}
                    </TextStyle>
                </Stack.Item>
            </Stack>
        </ResourceItem>
    )
}
