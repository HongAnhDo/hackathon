import React from 'react';
import Base from '../core/Base';
import { translate } from 'react-i18next';
import { Link, Redirect } from 'react-router-dom'
import MailChip from './MailChip';

class Footer extends Base {

    constructor(props) {
        super(props);
        this.state = ({
            move: false
        })
        this.handleMoveToGuide = this.handleMoveToGuide.bind(this)
    }

    handleMoveToGuide = (event) => {
        // reactLocalStorage.set("guide.offset", index)
        this.setState({ move: true })

    }

    render() {
        const { t } = this.props;
        const index1 = 1, index2 = 2
        if (this.state.move)
            return <Redirect push to="/support/car_rental" />
        return (
            <footer className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-lg-3 ft">
                            <div className="widget-footer">
                                <div className="widget-contact intro-company">
                                    <h4> {t('footer.contact.title')}</h4>
                                    <ul className="contact-list">
                                        <li style={{ padding: "0px" }} className="intro-company">
                                            <div style={{ fontWeight: "550" }}>{t('footer.contact.name')}</div>
                                            <div>{t('footer.contact.address1')}</div>
                                            <div>{t('footer.contact.address2')}</div>
                                            <div>{t('footer.contact.address3')} </div>
                                            <div>{t('footer.contact.address4')}</div>
                                        </li>
                                        <li className="contact-email">
                                            <a href={"mailto:" + t('footer.contact.contact_email')}>{t('footer.contact.contact_email')}</a>
                                        </li>
                                        <li className="contact-phone">
                                            <p><a href={"tel:"+t('footer.contact.contact_phone2')} title={t('footer.contact.contact_phone2')}>{t('footer.contact.contact_phone1')}</a> <a target="_blank" href={"http://zalo.me/"+t('footer.contact.contact_phone2')} title={t('footer.contact.contact_phone2')}><span style={{ color: "orange" }}>{t('footer.contact.contact_phone3')}</span></a></p>
                                        </li>
                                        <li className="contact-hotline">
                                            <p>
                                                <a 
                                                    href={"tel:"+t('footer.contact.contact_hotline1')} 
                                                    title={t('footer.contact.contact_hotline1')}>
                                                    {t('footer.contact.contact_hotline2')} 
                                                    <span style={{ color: "orange" }}>
                                                        {t('footer.contact.contact_hotline3')}
                                                    </span>
                                                </a> 
                                            </p>
                                        </li>
                                    </ul>
                                    <div className="social">
                                        <div>
                                            <a target="_blank" href="https://www.facebook.com/hackathon.vn" title="Facebook">
                                                <img src="assets/images/icon/facebook.png" alt="facebook" className="footer_img" />
                                            </a>
                                        </div>
                                        <div>
                                            <a target="_blank" href="https://www.youtube.com/channel/UCG-vqFwBl4kve3IlGsNwCQA" title="Youtube">
                                                <img src="assets/images/icon/youtube.png" alt="youtube" className="footer_img" />
                                            </a>
                                        </div>
                                        <div>
                                            <a target="_blank" href="https://www.instagram.com/hackathon.vn/" title="Instagram">
                                                <img src="assets/images/icon/instagram.png" alt="instagram" className="footer_img" />
                                            </a>
                                        </div>
                                        <div>
                                            <a target="_blank" href="https://twitter.com/hackathonV" title="Instagram">
                                                <img src="assets/images/icon/twitter.png" alt="instagram" className="footer_img" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3 ft">
                            <div className="widget-footer intro-2">
                                <div className="widget-quicklink">
                                    <div className="title-wd-ft">
                                        <h4>{t('footer.introduction.title', { framework: "react-i18next" })}</h4>
                                    </div>
                                    <div>
                                        <ul className="menu-ft">
                                            <li>
                                                <Link to="/introduction/about">{t('footer.introduction.about')}</Link>
                                            </li>
                                            {/* <li>
                                                <Link to="/introduction/partner">{t('footer.introduction.partner')}</Link>
                                            </li> */}
                                            {/* <li>
                                                <Link to="/introduction/recruitment">{t('footer.introduction.recruitment')}</Link>
                                            </li> */}
                                            {/* <li>
                                                <Link to="/introduction/news">{t('footer.introduction.news')}</Link>
                                            </li> */}
                                            <li className="certification">
                                                <h4> {t('footer.introduction.certification')} </h4>
                                                <img src="assets/images/icon/bocongthuong.png" alt="bct" style={{ width: '140px' }} />
                                            </li>

                                        </ul>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3 ft">
                            <div className="widget-footer">
                                <div className="widget-quicklink">
                                    <div className="title-wd-ft">
                                        <h4>{t('footer.policy.title')}</h4>
                                    </div>
                                    <div>
                                        <ul className="menu-ft">
                                            <li>
                                                <Link to="/policy/insurance">{t('footer.policy.insurance')}</Link>
                                            </li>
                                            {/* <li>
                                                <Link to="/policy/partner">{t('footer.policy.partner')}</Link>
                                            </li> */}
                                            <li>
                                                <Link to="/policy/service">{t('footer.policy.service')}</Link>
                                            </li>
                                            <li>
                                                <Link to="/policy/incident">{t('footer.policy.incident')}</Link>
                                            </li>
                                            <li>
                                                <p style={{ color: '#ffffff', fontWeight: 500, fontStyle: 'italic' }}> {t('footer.policy.register_promotion')} </p>
                                                <MailChip />
                                            </li>

                                        </ul>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3 ft">
                            <div className="widget-footer">
                                <div className="widget-quicklink">
                                    <div className="title-wd-ft">
                                        <h4>{t('footer.support.title')}</h4>
                                    </div>
                                    <div>
                                        <ul className="menu-ft">
                                            <li >
                                                <Link to="/support/car_rental/1">{t('footer.support.car_rental')}</Link>
                                            </li>
                                            <li>
                                                <a target="_blank" href="https://hackathon.vn/blog/mau-hop-dong-cho-thue-xe-tu-lai/" >{t('footer.support.contract')}</a>
                                            </li>
                                            <li>
                                                <a target="_blank" href="https://hackathon.vn/blog/category/blog-hackathon-kinhnghiemdilai/">{t('footer.support.handbook')}</a>
                                            </li>
                                            <li>
                                                <Link to="/support/car_rental/2">{t('footer.support.questions')}</Link>
                                            </li>
                                            <li>
                                                <a target="_blank" href="https://hackathon.vn/blog">{t('footer.support.blog')}</a>
                                            </li>
                                        </ul>

                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* <div className="col-sm-12 text-center copyright">
                            <MailChip />
                        </div> */}
                        <div className="col-sm-12 text-center copyright">
                            <p>{t('footer.copyright.content')}</p>
                            {/* <a>{t('footer.copyright.regulations')} </a> | <a> {t('footer.copyright.rules')}</a> */}
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default translate('common')(Footer);