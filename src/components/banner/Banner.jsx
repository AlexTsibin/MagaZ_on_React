import style from './banner.module.css';

const Banner = () => {
    return(
        <div className={style['banner-section']}>
            <div className={style['banner']}>
                <p className={style['text-banner']}>Лучшие цены
                    <br/>
                    <span>на смартфоны и планшеты</span>
                    <br/>
                    <button className={style['banner-btn']}>Купить смартфон</button>
                </p>
            </div>
        </div>
    )
}
export const Banner2 = () => {
    return(
        <div className={style['banner-section']}>
            <div className={style['banner2']}>
                <p className={style['text-banner']}>Лучшие цены
                    <br/>
                    <span>на смартфоны и планшеты</span>
                    <br/>
                    <button className={style['banner-btn']}>Купить планшет</button>
                </p>
            </div>
        </div>
    )
}

export default {Banner, Banner2}