import React from 'react';
import Base from '../../../core/Base';
import { translate } from 'react-i18next';
import "../css/ServicePolicy.css";
import HeaderSubPage from '../header/HeaderSubPage';

class ServicePolicy extends Base {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }


    render() {
        const t = this.props.t;
        return (
            <div className="col-md-12">
                <div className="row">
                    <HeaderSubPage title={t('policy.service.title')} />
                </div>

                <ul className="col-md-10  body-service">
                    <li className="title-child-service">{t('policy.service.title1')}</li>
                    <li className="text-why">{t('policy.service.l1')}</li>
                    <li className="text-why-bold ">{t('policy.service.l2')}</li>
                </ul>

                <ul className="col-md-10  body-service">
                    <li className="title-child-service">{t('policy.service.title2')}</li>
                    <li className="text-why">{t('policy.service.l3')}</li>
                    <li className="text-why-bold ">{t('policy.service.l4')}</li>
                </ul>

                <ul className="col-md-10  body-service">
                    <li className="title-child-service">{t('policy.service.title3')}</li>
                    <li className="text-why">{t('policy.service.l5')}
                        <ol>
                            <li>{t('policy.service.l51')}</li>
                            <li>{t('policy.service.l52')}</li>
                        </ol>
                    </li>
                </ul>

                <ul className="col-md-10  body-service">
                    <li className="title-child-service">{t('policy.service.title4')}</li>
                    <li className="text-why">{t('policy.service.l6')}
                        <ol>
                            <li>{t('policy.service.sv161')}</li>
                            <li>{t('policy.service.sv162')}</li>
                            <li>{t('policy.service.sv163')}</li>
                            <li>{t('policy.service.sv164')}</li>
                        </ol>
                    </li>
                </ul>

                <ul className="col-md-10  body-service">
                    <li className="title-child-service">{t('policy.service.title5')}</li>
                    <li className="text-why">{t('policy.service.l7')}</li>
                </ul>

                <ul className="col-md-10  body-service">
                    <li className="title-child-service">{t('policy.service.title6')}</li>
                    <li className="text-why">{t('policy.service.l8')}
                        <ol>
                            <li>{t('policy.service.sv181')}</li>
                            <li>{t('policy.service.sv182')}</li>
                            <li>{t('policy.service.sv183')}</li>
                            <li>{t('policy.service.sv184')}</li>
                            <li>{t('policy.service.sv185')}</li>
                            <li>{t('policy.service.sv186')}</li>
                        </ol>
                    </li>
                </ul>

                <ul className="col-md-10  body-service">
                    <li className="title-child-service">{t('policy.service.title7')}</li>
                    <li className="text-why">{t('policy.service.l9')}
                        <ol>
                            <li>{t('policy.service.sv91')}</li>
                            <li>{t('policy.service.sv92')}</li>
                            <li>{t('policy.service.sv93')}</li>
                            <li>{t('policy.service.sv94')}
                                <ol>
                                    <li>{t('policy.service.sv941')}</li>
                                    <li>{t('policy.service.sv942')}</li>
                                    <li>{t('policy.service.sv943')}</li>
                                    <li>{t('policy.service.sv944')}</li>
                                </ol>
                            </li>
                            <li>{t('policy.service.sv95')}</li>
                        </ol>
                    </li>
                </ul>

                <div className="col-md-10  body-service">
                    <p className="title-child-service">{t('policy.service.title8')}</p>
                    <p className="text-why">{t('policy.service.l10')}</p>
                </div>

                <div className="col-md-10  body-service">
                    <p className="title-child-service">{t('policy.service.title9')}</p>
                    <p className="text-why">{t('policy.service.l11')}</p>
                </div>
            </div>
        );
    }
}

export default translate('common')(ServicePolicy);