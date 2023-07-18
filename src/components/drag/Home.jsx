import { Page, Layout } from "@shopify/polaris";
import React, { useState, createContext } from "react";
import ShoppingCart from "./ShoppingCart";
import TestShop from "./TestShop";
import StoreItems from "/src/data/products.js"

export const AppContext = createContext({ state: {}, actions: {} })

export default function Home() {
  const [shoppingCartItems, setShoppingCartItems] = useState([])

  const providerValue = {
    state: {
      shoppingCartItems
    },
    actions: {
      handleAddItemToCart(id) {
        const choosenItem = StoreItems.find(item => item.id  === id)
        setShoppingCartItems([...shoppingCartItems, choosenItem])
      },
      handleShoppingCartItemDelete(id) {
        setShoppingCartItems(shoppingCartItems.filter(item => item.id !== id))
      },
      dragStart (e, id) {
        e.dataTransfer.setData('id', id)
      },
      dragOver (e) {
        e.preventDefault()
      },
      dragDrop (e) {
        e.target.classList.remove('item-dragged-over')
        const id = e.dataTransfer.getData('id')
        const choosenItem = StoreItems.find(item => item.id === id) 
    
        setShoppingCartItems([...shoppingCartItems, choosenItem])
      }
    }
  }

  return (
    <AppContext.Provider value={providerValue}>
      <Page fullWidth>
        <Layout>
          <Layout.Section>
            <TestShop />
          </Layout.Section>
          <Layout.Section secondary>
            <ShoppingCart />
          </Layout.Section>
        </Layout>
      </Page>
    </AppContext.Provider>
  )
}
