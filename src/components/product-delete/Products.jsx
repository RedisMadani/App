import React from 'react'
import { PRODUCT_DELETE_MUTATION } from '/src/gql/product/mutations'
import { PRODUCTS_QUERY } from '/src/gql/product/querys'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Card, Layout, Page } from '@shopify/polaris'
import { createContext, useEffect, useState } from 'react'
import LoadingOverlay from '../base/LoadingOverlay'
import ProductDataTable from './ProductDataTable'
import { userLoggedInFetch } from '../../App'
import { useAppBridge } from '@shopify/app-bridge-react'
import ProductPagination from './ProductPagination'

export const ProductContext = createContext({ state: {}, actions: {} })

export default function Products() {
    const app = useAppBridge();
    const fetch = userLoggedInFetch(app);

    const [productCount, setProductCount] = useState(0)
    const [products, setProducts] = useState({ edges: [], pageInfo: {} })
    const [variables, setVariables] = useState({ first: 10 })
    const [isLoading, setIsLoading] = useState(true)

    const [queryProducts] = useLazyQuery(PRODUCTS_QUERY, { variables });
    const [mutationDeleteProduct] = useMutation(PRODUCT_DELETE_MUTATION);

    async function fetchProductCount() {
        const { count } = await fetch("/products-count").then((res) => res.json());
        setProductCount(count);
    }

    async function fetchProducts() {
        await setIsLoading(true)
        const products = (await queryProducts()).data.products;
        await setProducts(products);
        await setIsLoading(false)
    }

    useEffect(() => {
        fetchProductCount()
        fetchProducts()
    }, [])

    const providerValue = {
        state: {
            productCount,
            products,
        },
        actions: {
            deleteProduct: async (id) => {
                await mutationDeleteProduct({ variables: { input: { id } } });
                await fetchProductCount()
                await fetchProducts()
            },
            prevProducts: async () => {
                const before = products?.pageInfo?.startCursor || ""
                await setVariables({ last: 10, before })
                await fetchProducts()
            },
            nextProducts: async () => {
                const after = products?.pageInfo?.endCursor || ""
                await setVariables({ first: 10, after })
                await fetchProducts()
            }
        }
    }

    return (
        <ProductContext.Provider value={providerValue}>
            <Page title={'Products (' + productCount + ')'}>
                {isLoading ? <LoadingOverlay title="Loading products..." /> :
                    <Card sectioned>
                        <Layout>
                            <Layout.Section>
                                <ProductDataTable />
                            </Layout.Section>
                            <Layout.Section>
                                <ProductPagination />
                            </Layout.Section>
                        </Layout>
                    </Card>
                }
            </Page>
        </ProductContext.Provider>
    )
}
