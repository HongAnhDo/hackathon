import React from 'react';
import { translate } from 'react-i18next';
import DropdownMenu from './DropdownMenu';
import Language from './Language';
import Base from '../../core/Base';
import { reactLocalStorage } from 'reactjs-localstorage';
import MyTabs from '../../components/user/tabs/MyTabs';
import MyUtil from '../../../actions/MyUtil';

class ButtonMenu extends Base {
    constructor(props) {
        super(props);
        var user = reactLocalStorage.get("user.info", "");
        this.state = ({
            userInfo: user ? JSON.parse(user) : null,
            isOpenMomal: false
        });
    }

    handleLogout = (isLogout) => {
        isLogout && this.setState({ userInfo: null })
    }

    handleCloseLogin = (userInfo) => {
        this.setState({
            isOpenMomal: false,
            userInfo
        });
    }

    openMobileMenu = (e) => {
        var mainMenuMobi = window.$('#main-menu-mobi').css("display");
        if ((!mainMenuMobi) || (mainMenuMobi == "none")) {
            window.$('#main-menu-mobi').slideToggle(300);
            window.$('#menu-responsive').show();
            window.$('#menu-responsive a').click( () => {
                
            })
            window.$(this).toggleClass('clicked')
            window.$('.menu-mega i.clicked').removeClass('clicked');
            window.$('.mega-responsive.open').removeClass('open');
            e.stopPropagation();
        } else if (mainMenuMobi == "block" && MyUtil.isSmallScreen()) {
            window.$('#menu-responsive').hide();
            window.$('#main-menu-mobi').slideToggle(300);
            e.stopPropagation();
        }
    }

    render() {
        const { userInfo, isOpenMomal } = this.state;
        return (
            <div className="button-mobile">
                <MyTabs
                    isOpenMomal={isOpenMomal}
                    handleCloseMomal={this.handleCloseLogin.bind(this)}

                />
                <div className="mobile-menu pull-right" onClick={this.openMobileMenu}>
                    <i className="icon-align-justify" ></i>
                </div>
                {userInfo ?
                    <div className="user-mobile pull-right">
                        <button type="button" className="" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            <img src="assets/images/avatar.jpg" alt="" />
                        </button>
                        <DropdownMenu
                            handleLogout={this.handleLogout.bind(this)}
                        />
                    </div>
                    : null}
                <div className="lang mobile pull-right">
                    <Language />
                </div>
            </div>
        );
    }
}

export default translate('common')(ButtonMenu);