import style from "./card.module.css"
import React from "react"
import ContentLoader from "react-content-loader";

import { AppContext } from "../../../App";

const Card = (props) => {
  // const Card = ({ title, description, price, img }) => { // метод деструктуризации

  const context = React.useContext(AppContext)

  // const [added, setAdded] = React.useState(props.isAdded);
  // const [favorite, setFavorite] = React.useState(props.isFavorite);

  const onClickPlus = () => {
    let id = props.id
    let myId = props.myId
    let title = props.title
    let description = props.description
    let price = props.price
    let img = props.img
    props.onPlus({ id, myId, title, description, price, img });
    // setAdded(!added);
  }

  const onClickFavorite = () => {
    let id = props.id
    let myId = props.myId
    let title = props.title
    let description = props.description
    let price = props.price
    let img = props.img
    props.onFavorite({ id, myId, title, description, price, img });
    // setFavorite(!favorite);
  }

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

  return (
    <div className={style['product-item']}>
      {
        props.isLoading ?
          <ContentLoader
            speed={2}
            width={290}
            height={443}
            viewBox="0 0 303 463"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
          >
            <rect x="4" y="48" rx="3" ry="3" width="303" height="245" />
            <rect x="-1" y="314" rx="3" ry="3" width="187" height="16" />
            <rect x="5" y="15" rx="0" ry="0" width="182" height="22" />
            <rect x="0" y="330" rx="0" ry="0" width="248" height="27" />
            <rect x="0" y="422" rx="0" ry="0" width="147" height="27" />
            <rect x="194" y="400" rx="0" ry="0" width="106" height="50" />
          </ContentLoader>
          :
          <>
            {
              context.itemFavorited(props.id) === true ?
                <button className={style['favorite-btn-added']} onClick={onClickFavorite}>Товар в избранном</button>
                :
                <button className={style['favorite-btn']} onClick={onClickFavorite}>Добавить в избранное</button>
            }
            <img className={style['product-img']} src={props.img} alt={props.title} />

            <p className={style['product-title']}>{props.title}</p>
            <p className={style['product-description']}>{props.description}</p>

            <div className={style['product-price']}>
              <p className={style['price']}>Цена</p>
              <span>{addSpace(props.price)} руб</span>
              <button className={context.itemAdded(props.myId) ? style['add-cart-check'] : style['add-cart-plus']} onClick={onClickPlus}>
                <img src={context.itemAdded(props.myId) ? './img/check.svg' : './img/plus.svg'} alt="plus" />
              </button>
            </div>
          </>
      }
    </div>
  )
}

export default Card