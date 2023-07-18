import { deepclone } from './object.utils'
import { getExtension } from './string.utils'

export const filterProducts = (products, imgExt = 'png') => {
    let productsResult = deepclone(products)

    productsResult.forEach(({ node: product }) => {
        product.images.edges = product.images.edges.filter(({ node: image }) => {
            return getExtension(image.url) === imgExt
        })
    })

    return productsResult.filter(({ node: product }) => {
        return product.images.edges.length > 0
    })
}