import CartItem from "./cartItem/CartItem"
import style from "./cart.module.css"

const addSpace = (number) => {
  let price = String(number)
  let priceWithSpace = ""
  let cnt = 0
  for (let i = (String(price).length - 1); i >= 0; i--) {
    priceWithSpace = priceWithSpace + price[i]
    cnt += 1
    if (cnt == 3) {
      priceWithSpace = priceWithSpace + " "
      cnt = 0
    }
  }
  return priceWithSpace.split("").reverse().join("")
}

const Cart = (props) => {
  return (
    <div className={style['overlay']}>
      <div className={style['cart']}>
        <div className={style["title-block"]}>
          <h2>Корзина</h2>
          <button className={style['close-btn']} onClick={props.closeCart}>X</button>
        </div>

        {
          props.cartItems.length > 0 ?
            <div className={style["cart-list"]}>
              {
                props.cartItems.map(obj => {
                  return (
                    <CartItem
                      key={obj.id}
                      id={obj.id}
                      title={obj.title}
                      description={obj.description}
                      price={obj.price}
                      img={obj.img}
                      onRemoveCartItem={props.onRemoveCartItem}
                    />
                  )
                })
              }
            </div>
            : <h2>Ваша корзина пуста</h2>
        }

        <div className={style["total-price"]}>
          <p className={style['total-price-text']}>Итог: </p>
          <p className={style['total-price-summ']}>{addSpace(props.totalPrice)} руб.</p>
          <button>Заказать</button>
        </div>

      </div>
    </div>
  )
}

export default Cart

