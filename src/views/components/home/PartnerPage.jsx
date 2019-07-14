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