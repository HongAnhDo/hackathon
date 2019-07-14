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
                        <div className="col-sm-4 col-lg-3 ft">
                            <div className="widget-footer">
                                <div className="widget-contact intro-company">
                                    <h4> {t('footer.contact.title')}</h4>
                                    <ul className="contact-list">
                                        <li style={{ padding: "0px" }} className="intro-company">
                                            <div style={{ fontWeight: "550" }}>Tổ chức vì cộng đồng 3HCD</div>
                                            <div>Số 1 Giải Phóng, Hai Bà Trưng, Hà Nội</div>
                                         
                                        </li>
                                        <li className="contact-email">
                                            <a href={"mailto:" + t('footer.contact.contact_email')}>csetamly@gmail.com</a>
                                        </li>
                                        <li className="contact-phone">
                                            <p><a href={"tel:"} title={"1900232323"}>1900.232.323</a> <a target="_blank" href={"http://zalo.me/"+t('footer.contact.contact_phone2')}
                                             title={t('footer.contact.contact_phone2')}></a></p>
                                        </li>
                                        <li className="contact-hotline">
                                            <p>
                                                <a 
                                                    href={"tel:"+t('footer.contact.contact_hotline1')} 
                                                    title={t('footer.contact.contact_hotline1')}>
                                                    {t('footer.contact.contact_hotline2')} 
                                                    
                                                </a> 
                                            </p>
                                        </li>
                                    </ul>
                                  
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-3 ft">
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