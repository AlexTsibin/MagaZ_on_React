import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Header from './components/header/Header';
import Cart from './components/cart/Cart';
import Footer from './components/footer/Footer';
import Favorites from './components/favorites/Favorites';
import Home from './components/Home';

const DB = 'https://638b71a97220b45d22903e28.mockapi.io/'

// контекст
export const AppContext = React.createContext({})

function App() {
  // state для хранения товаров
  const [products, setProduct] = React.useState([])
  // state состояние корзины
  const [cartOpened, setCartOpened] = React.useState(false)
  // state для хранения товаров в корзине
  const [cartItems, setCartItems] = React.useState([])
  // state для поиска
  const [search, setSearch] = React.useState('')
  // state для хранения избранных товаров
  const [favoritesItems, setFavoritesItems] = React.useState([])
  // state для хранения состояния загрузки
  const [loading, setLoading] = React.useState(true)

  // выполнение только при первичной отрисовке: React.useEffect(() => { ... }, [])
  React.useEffect(() => {

    async function axiosData() {
      const productsData = await axios.get(DB + '/products')
      const cartData = await axios.get(DB + '/cart')
      cartData.data.forEach((item, index, arr) => {
        if (typeof item.price != 'number') {
          arr[index].price = parseInt(item.price.replace(/ /g, ''))
        }
      })
      const favoritesData = await axios.get(DB + '/favorites')

      setLoading(false)

      setCartItems(cartData.data)
      setFavoritesItems(favoritesData.data)
      setProduct(productsData.data)
    }

    function setScroll() {
      if (cartOpened) {
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = '18px';
      } else {
        document.body.style.overflow = 'unset';
        document.body.style.marginRight = '0px';
      }
    }

    axiosData()
    setScroll()

  }, [cartOpened])

  const onRemoveCartItem = (id) => {
    axios.delete(DB + `/cart/${id}`)

    // все данные, которые находятся до выполнения prev.filter 
    // и отфильтровать их item.id !== id
    setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))
  }

  const itemAdded = (myId) => {
    // есть ли в cartItems объект
    return cartItems.some((objCart) => Number(objCart.myId) === Number(myId))
  }

  const itemFavorited = (myId) => {
    return favoritesItems.some((objFavorite) => objFavorite.myId === myId)
  }

  return (
    // если что-то изменится в контексте, то внутри все перерисуется
    <AppContext.Provider value={{
      products,
      cartItems,
      favoritesItems,
      search,
      loading,
      setCartItems,
      setProduct,
      setFavoritesItems,
      itemAdded,
      itemFavorited
    }}>

      <div className="App">
        {cartOpened ?
          <Cart
            onRemoveCartItem={onRemoveCartItem}
            cartItems={cartItems}
            closeCart={() => setCartOpened(false)}
            totalPrice={
              // previousValue – последний результат вызова функции, он же «промежуточный результат».
              // objPrice.price - элемент, который нужно сложить
              cartItems.reduce((previousValue, objPrice) => previousValue + objPrice.price, 0)
            }
          />
          :
          null
        }

        <Header openCart={() => setCartOpened(true)}
          cartItems={cartItems}
          favoritesItems={favoritesItems}
        />
        <Routes>
          <Route
            path='/favorites'
            element={
              <Favorites />
            }
          />
          <Route
            path='/'
            element={
              <Home
                items={products}
                cartItems={cartItems}
                setCartItems={setCartItems}
                setSearch={setSearch}
                search={search}
                favoritesItems={favoritesItems}
                setFavoritesItems={setFavoritesItems}
                loading={loading}
              />
            }
          />
        </Routes>
        <Footer />

      </div>
    </AppContext.Provider>
  )
}

export default App;
