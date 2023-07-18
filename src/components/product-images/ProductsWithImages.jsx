
import { gql, useQuery } from "@apollo/client"
import { Card, Heading, Link, Page, Stack, TextContainer, Thumbnail } from "@shopify/polaris"
import { useRef, useMemo, useState, useEffect } from "react"
import ErrorDisplay from "../base/ErrorDisplay"
import LoadingOverlay from "../base/LoadingOverlay"
import { ProductFragment, ImageFragment } from "/src/gql/fragments"
import { getProducts } from "/src/gql/query"
import { filterProducts } from "/src/utils/product.utils"

const NUMBER_OF_PRODUCTS = 230
const NUMBER_OF_IMAGES = 1

const GET_PRODUCTS = gql`
  ${ProductFragment}
  ${ImageFragment}

  ${getProducts(`
    ...ProductFragment
      images(first: ${NUMBER_OF_IMAGES}) {
        edges {
          node {
            ...ImageFragment
            thumbnail: transformedSrc(maxWidth: 50, crop: CENTER)
          }
        }
      }
  `)}
`

// let times = 0

export default function ProductsWithImages() {
  const [variables, setVariables] = useState({ first: NUMBER_OF_PRODUCTS })
  const { data, error } = useQuery(GET_PRODUCTS, { variables })
  const productsRef = useRef([])

  if (error) return <ErrorDisplay error={error} />
  if (!data) return <LoadingOverlay title="Loading products with PNG images..." />

  // if (times++ < 2 && data?.products.pageInfo.hasNextPage) {
  //   setVariables({ ...variables, after: data.products.pageInfo.endCursor })
  //   return null
  // }

  productsRef.current = [...productsRef.current, ...data.products.edges]
  const products = filterProducts(productsRef.current)

  console.log(products)

  return (
    <Page>
      <TextContainer
        spacing="loose"
      >
        <Heading>Products with images</Heading>
        <>
          {products.map(({ node: product }, productIndex) => (
            <Card
              key={`product_${productIndex}`}
              title={product.title}
              sectioned
            >
              <Stack>
                {product.images.edges.map(({ node: image }, imageIndex) => (
                  <Link
                    key={`image_${imageIndex}`}
                    url={image.url}
                    external
                  >
                    <Thumbnail
                      source={image.thumbnail}
                      alt={image.altText}
                    />
                  </Link>
                ))}
              </Stack>
            </Card>
          ))}
        </>
      </TextContainer>
    </Page>
  )
}
