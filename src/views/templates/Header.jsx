import React from 'react';
import Base from '../core/Base';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom'
import ButtonMenu from './menu/ButtonMenu';
import MainMenu from './menu/MainMenu';
import Image from 'react-image-webp';

class Header extends Base {

    render() {
        const t = this.props.t
        return (
            <header id="header" className="header-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div id="logo" className="logo">
                                <Link to="/" title={t("header.logo")}>
                                    <img
                                        src="assets/images/logo_cx.png"
                                    />
                                </Link>
                            </div>
                            <div className="navigation">
                                <ButtonMenu />
                                <MainMenu firstTime={this.props.firstTime}/>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }


}

export default translate('common')(Header);