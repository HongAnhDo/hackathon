import React from 'react';
import { translate } from 'react-i18next';
import MyTabs from '../../components/user/tabs/MyTabs';
import DropdownMenu from './DropdownMenu';
import Language from './Language';
import Base from '../../core/Base';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Link } from 'react-router-dom';
import './MainMenu.css';
import MyUtil from '../../../actions/MyUtil';

class MainMenu extends Base {

    constructor(props) {
        super(props);
        var menuActive = [true, false, false, false, false]

        var user = reactLocalStorage.getObject("user.info", null);
        this.state = ({
            isOpenMomal: false,
            userInfo: user,
            menuActive: menuActive,
            isPartner: false
        });
    }
    // componentWillMount(){
    //     wpt_MobileMenu();
    // }

    componentDidMount() {
        var menuActive = [true, false, false, false, false]

        var path = window.location.href;
        var n1 = path.search("promotions");
        if (n1 !== -1) {
            menuActive = [false, false, false, true, false]
        }
        this.setState({ menuActive: menuActive })
        reactLocalStorage.set("guide.offset", 1);
    }

    componentWillReceiveProps = () => {
        var user = reactLocalStorage.getObject("user.info", null);

        var menuActive = [true, false, false, false, false]
        var path = window.location.href;
        var n1 = path.search("promotions");
        console.log("gia n1:",n1)
        if (n1 !== -1) {
            menuActive = [false, false, false, true, false]
        }
        this.setState({
            menuActive: menuActive,
            userInfo: user
        });
    }


    handleOpenLogin = (e) => {
        this.setState({ isOpenMomal: true });
        if (window.$('#menu-responsive').length > 0 && (MyUtil.isSmallScreen())) {
            window.$('#menu-responsive').hide();
            window.$('#main-menu-mobi').css({ "display": "none" })
        }
    };

    handleCloseLogin = (userInfo) => {
        this.setState({
            isOpenMomal: false,
            userInfo: userInfo
        });
        if (userInfo && MyUtil.isSmallScreen()) window.location.reload();
    }

    handleLogout = (check) => {
        if (check) {
            this.setState({
                userInfo: ""
            })
            window.location.reload();
        }
    }

    render() {
        const { t } = this.props;
        //console.log("first:",this.checkFirstTime.bind(this));
        const {isOpenMomal, menuActive, isPartner } = this.state;
        var userInfo = reactLocalStorage.getObject("user.info", null);
        if (MyUtil.isSmallScreen() && userInfo){
            window.$('.user-mobile .hidden-md').css({"display": "block" })
        }
        return (
            <div id="main-menu" className="main-menu">
                <MyTabs
                    isOpenMomal={isOpenMomal}
                    handleCloseMomal={this.handleCloseLogin.bind(this)}
                />
                <ul className="menu-responsive" id="menu-responsive">
                    <Link to="/chinh-sach/tro-thanh-doi-tac" >
                        <div className="btn" >{t("menu.btn")}</div>
                    </Link>

                    <li >
                        <Link to="/introduction/about">
                            <div style={{ color: "#000" }} title="">{t("menu.home")}</div>
                        </Link>
                    </li>

                    <li>
                        <Link to="/support/car_rental" >
                            <div style={{ color: "#000" }} title="">{t("menu.support")}</div>
                        </Link>
                    </li>
                    {/* <li>
                        <a title="">{t("menu.search")}</a>
                    </li> */}
                    <li>
                        <Link to="/chinh-sach/khuyen-mai" style={{ color: "#000" }} className={this.state.menuActive[3] ? "active" : ""} title="">
                            <div> {t("menu.promotion")} </div>
                        </Link>
                    </li>
                    {userInfo ?
                        <li className="hidden-md user">
                            <div>
                                {/* <img src="assets/images/icon/person.png" alt="person" /> */}
                                <button type="button" className="" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    {userInfo.user_acc_name} <i className="fa fa-caret-down" aria-hidden="true"></i>
                                </button>
                                <DropdownMenu handleLogout={this.handleLogout.bind(this)} />
                            </div>
                        </li> : <li>  <div className="login" onClick={this.handleOpenLogin}>{t("login.btn_login")}</div> </li>
                    }
                    <li className="lang hidden-md">
                        <Language />
                    </li>
                </ul>
            </div >
        );
    }
}

export default translate('common')(MainMenu);