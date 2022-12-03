import style from "./cartItem.module.css"

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

const CartItem = (props) => {
  return (
    <div className={style['cart-item']}>
      <img className={style['cart-img']} src={props.img} alt="" />
      <h3 className={style['cart-title']}>
        {props.title}
        <br />
        <span className={style['cart-price']}>{addSpace(props.price)} руб.</span>
      </h3>
      <button
        onClick={() => props.onRemoveCartItem(props.id)}
        className={style['close-btn']}
      >X</button>
    </div>
  )
}

export default CartItem