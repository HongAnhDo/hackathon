import React from 'react';
import Base from '../../core/Base';
import { translate } from 'react-i18next';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Link, Redirect } from 'react-router-dom'
import UserApi from '../../../actions/api/user/UserApi';
import {USER_INFO_TABS} from "../../../actions/constants";

class DropdownMenu extends Base {
    constructor(props) {
        super(props)
        this.state = ({ 
            value: reactLocalStorage.get("menu_default")
        })
    }

    handleLogout = async () => {
        var userInfo = reactLocalStorage.getObject("user.info", null)
        var isLogout = userInfo ? await UserApi.logout() : false
        // isLogout && this.props.handleLogout(isLogout);
    }

    render() {
        const t = this.props.t;
        return (
            <div className="dropdown-menu">
                {/* <Link to={"/thong-tin-tai-khoan/" + USER_INFO_TABS[0].name} className="dropdown-item">
                    <i className="fa fa-folder-open"></i>{t('menu.account.history')}
                </Link> */}
                {/* <Link to={"/thong-tin-tai-khoan/" + USER_INFO_TABS[1].name} className="dropdown-item">
                    <i className="fa fa-money"></i> {t('menu.account.payment')}
                </Link> */}
                <Link to={"/thong-tin-tai-khoan/" + USER_INFO_TABS[2].name} className="dropdown-item">
                    <i className="fa fa-user"></i> {t('menu.account.info')}
                </Link>
                <Link to={"/thong-tin-tai-khoan/" + USER_INFO_TABS[3].name} className="dropdown-item">
                    <i className="fa fa-gear"></i> {t('menu.account.password')}
                </Link>
                <div className="dropdown-item" onClick={this.handleLogout.bind(this)}>
                    <i className="fa fa-sign-out"></i> {t('menu.account.exit')}
                </div>
            </div>
        );
    }
}

export default translate('common')(DropdownMenu);