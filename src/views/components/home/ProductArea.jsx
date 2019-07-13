import React from 'react';
import Base from '../../core/Base';
import { translate } from 'react-i18next';
import MyUtil from '../../../actions/MyUtil';
import { Redirect } from 'react-router-dom';
import Slider from "react-slick";
import './css/ProductArea.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { i18next } from '../../../actions/i18n';


class ProductArea extends Base {

    constructor(props) {
        super(props);
        this.state = ({
            listProducts: [],
            isNext: false,
            product: null
        })

    }

    async componentDidMount() {
        this.mounted = true

    }

    componentWillUnmount() {
        this.mounted = false
    }

    handleClickDetail = (product) => {
        this.setState({ isNext: true, product })
    }

    renderProduct = (t, product) => {
        var lang = i18next.language;
        if (product) return (
            <li key={product.vhc_part_id} >
                <div className="top-product" onClick={() => this.handleClickDetail(product)}>
                    <div className="info-left">
                        <div className="product-name">
                            {product.vhc_part_name}
                        </div>
                        <span className="stars">
                            {/* {VehicleItems.displayStar(product.vhc_part_star)} */}
                        </span>
                    </div>
                    <div className="info-right">
                        <div className="info">
                            {product.vhc.vhc_seat_num !== undefined && product.vhc.vhc_seat_num != null &&
                                <div className="seat">{product.vhc.vhc_seat_num + " " + t("preview_price.info_car.seat")}</div>}
                            {product.vhc.vhc_fuel_name !== undefined &&
                                <div className="station">{lang === "vi" ? product.vhc.vhc_fuel_name : (lang === "en" ? product.vhc.vhc_fuel_name_en : "")}</div>}
                            {product.vhc.vhc_seat_num !== undefined && product.vhc.vhc_fuel_name !== undefined &&
                                <div className="clr"></div>}
                            {product.vhc.vhc_egin_num !== undefined &&
                                <div className="engine">{product.vhc.vhc_egin_num}</div>}
                            {(product.vhc.vhc_seat_num === undefined || product.vhc.vhc_fuel_name === undefined) &&
                                <div className="clr"></div>}
                            {product.vhc.vhc_tms_name !== undefined &&
                                <div className="ac">{lang === "vi" ? product.vhc.vhc_tms_name : (lang === "en" ? product.vhc.vhc_tms_name_en : "")}</div>}

                        </div>
                    </div>
                    <div>

                        <picture>

                            <img
                                placeholder="assets/images/placeholder.png"
                                src={product.vhc.vhc_imgs[0] ? product.vhc.vhc_imgs[0].vhc_img_link : ""}
                                // src_webp={product.vhc.vhc_imgs[0] ? product.vhc.vhc_imgs[0].vhc_img_web : ""} 
                                width={`100%`}
                                height={`auto`}
                                effect={"opacity"}
                                styles="img-feuture"
                                style={{ height: '200px', width: "auto", margin: "0 auto" }}
                                alt={product.vhc_part_name}
                            />
                        </picture>

                    </div>
                    <div className="bt">
                        <div className="btn btn-block" onClick={() => this.handleClickDetail(product)}><b>{t("featured_products.only")} {MyUtil.currencyFormat(product.vhc_part_defa_prie)} {t("featured_products.unit")}</b></div>
                    </div>
                </div>

            </li>
        );
    }

    render() {
        const t = this.props.t;
        const { isNext, product } = this.state;

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

        if (isNext) {
            var typeName = product.vhc_type_id == 1 ? "oto" : "xemay"
            return <Redirect push to={{
                pathname: "/chi-tiet-xe/" + typeName + "/" + product.vhc_part_id + "/" + MyUtil.formatVehicleName(product.vhc_part_name),
                state: { vehicle: product }
            }

            } />
        }
        return (
            <section className="product-area  bg-default">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="title">{t('products.title')}</h3>

                            <Slider {...settings} className="product-slider" >
                                {this.state.listProducts && this.state.listProducts.map((product) =>
                                    this.renderProduct(t, product)
                                )
                                }
                            </Slider>

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default translate('common')(ProductArea);
