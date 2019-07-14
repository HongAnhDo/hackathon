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
import imagesCategory from '../../../dataTest/imgCategorys.json'

class ProductArea extends Base {

    constructor(props) {
        super(props);
        this.state = ({
            listProducts: imagesCategory,
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
                   
                 
                        <picture>

                            <img
                                placeholder="assets/images/placeholder.png"
                                src={product.name}
                                // src_webp={product.vhc.vhc_imgs[0] ? product.vhc.vhc_imgs[0].vhc_img_web : ""} 
                                width={`100%`}
                                height={`auto`}
                                effect={"opacity"}
                                className="img-feuture"
                                style={{ height: '200px', width: "auto", margin: "0 auto" }}
                                alt={product.vhc_part_name}
                            />
                        </picture>
                        <div className = "title-ctgr" style ={{position:"absolute"}}>{product.title}</div>
                  
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
