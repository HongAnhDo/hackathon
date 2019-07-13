import React from 'react';
import Base from '../../../core/Base'
import { translate } from 'react-i18next';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Redirect, Link } from 'react-router-dom';
import '../css/MenuLeft.css'
import UserApi from '../../../../actions/api/user/UserApi';
import { USER_INFO_TABS } from "../../../../actions/constants"

class MenuLeft extends Base {

    constructor(props) {
        super(props);
        this.state = ({
            activeItem: [true, false, false, false],
            value: props.value,
            moveToHome: false,
        })
    }

    componentWillMount() {
        this.handleActive(this.state.value);
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value }, () => this.handleActive(props.value))
    }


    handleHistory = () => {

        this.handleActive(0);
        this.props.handleChangeTab(0);
    }

    handleInfoPayMoney = () => {
        this.handleActive(1);
        this.props.handleChangeTab(1)
    }

    handleInfoPerson = () => {
        this.handleActive(2);
        this.props.handleChangeTab(2)
    }

    handleChangePassword = () => {
        this.handleActive(3);
        this.props.handleChangeTab(3)
    }

    handleLogout = async () => {
        this.handleActive(4);
        this.props.handleChangeTab(4);
        var user = reactLocalStorage.getObject("user.info", null);
        var isLogout = user ? await UserApi.logout(user) : false
        this.setState({ moveToHome: isLogout });
    }


    handleActive = (value) => {
        var array = [false, false, false, false];
        array[value] = true;

        this.setState({ activeItem: array });
        reactLocalStorage.set("menu_default", value)

    }

    render() {
        const { t } = this.props
        const url = "/thong-tin-tai-khoan"
        const { moveToHome, activeItem } = this.state;
        if (moveToHome) return <Redirect push to='/' />
        return (
            <div className="left-info">
                <div className="shadow">
                    <ul className="l-list">
                        <Link to={url + "/" + USER_INFO_TABS[0].name}>
                            <li className={activeItem[0] ? "active i-his" : "i-his"}
                                onClick={this.handleHistory}>
                                {t('menu.account.history')}
                            </li>
                        </Link>
                        {/* <Link to={url + "/" + USER_INFO_TABS[1].name}>
                            <li className={activeItem[1] ? "active i-pay" : "i-pay"}
                                onClick={this.handleInfoPayMoney}>
                                {t('menu.account.payment')}
                            </li>
                        </Link> */}
                        <Link to={url + "/" + USER_INFO_TABS[2].name}>
                            <li className={activeItem[2] ? "active i-user" : "i-user"}
                                onClick={this.handleInfoPerson}>
                                {t('menu.account.info')}
                            </li>
                        </Link>
                        <Link to={url + "/" + USER_INFO_TABS[3].name}>
                            <li className={activeItem[3] ? "active i-pass" : "i-pass"}
                                onClick={this.handleChangePassword}>
                                {t('menu.account.password')}
                            </li>
                        </Link>
                        <li className={activeItem[4] ? "active i-out" : "i-out"}
                            onClick={this.handleLogout}>
                            {t('menu.account.exit')}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

}

export default translate('common')(MenuLeft);