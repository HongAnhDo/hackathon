import React from 'react';
import Base from '../../core/Base';
import { translate } from 'react-i18next';
import { Link } from "react-router-dom";
import { MediaData } from "../../../actions/api/media/MediaData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { setScriptMedia } from '../../../actions/handleScript';
import './css/ProductArea.css'

class MediaArea extends Base {

    constructor(props) {
        super(props);
        this.data = MediaData();

    }
    componentWillMount() {
        setScriptMedia();

    }
    render() {
        const t = this.props.t;
        const settings = {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: false,
            rows: 1,
            className: "center",
            centerMode: true,
            centerPadding: "0px",
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        className: "center",
                        centerMode: true,
                        centerPadding: "0px",
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        className: "center",
                        centerMode: true,
                        centerPadding: "0px",

                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        className: "center",
                        centerMode: true,
                        centerPadding: "0px"
                    }
                }
            ]
        };

        return (
            <section className="media-area bg-default text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-12">
                                <h3 className="title">{t('media.title')}</h3>
                            </div>
                            <Slider {...settings} className="product-slider slide-media ">
                                {this.data.map((media) => {
                                    return (
                                        <li key={media.media_id} className="item-media">
                                            <a href={media.media_link} target="_blank" title={media.media_name} className="item-media" >
                                                <div>{media.media_content}</div>
                                                <p style={{paddingLeft: "5px", paddingRight: "5px"}}> {media.media_name}</p>
                                            </a>
                                        </li>
                                    );
                                })}

                            </Slider>
                            <div className="row" style={{marginTop: "10px"}}>
                                <div className="col-md-12 text-center">
                                    <Link to="/introduction/about" className="btn">{t('media.btn')}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
        );
    }
}

export default translate('common')(MediaArea);