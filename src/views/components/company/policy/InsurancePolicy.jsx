import React from 'react';
import Base from '../../../core/Base';
import { translate } from 'react-i18next';
import "../css/InsurancePolicy.css";
import HeaderSubPage from '../header/HeaderSubPage';

class InsurancePolicy extends Base {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }


    render() {
        const t = this.props.t;
        return (
            <div className="container-page-sub">
                    <HeaderSubPage title={t('policy.purpose.title')} />
                    
                    {/* <div className="policy-purpose">
                        <ul className="des-purpose"> {t('policy.purpose.l0')}
                            <li style={{ paddingLeft: 20 }}>{t('policy.purpose.l1')}</li>
                            <li style={{ paddingLeft: 20 }}>{t('policy.purpose.l2')}</li>
                            <li style={{ paddingLeft: 20 }}>{t('policy.purpose.l3')} </li>
                            <li style={{ paddingLeft: 20 }}>{t('policy.purpose.l4')} </li>
                            <li style={{ paddingLeft: 20 }}>{t('policy.purpose.l5')}</li>
                        </ul>
                        <div className="video-company">
                            <img src="assets/images/about/insurance.jpg" alt="insurance" />
                        </div>
                    </div> */}

                    <div className="row about-company2">
                        <div className="col-lg-7">
                            <ul className="des-purpose"> {t('policy.purpose.l0')}
                                <li>{t('policy.purpose.l1')}</li>
                                <li>{t('policy.purpose.l2')}</li>
                                <li>{t('policy.purpose.l3')} </li>
                                <li>{t('policy.purpose.l4')} </li>
                                <li>{t('policy.purpose.l5')}</li>
                            </ul>
                        </div>
                        
                        <div className="col-lg-4 margin-info">
                            <img src="assets/images/about/insurance.jpg" alt="insurance" />
                        </div>
                    </div>

                    <div className="body-limit">
                        <img src="assets/images/about/phamvi.jpg" alt="" style={{ width: "40%", marginRight: "3%", height: "100%" }} />
                        <div className="child-right">
                            <p className="title-child-policy">{t('policy.limit.title')}</p>
                            <p className="text-why"><img src="https://png.icons8.com/ios/50/000000/checkmark.png" className="ic_tick" />{t('policy.limit.l1')}</p>
                            <p className="text-why"><img src="https://png.icons8.com/ios/50/000000/checkmark.png" className="ic_tick" />{t('policy.limit.l2')}</p>
                            <p className="text-why"><img src="https://png.icons8.com/ios/50/000000/checkmark.png" className="ic_tick" />{t('policy.limit.l3')}</p>
                            <p className="text-why"><img src="https://png.icons8.com/ios/50/000000/checkmark.png" className="ic_tick" />{t('policy.limit.l4')}</p>
                            <p className="text-why"><img src="https://png.icons8.com/ios/50/000000/checkmark.png" className="ic_tick" />{t('policy.limit.l5')}</p>
                        </div>
                    </div>

                    <div className="body-time">
                        <div className="child-right">
                            <p className="title-child-policy">{t('policy.time.title')}</p>
                            <p className="text-why">{t('policy.time.l1')}</p>
                        </div>
                        <img src="assets/images/about/time.jpg" alt="" style={{ width: "50%", marginLeft: "10%", height: "88%" , marginBottom:"20px"}} />
                    </div>

            </div>

        );
    }
}

export default translate('common')(InsurancePolicy);