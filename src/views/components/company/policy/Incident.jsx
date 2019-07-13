import React from 'react';
import Base from '../../../core/Base';
import { translate } from 'react-i18next';
import '../css/Incident.css';
import HeaderSubPage from '../header/HeaderSubPage';

class Incident extends Base {
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
                <HeaderSubPage title={t('policy.title')} />
                <div className="row about-company2">
                    <ul>
                        <li className="des-incident">{t('policy.incident.l0')}
                            <ol>
                                <li>{t('policy.incident.l1')}</li>
                                <li>{t('policy.incident.l2')}</li>
                            </ol>
                        </li>
                    </ul>
                </div>
                

                <div className="col-md-10 body-incident">
                    <p className="title-child-incident">{t('policy.incident.title')}</p>
                    <div className="text-why">{t('policy.incident.l3')}</div>

                    <div className="step">
                        <p>{t('policy.incident.l4')}</p>
                        <p className="text-why">{t('policy.incident.l41')}</p>
                    </div>
                    <div className="step">
                        <p>{t('policy.incident.l5')}</p>
                        <p className="text-why">{t('policy.incident.l50')}</p>
                        <p className=" text-why-item">{t('policy.incident.l51')}</p>
                        <p className=" text-why-item">{t('policy.incident.l52')}</p>
                    </div>
                    <div className="step">
                        <p >{t('policy.incident.l6')}</p>
                        <p className="text-why">{t('policy.incident.l60')}</p>
                        <p className=" text-why-item">{t('policy.incident.l61')}</p>
                        <p className=" text-why-item">{t('policy.incident.l62')}</p>
                        <p className="text-why">{t('policy.incident.abc')}</p>
                    </div>
                    <div className="step">
                        <p>{t('policy.incident.l7')}</p>
                        <p className=" text-why-item">{t('policy.incident.l71')}</p>
                        <p className=" text-why-item">{t('policy.incident.l72')}</p>
                    </div>
                    <div className="text-why">
                        <p >{t('policy.incident.l8')}</p>
                    </div>
                    <div className="text-why">
                        <p >{t('policy.incident.l9')}</p>
                    </div>
                    <div className="text-why">
                        <p >{t('policy.incident.l10')}</p>
                    </div>

                </div>
            </div>
        )
    }
}

export default translate('common')(Incident);