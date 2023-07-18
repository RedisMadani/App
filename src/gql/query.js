
export const getProducts = str => `
    query getProducts(
        $first: Int, 
        $last: Int, 
        $after: String, 
        $before: String
        $sortKey: ProductSortKeys
        $reverse: Boolean
    ) {
        products(
            first: $first, 
            last: $last,
            after: $after,
            before: $before,
            sortKey: $sortKey, 
            reverse: $reverse
        ) {
            edges {
                node {
                    ${str}
                }
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
                startCursor
            }
        }
    }
`