import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { food_list } from '../../assets/frontend_assets/assets'

const Cart = () => {
  const { cartItems, foodList, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)
  const navigate = useNavigate()

  const [deliveryFee, setDeliveryFee] = useState(0)

  useEffect(() => {
    if (cartItems != {}) {
      setDeliveryFee(2)
    } else {
      setDeliveryFee(0)
    }
  }, [cartItems])

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodList.map((item, index) => {
          if (cartItems[item._id] > 0) {
            const imageFrontEnd = food_list.find((i) => i._id == item._id)?.image

            return (
              <div key={index}>
                <div className='cart-items-title cart-items-item'>
                  <img src={!imageFrontEnd ? url + "/images/" + item.image : imageFrontEnd} alt="" />
                  <p>{item.name}</p>
                  <p>$ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>$ {item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>$ {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>$ {getTotalCartAmount() == 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>$ {getTotalCartAmount() == 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart