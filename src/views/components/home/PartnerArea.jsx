import React from 'react';
import Base from '../../core/Base';
import listParner from '../../../actions/api/partner/partner.json'
import { translate } from 'react-i18next';
import { setScriptPartner } from '../../../actions/handleScript';
import Slider from "react-slick";
import './css/ProductArea.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'react-image-webp';

class PartnerArea extends Base {

    constructor(props) {
        super(props);
        this.state = ({
            listParner: listParner
        })
    }
    componentDidMount() {
        setScriptPartner();

    }
    render() {
        const t = this.props.t
        const settings = {
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
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
            <section className="partner-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="title">{t("partner_area.title")}</h3>
                            <Slider {...settings} className="product-slider slide-partner">
                                {this.state.listParner.map((partner) => {
                                    return (
                                        <li key={partner.part_id} style={{ padding: "10px" }}>
                                         <Image
                                            src={partner.part_logo}
                                            webp={partner.webp}
                                            className="img-partner"
                                        />
                                        </li>
                                    );
                                })}

                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default translate('common')(PartnerArea);