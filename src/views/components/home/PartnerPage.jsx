import React from 'react';
import { translate } from 'react-i18next';
import './css/PartnerForm.css';
import Base from '../../core/Base';
import HeaderSubPage from '../company/header/HeaderSubPage';
import PartnerForm from './PartnerForm';

class PartnerPage extends Base {

    constructor(props) {
        super(props);
    }

    handleBack = () => {

    }

    handleSubmit = () => {

    }

    render() {
        const t = this.props.t
        return (
            <div className="partner-form">
                <div>
                    <div className="container-page-sub">
                        <HeaderSubPage title={t("partner_page.title")} />
                    
                        <div className="row about-company2">
                            <div className="des-company" style={{ width: '100%', paddingRight: '3%' }}>
                                <p>{t("partner_page.description.p1")}</p><br /> 
                                <p> {t("partner_page.description.p2")} </p>
                            </div>
                        </div>
                        <div className="body-about">
                            <img src="assets/images/about/pexels-photo-862734.jpg" alt="" className="img-partner1"/>
                            <div className="child-right">
                                <p className="title-child-about">{t("partner_page.benefit.title")} </p>
                                <ul style={{ listStyleType: 'square' }}>
                                    <li className="text-why" style={{ marginLeft: 30 }}>{t("partner_page.benefit.p1")} </li>
                                    <li className="text-why" style={{ marginLeft: 30 }}>{t("partner_page.benefit.p2")}</li>
                                    <li className="text-why" style={{ marginLeft: 30 }}>{t("partner_page.benefit.p3")}</li>
                                    <li className="text-why" style={{ marginLeft: 30 }}>{t("partner_page.benefit.p4")}</li>
                                    <li className="text-why" style={{ marginLeft: 30 }}>{t("partner_page.benefit.p5")}</li>
                                    <li className="text-why" style={{ marginLeft: 30 }}>{t("partner_page.benefit.p6")}</li>
                                    <li className="text-why" style={{ marginLeft: 30 }}>{t("partner_page.benefit.p7")}</li>
                                    <li className="text-why" style={{ marginLeft: 30 }}>{t("partner_page.benefit.p8")}</li>
                                    <li className="text-why" style={{ marginLeft: 30 }}>{t("partner_page.benefit.p9")}</li>
                                </ul>
                            </div>
                        </div>

                        <div className="body-about">
                            <div style={{ width: '100%' }}>
                                <p className="title-child-about" style={{ textAlign: "center", marginBottom: 20 }}> {t("partner_page.offer.title")} </p>
                                <div className="row margin-info">
                                    <div className="col-lg-4">
                                        <div className="card height-dxht">
                                            <img src="assets/images/icon/icon1-slide.png" className="card-img-top icon-partner" />
                                            <div className="card-body">
                                                <p className="card-text margin-info">
                                                    {t("partner_page.offer.p1")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="card height-dxht">
                                            <img src="assets/images/icon/icon2-slide.png" className="card-img-top icon-partner"/>
                                            <div className="card-body">
                                                <p className="card-text margin-info">
                                                    {t("partner_page.offer.p2")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="card height-dxht">
                                            <img src="assets/images/icon/icon3-slide.png" className="card-img-top icon-partner" />
                                            <div className="card-body">
                                                <p className="card-text margin-info">
                                                    {t("partner_page.offer.p3")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div style={{ width: "100%" }}>
                                    <div>
                                        <img src="assets/images/icon/icon1-slide.png" className="item-img" />
                                        <div className="item3">{t("partner_page.offer.p1")}</div>
                                    </div>
                                    <div>
                                        <img src="assets/images/icon/icon2-slide.png" className="item-img" />
                                        <div className="item3">{t("partner_page.offer.p2")}</div>
                                    </div>
                                    <div>
                                        <img src="assets/images/icon/icon3-slide.png" className="item-img" />
                                        <div className="item3">{t("partner_page.offer.p3")}</div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="body-about">
                            <div style={{ width: "100%" }}>
                                <p className="title-child-about" style={{ textAlign: "center", marginBottom: 20 }}> {t("partner_page.procedure.title")}</p>
                                <div style={{ width: "100%" }}>
                                    <div className="grid-container">
                                        <div className="">
                                            <p> 01</p>
                                            <img src="assets/images/icon/rule1.png" className="item4-img" />
                                            <div className="item4">{t("partner_page.procedure.p1")}</div>
                                        </div>
                                        <div className="">
                                            <p> 02</p>
                                            <img src="assets/images/icon/rule2.png" className="item4-img" />
                                            <div className="item4">{t("partner_page.procedure.p2")}</div>
                                        </div>
                                        <div className="">
                                            <p> 03</p>
                                            <img src="assets/images/icon/rule3.png" className="item4-img" />
                                            <div className="item4">{t("partner_page.procedure.p3")} </div>
                                        </div>
                                        <div className="">
                                            <p> 04</p>
                                            <img src="assets/images/icon/rule4.png" className="item4-img" />
                                            <div className="item4">{t("partner_page.procedure.p4")}</div>
                                        </div>
                                        <div className="">
                                            <p> 08</p>
                                            <img src="assets/images/icon/rule8.png" className="item4-img" />
                                            <div className="item4">{t("partner_page.procedure.p8")}</div>
                                        </div>
                                        <div className="">
                                            <p> 07</p>
                                            <img src="assets/images/icon/rule7.png" className="item4-img" />
                                            <div className="item4">{t("partner_page.procedure.p7")}</div>
                                        </div>
                                        <div className="">
                                            <p> 06</p>
                                            <img src="assets/images/icon/rule6.png" className="item4-img" />
                                            <div className="item4">{t("partner_page.procedure.p6")}</div>
                                        </div>
                                        <div className="">
                                            <p> 05</p>
                                            <img src="assets/images/icon/rule5.png" className="item4-img" />
                                            <div className="item4">{t("partner_page.procedure.p5")}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="body-about">
                            <PartnerForm />
                        </div>
                    </div>
                </div>


            </div>);
    }

}
const styles = {
    text: {
        textAlign: "center",
        color: "#00363b"
    },
    button: {
        width: 330,
        height: 48,
        textAlign: "center"
    },
    formGroup: {
        width: '330px'
    }
}
export default translate("common")(PartnerPage);