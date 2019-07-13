import React from "react";
import { translate } from 'react-i18next';
import Base from '../../../core/Base';
import { password, required, emailAndPhone } from '../../../../actions/validate';
import '../css/Tabs.css';
import { FormGroup } from 'reactstrap';
import OtherLogins from "./otherLogins/OtherLogins";
import UserApi from "../../../../actions/api/user/UserApi";

class Login extends Base {
    constructor(props) {
        super(props);
        this.state = {
            usernameInput: {
                value: "",
                error: ""
            },
            passwordInput: {
                value: "",
                error: ""
            },
            message: "",
            isClick: false
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        var { usernameInput, passwordInput } = this.state;
        var user = null;

        var result = await UserApi.login({ user_acc_name: usernameInput.value, user_acc_pass: passwordInput.value })
        if (result && result.message)
            this.setState({ message: result.message })
        else if (result && result.data) {
            user = result.data;
            this.props.handleCloseMomal(user);
        } else alert(this.props.t("announce.error_network"))
        console.log(user);
    };

    handleBack = () => {
        this.props.handleCloseMomal(null);
    }

    onChangeUsername = (e) => {
        var value = e.target.value;
        var { usernameInput, passwordInput, isClick } = this.state;
        usernameInput.value = value
        usernameInput.error = required(value) || emailAndPhone(value);
        isClick = this.check({ usernameInput, passwordInput });
        this.setState({ usernameInput, passwordInput, isClick, message: "" })
    }

    onChangePassword = (e) => {
        var value = e.target.value;
        var { usernameInput, passwordInput, isClick } = this.state;
        passwordInput.value = value
        passwordInput.error = required(value) || password(value);
        isClick = this.check({ usernameInput, passwordInput });
        this.setState({ usernameInput, passwordInput, isClick, message: "" })
    }

    check = (state) => {
        if (!state || (!state.usernameInput) || (!state.passwordInput)) return false;
        if ((!state.usernameInput.value) || (state.usernameInput.value && state.usernameInput.error)) return false;
        if ((!state.passwordInput.value) || (state.passwordInput.value && state.passwordInput.error)) return false;
        return true
    }

    render() {
        const { t } = this.props;
        var { message, isClick, usernameInput, passwordInput } = this.state;
        return (
            <div>
                <form className="form" styles={{ position: "relative" }}>
                    <FormGroup className="form-login" style={styles.formGroup} >
                        <p className="title-ip-register form-inputr">{t("login.email.label")}</p>
                        <input
                            className="input-tabs"
                            placeholder={t("login.email.placeholder")}
                            type="text"
                            value={usernameInput.value}
                            onChange={this.onChangeUsername}
                        />
                        {usernameInput.error ? usernameInput.error : null}
                    </FormGroup >
                    <FormGroup className="form-login" style={styles.formGroup}>
                        <p className="title-ip-register">
                            {t("login.password.label")} </p>
                        <input
                            className="input-tabs"
                            placeholder={t("login.password.placeholder")}
                            type="password"
                            value={passwordInput.value}
                            onChange={this.onChangePassword}
                        />
                        {passwordInput.error ? passwordInput.error : null}
                    </FormGroup>
                    <FormGroup className="form-error is-visible" > {message} </FormGroup>
                    {/* <FormGroup style={styles.text}>
                        {t("login.password.forget")}
                    </FormGroup> */}
                    <FormGroup className="form-login" style={styles.formGroup}>
                        <button className='btn' style={styles.button} disabled={!isClick} onClick={this.handleSubmit}>{t("login.btn_login")}</button>
                    </FormGroup>
                    <FormGroup className="form-login" style={{ textAlign: "center", marginBottom: 24 }}>
                        <div className="btn-login btn_back" onClick={this.handleBack}>{t("login.btn_back")}</div>
                    </FormGroup>
                </form>
                {/* <OtherLogins /> */}

            </div>
        );
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
        width: '330px',
        marginLeft: 0
    }
}
export default translate("common")(Login)