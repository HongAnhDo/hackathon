import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Base from '../../../core/Base';
import { translate } from 'react-i18next';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LazyImage from '../../../templates/customeView/LazyImage';
import Slider from "react-slick";
import './Slides.css';
import Image from 'react-image-webp';

class SlideImage extends Base {

    constructor(props) {
        super(props);
        this.mounted = true;
    }

    componentWillUnmount = () => {
        this.mounted = false
    }

    render() {
        const {t} = this.props
        const settings = {
            dots: true,
            speed: 300,
            // autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            cssEase: 'linear',
            fade: true,
            autoplaySpeed: 6000

        };
        var listParner = [
            {
                id: 1,
                image: "assets/images/banner2.jpg",
                text: t('background_area.text1'),
                webp: "assets/images/banner2.webp",
                mobile: "assets/images/banner2_mobile.jpg",
                mobile_web: "/assets/images/banner2_mobile.webp"
            },
            {
                id: 2,
                image: "assets/images/banner3.jpg",
                text: t('background_area.text2'),
                webp: "assets/images/banner3.webp",
                mobile: "assets/images/banner3_mobile.jpg",
                mobile_web: "assets/images/banner3_mobile.webp"
            },
            {
                id: 3,
                image: "assets/images/banner6.png",
                text0: "hackathon",
                text: t('background_area.text3'),
                webp: "assets/images/banner6.webp",
                mobile: "assets/images/banner6_mobile.jpg",
                mobile_web: "assets/images/banner6_mobile.webp"
            }
        ];

        if (this.mounted)
            return (
                <Slider {...settings} className="slide-area">
                    {listParner.map((slide) =>
                        <div id="slider" key={slide.image}>
                            <div id="slider-img">
                                <ul className="slides">
                                    <li>
                                        <img
                                            src={slide.image}
                                            className="img-slider"
                                        />
                                    </li>
                                    <div className="col-lg-7 col-md-7">
                                        <div className="hackathon-tagline">
                                            <h3>{slide.text0}</h3>
                                            <h3>{slide.text}</h3>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    )}
                </Slider>)
    }
}
export default translate("common")(SlideImage)