import React, { useContext } from 'react'
import { AppContext } from "/src/components/drag/Home"

import ShoppingCartItem from './ShoppingCartItem'

export default function ShoppingCart() {
    const { state, actions } = useContext(AppContext);

    return (
        <div
            className="wrapper__shopping-card"
            onDragOver={(e) => actions.dragOver(e)}
            onDrop={(e) => actions.dragDrop(e)}
        >
            <p>Shopping card</p>
            <div className='wrapper__shoping-card-items'>
                {state.shoppingCartItems.map((item, index) => (
                    <ShoppingCartItem
                        item={item}
                        key={index}
                    />
                ))}
            </div>
        </div>
    )
}
