import React from 'react';
import { Button, Spinner } from "@shopify/polaris";
import { DeleteMinor } from '@shopify/polaris-icons';
import { ProductContext } from './Products';

const ProductDelete = ({ productId }) => {
    const { actions } = React.useContext(ProductContext);
    const [isDeleting, setIsDeleting] = React.useState(false);

    return (
        <Button
            size="slim"
            destructive
            disabled={isDeleting}
            icon={isDeleting ? <Spinner size="small" /> : DeleteMinor}
            onClick={() => {
                setIsDeleting(true);
                actions.deleteProduct(productId);
            }}
        >
            {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
    )
}

export default ProductDelete;
