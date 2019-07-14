import React from "react";
import { translate } from 'react-i18next';
import { email, password, required, phone, confirmPassword } from '../../../../actions/validate';
import '../css/Tabs.css'
import { FormGroup, Button } from 'reactstrap';
import 'rc-tabs/assets/index.css';
import Base from "../../../core/Base";
import { reactLocalStorage } from "reactjs-localstorage";

class Register extends Base {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                user_acc_pass: {
                    value: "",
                    error: ""
                },
                user_acc_emai: {
                    value: "",
                    error: ""
                },
                user_acc_phon: {
                    value: "",
                    error: ""
                },
                user_acc_confirm: {
                    value: "",
                    error: ""
                }
            },
            message: "",
            isClick: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.handleCloseMomal();
    }

    handleSubmit =  (e) => {
        e.preventDefault();

        var { userInfo } = this.state;
        var data = {
            user_acc_phon: userInfo.user_acc_phon.value,
            user_acc_emai: userInfo.user_acc_emai.value,
            user_acc_pass: userInfo.user_acc_pass.value
        }
        var result;
        if (!result) alert(this.props.t("announce.error_network"))
        if (result && result.code === "error") this.setState({ message: result.message })
        else if (result && result.data) {
            reactLocalStorage.setObject("user.info", result.data)
            this.props.handleCloseMomal(result.data)
        }
    };

    handleBack = () => {
        this.props.handleCloseMomal(null);
    }

    onChangeEmail = (e) => {
        var value = e.target.value
        var {userInfo, isClick} = this.state;
        userInfo.user_acc_emai.value = value;
        userInfo.user_acc_emai.error = required(value) || email(value);
        isClick = this.check({userInfo});
        this.setState({userInfo, isClick, message: ""})
    }

    onChangePhone = (e) => {
        var value = e.target.value
        var {userInfo, isClick} = this.state;
        userInfo.user_acc_phon.value = value;
        userInfo.user_acc_phon.error = required(value) || phone(value);
        isClick = this.check({userInfo});
        this.setState({userInfo, isClick, message: ""})
    }
    onChangePass = (e) => {
        var value = e.target.value
        var {userInfo, isClick} = this.state;
        userInfo.user_acc_pass.value = value;
        userInfo.user_acc_pass.error = required(value) || password(value);
        isClick = this.check({userInfo});
        this.setState({userInfo, isClick, message: ""})
    }
    onChangeConfirm = (e) => {
        var value = e.target.value
        var {userInfo, isClick} = this.state;
        userInfo.user_acc_confirm.value = value;
        userInfo.user_acc_confirm.error = required(value) || confirmPassword(value, userInfo.user_acc_pass.value);
        isClick = this.check({userInfo});
        this.setState({userInfo, isClick, message: ""})
    }

    check = (state) => {
        if (!state || (!state.userInfo) || (!state.userInfo.user_acc_emai) || (!state.userInfo.user_acc_phon) || (!state.userInfo.user_acc_pass) || (!state.userInfo.user_acc_confirm)) return false;
        if ((!state.userInfo.user_acc_emai.value) || (state.userInfo.user_acc_emai.value && state.userInfo.user_acc_emai.error)) return false
        if ((!state.userInfo.user_acc_phon.value) || (state.userInfo.user_acc_phon.value && state.userInfo.user_acc_phon.error)) return false
        if ((!state.userInfo.user_acc_pass.value) || (state.userInfo.user_acc_pass.value && state.userInfo.user_acc_pass.error)) return false
        if ((!state.userInfo.user_acc_confirm.value) || (state.userInfo.user_acc_confirm.value && state.userInfo.user_acc_confirm.error)) return false
        return true
    }

    render() {
        const t = this.props.t;
        const {message, userInfo, isClick} = this.state;
        return (
            <div>
                <form className="form">
                    <FormGroup className="form-login">
                        <p className="title-ip-register form-input">{t("register.email.label")}</p>
                        <input
                            className="input-tabs"
                            placeholder={t('register.email.placeholder')}
                            type="email"
                            value={userInfo.user_acc_emai.value}
                            onChange={this.onChangeEmail}
                        />
                        {userInfo.user_acc_emai.error ? userInfo.user_acc_emai.error : null}
                    </FormGroup>
                    <FormGroup  className="form-login">
                        <p className="title-ip-register form-input">{t("register.phone.label") + " (*)"}</p>
                        <input
                            className="input-tabs"
                            placeholder={t('register.phone.placeholder')}
                            type="number"
                            pattern="[0-9]*"
                            value={userInfo.user_acc_phon.value}
                            onChange={this.onChangePhone}
                        />
                        {userInfo.user_acc_phon.error ? userInfo.user_acc_phon.error : null}
                    </FormGroup>
                    <FormGroup  className="form-login">
                        <p className="title-ip-register">{t("register.password.label") + " (*)"}</p>
                        <input
                            className="input-tabs"
                            placeholder={t("register.password.placeholder")}
                            type="password"
                            value={userInfo.user_acc_pass.value}
                            onChange={this.onChangePass}
                        />
                        {userInfo.user_acc_pass.error ? userInfo.user_acc_pass.error : null}
                    </FormGroup>
                    <FormGroup  className="form-login">
                        <p className="title-ip-register">{t("register.confirm.label") + " (*)"}</p>
                        <input
                            className="input-tabs"
                            placeholder={t("register.confirm.placeholder")}
                            type="password"
                            value={userInfo.user_acc_confirm.value}
                            onChange={this.onChangeConfirm}
                        />
                        {userInfo.user_acc_confirm.error? userInfo.user_acc_confirm.error: null}
                    </FormGroup>
                    <FormGroup  className="form-login">
                        <div className="text_note">
                            (*) {(t("register.note"))}
                        </div>
                    </FormGroup>
                    <FormGroup className="form-error is-visible"> {message} </FormGroup>
                    <div style={styles.button} className="position-relative row form-group register form-login">
                        <button className='btn' style={{ width: 156, height: 48 }} disabled={!isClick} onClick={this.handleSubmit}>{t("register.btn_register")}</button>
                        <div className=" btn-login btn_back" style={{ width: 156, height: 48, marginLeft: '16px' }} onClick={this.handleBack}>{t("login.btn_back")}</div>
                    </div> 
                    {/* <FormGroup style={{ textAlign: "center", marginBottom: 24 }}>
                        <button className="btn_back" style={{ width: 156, height: 48 }}  onClick={this.handleBack.bind(this)}>{t("login.btn_back")}</button>
                    </FormGroup> */}
                </form>
                {/* <OtherLogins /> */}
            </div>
        );
    }
}

const styles= {
    button: {
        textAlign: "center", 
        marginLeft: "0px" , 
        marginRight: "0px" 
    }
}


export default translate('common')(Register);