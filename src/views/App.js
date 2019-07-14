import React from 'react';
import './App.css'
import { translate } from 'react-i18next';
import './App.css';
import Base from './core/Base';
import Main from './templates/Main';
import Header from './templates/Header';
import Footer from './templates/Footer';
import { AuthProvider, AuthConsumer } from 'react-check-auth';
import { reactLocalStorage } from 'reactjs-localstorage';
import MyUtil from '../actions/MyUtil';

class App extends Base {
    constructor(props) {
        super(props);
        this.state = ({
            cities: []
        });
        MyUtil.checkDate();
        this.mounted = true;
        var user = reactLocalStorage.getObject("user.info", null);
        // if (reactLocalStorage.get("first_access") === undefined) {
        //     reactLocalStorage.set("first_access", true);
        //     this.state = ({
        //         userInfo: user,
        //         firstTime : true
        //     });
        // }else{
        //     this.state = ({
        //         userInfo: user,
        //         firstTime : false
        //     });
        // }
        this.setState({userInfo: user})
    }

    componentWillMount() {
        if ( typeof(Storage) !== 'undefined' && window.location.search) {
            var arrSearch = window.location.search.slice(1).split("&");
            if (arrSearch && arrSearch.length > 0 ){
                for (let i = 0; i < arrSearch.length; i ++){
                    var item = {
                        name: arrSearch[i].split("=")[0],
                        value: arrSearch[i].split("=")[1]
                    }
                    sessionStorage.setItem(item.name, item.value);
                }
            }
        } 
        this.handleChangeLanguage();
        if (reactLocalStorage.get("menu_default") == undefined) {
            reactLocalStorage.set("menu_default", 0);
        }
    }

    handleChangeLanguage = () => {
        var token = reactLocalStorage.get("user.token");
        var languageUser = reactLocalStorage.get("user.language");
        var languagePage = reactLocalStorage.get("language");
        var lang = token ? languageUser : languagePage;

        lang = (lang === undefined || lang == "vi") ? "vi" : "en";

        this.props.i18n.changeLanguage(lang);
        reactLocalStorage.set("language", lang);
    }

    componentWillUnmount() {
        this.mounted = false
    }

    render() {
        var user = reactLocalStorage.getObject("user.info", null);
        var token = user ? user.user_acc_tokn : "";
        var authUrl = user ? ( "/users/verifyAuth") : "";
        var reqOptions = token && {
            'method': 'GET',
            'headers': {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
        var isLogged = false;
        if (this.mounted)
            return (
                <AuthProvider authUrl={authUrl} reqOptions={reqOptions}>
                    <AuthConsumer>
                        {({ isLoading, userInfo, error }) => {
                            if (isLoading) {
                                return (
                                    <div className="layout-theme" style={{ backgroundColor: "#f5f5f5" }}>
                                        <div id="preloader">
                                            <div className="row loader">
                                                <img src="assets/images/favicon.png" />
                                                <div className="loader-icon"></div>
                                            </div>
                                        </div>
                                    </div>);
                            }
                            if (error || (userInfo && userInfo.code === "error")){
                                isLogged = false;
                                console.log("Error")
                                reactLocalStorage.setObject("user.info", null);

                            } else if (userInfo && userInfo.data) {
                                isLogged = true;
                                reactLocalStorage.setObject("user.info", userInfo.data);
                            }

                            return (
                                <div className="layout-theme" style={{ backgroundColor: "#f5f5f5" }}>
                                    <Header firstTime={this.state.firstTime} {...isLogged} />
                                    <Main />
                                    <Footer />
                                </div>
                            );
                        }}
                    </AuthConsumer>
                </AuthProvider>

            );
    }
}

export default translate('common')(App);