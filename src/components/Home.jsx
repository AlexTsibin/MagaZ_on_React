import Banner from './banner/Banner';
import Products from './products/Products';
import TextSection from './textSection/TextSection';
import TestSlider from './sliders/TestSlider';
import style from './cotentSection.module.css'

const Home = (props) => {
  return (
    <>
      {/* <Banner /> */}
        <div className={style['content-section']}>
      <TestSlider />
      <TextSection />
        </div>
      <Products 
        items={props.items}
        cartItems={props.cartItems}
        setCartItems={props.setCartItems}
        setSearch={props.setSearch}
        search={props.search}
        favoritesItems={props.favoritesItems}
        setFavoritesItems={props.setFavoritesItems}
        loading={props.loading}
      />
    </>
  )
}

export default Home