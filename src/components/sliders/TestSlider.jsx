import React from "react"
import Slider from "react-slick"
import style from "./testSlider.module.css"
import Banner from "../banner/Banner"

const TestSlider = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <Slider {...settings} className={style["slider"]}>
          <div>
            <Banner.Banner />
          </div>
          <div>
              <Banner.Banner2 />
          </div>

        </Slider>
  )
}

export default TestSlider