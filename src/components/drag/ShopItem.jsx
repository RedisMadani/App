import React, { useContext } from 'react'
import { AppContext } from "/src/components/drag/Home"
import StoreItems from "/src/data/products.js"

export default function ShopItem() {
  const { actions } = useContext(AppContext);

  return (
    StoreItems.map((item)=> (
      <div className='wrapper__test-shop-item' key={item.id}>
        <div className='test-shop-item'>
          <p>{item.name}</p>
            <img
              src={item.image} 
              className='shop-item__img'
              width={item.imgWidth}  
              height={item.imgHeight}
              draggable
              onDragStart={(e) => actions.dragStart(e, item.id)}
              />
        </div>
        <button 
          className='btn test-shop-add-to-card-button'
          onClick={() => actions.handleAddItemToCart(item.id)}
          >Add to shopping card
        </button>
      </div>
    ))
  )
}
