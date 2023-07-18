import React, { useContext } from 'react'
import { AppContext } from "/src/components/drag/Home"

export default function ShoppingCartItem({item}) {
  const { actions } = useContext(AppContext);

  return (
    <div className='shopping-card__item' key={item.id}>
        <div className='shopping-card__item-name'>{item.name}</div>
        <img src={item.image}/>
        <div className='shopping-card__item-price'>Price: {item.price}$</div>
        <button 
          className='btn shopping-card__item-btn-delete' 
          onClick={() => actions.handleShoppingCartItemDelete(item.id)}
        >&times;</button>
    </div>
  )
}
