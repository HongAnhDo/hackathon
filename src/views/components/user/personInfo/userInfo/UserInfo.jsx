import React from 'react'
import Base from '../../../../core/Base'
import { translate } from 'react-i18next';
import { reactLocalStorage } from 'reactjs-localstorage';
import '../../css/UserInfo.css'
import { Redirect } from "react-router-dom";
import ProfileDetail from './ProfileDetail';
import UploadLicense from './UploadLicense';
import UploadCMND from './UploadCMND';
import UploadSHK from './UploadSHK';

class UserInfo extends Base {

    constructor(props) {
        super(props);
        let user = reactLocalStorage.getObject("user.info", null);
        this.state = ({
            user: user
        })
    }

    render() {
        const t = this.props.t
        const { user } = this.state;
        if (!user) return <Redirect push to="/" />
        return (
            <div>
                <div className="right-content">
                    <div className="group">
                        <div className="row form-right">
                            <p className="title-top">{t('user_info.title')}</p>
                            <div className="profile-detail" >
                                <ProfileDetail />
                                <UploadLicense />
                                <UploadCMND />
                                <UploadSHK />
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default translate('common')(UserInfo);