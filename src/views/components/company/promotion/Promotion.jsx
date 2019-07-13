import React from 'react';
import Base from '../../../core/Base';
import { translate } from 'react-i18next';
import "../css/Promotion.css"
import HeaderSubPage from '../header/HeaderSubPage';
var promotions = [];
var index = 0;


class Promotion extends Base {
    constructor(props) {
        super(props);
        promotions = [
            {
                image: "assets/images/promotions/promotion.jpg",
                des: "",
                code: "hackathon",
                link: "https://hackathon.vn/blog/tung-bung-ra-mat-website-moi-nhan-code-giam-gia-hackathon/"
            },
            {
                image: "assets/images/promotions/phuquoc.png",
                des: "",
                code: "CX10",
                link: "https//hackathon.vn/blog/chao-mung-phu-quoc-voi-ma-khuyen-mai-cx10/"
            }
        ]
        this.state = ({
            promotions: promotions
        })

    }



    componentDidMount() {
        window.scrollTo(0, 0);
    }

    renderFounder = (data) => {

    }

    render() {
        const t = this.props.t;
        const promotions = this.state.promotions;
        return (
            <div>
                <div className="container-page-sub" style={{ backgroundColor: "#f5f5f5" }}>
                    <HeaderSubPage title={t("promotion.title")} />

                    <div className="body-child" style={{ backgroundColor: "#f5f5f5" }}>
                        {promotions && promotions.map((data) =>

                            <div className="item-promotion" key={data.code}>
                                <div style={{ padding: 10 }}>
                                    <img src={data.image} alt="promotion" className="img-promotion" />
                                </div>
                                <a target="_blank" href={data.link} className="btn-item-promotion">{t("promotion.btn_detail")}</a>
                                <button className="copy-code-promotion">{t("promotion.copy")}</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default translate('common')(Promotion);



