import React from 'react';
import Base from '../../../core/Base'
import { translate } from 'react-i18next';
import { reactLocalStorage } from 'reactjs-localstorage';
import { required, password, confirmPassword } from '../../../../actions/validate';
import { Redirect } from "react-router-dom";
import '../css/ChangePassword.css'
import '../css/PersonInfo.css'
import UserApi from '../../../../actions/api/user/UserApi';

class ChangePassword extends Base {

    constructor(props) {
        super(props);
        reactLocalStorage.set("menu_default", 3)

        this.state = ({
            oldPass: {
                value: "",
                error: ""
            },
            newPass: {
                value: "",
                error: ""
            },
            confirmPass: {
                value: "",
                error: ""
            },
            isClick: false,
            error: "",
            isRedirect: false
        })
    }

    componentWillMount() {
        reactLocalStorage.get("menu_default", 3);
        var isClick = this.check(this.state);
        this.setState({ isClick, error: "" })
    }

    onChangeNewPass = (e) => {
        var { newPass, oldPass, isClick, confirmPass } = this.state
        var value = e.target.value;
        newPass = this.state.newPass
        newPass.value = value;
        newPass.error = required(value) || password(value);
        isClick = this.check({ newPass, oldPass, isClick, confirmPass })
        this.setState({ newPass, isClick, error: "" });
    }

    onChangeOldPassword = (e) => {
        var { newPass, oldPass, isClick, confirmPass } = this.state
        var value = e.target.value;
        oldPass = this.state.oldPass;
        oldPass.value = value;
        oldPass.error = required(value) || password(value)
        isClick = this.check({ newPass, oldPass, isClick, confirmPass })
        this.setState({ oldPass, isClick, error: "" });
    }

    onChangeConfirm = (e) => {
        var { newPass, oldPass, isClick, confirmPass } = this.state
        var value = e.target.value;
        confirmPass = this.state.confirmPass;
        confirmPass.value = value;
        confirmPass.error = required(value) || password(value) || confirmPassword(value, this.state.newPass.value);
        isClick = this.check({ newPass, oldPass, isClick, confirmPass })
        this.setState({ confirmPass, isClick, error: "" });
    }

    handleSubmit = async () => {
        var { newPass, error } = this.state
        var user = reactLocalStorage.getObject("user.info", null);
        if (!user) {
            error = this.props.t("announce.error_login")
            this.setState({
                error,
                isRedirect: true
            })
        }
        else {
            var { oldPass, newPass } = this.state
            var params = {
                old_pass: oldPass.value,
                new_pass: newPass.value
            }
            var result = null;
            await UserApi.changePassword(params)
                .then(data => result = data)
                .catch(err => console.log(err))
            if (!result) alert(this.props.t("announce.error_network"));
            else if (result && result.code === "error") {
                error = result.message;
            }
            else if (result.data){
                alert(this.props.t("announce.success_change_pass"));
            }
        }
        this.setState({ error })
    };

    check = (state) => {
        if (!state) return false;
        if ((!state.oldPass) || (state.oldPass && (!state.oldPass.value)) || (state.oldPass && state.oldPass.value && (state.oldPass.error))) return false
        if ((!state.newPass) || (state.newPass && (!state.newPass.value)) || (state.newPass && state.newPass.value && (state.newPass.error))) return false
        if ((!state.confirmPass) || (state.confirmPass && (!state.confirmPass.value)) || (state.confirmPass && state.confirmPass.value && (state.confirmPass.error))) return false
        else return true
    }

    render() {
        const t = this.props.t;
        const { newPass, oldPass, confirmPass, isClick, error, isRedirect } = this.state
        if (isRedirect) return <Redirect push to="/" />
        return (
            <div className="right-content">
                <div className="group">
                    <div className="row">
                        <p className="title-changepass">{t('change_password.title')}</p>
                        <div style={{ width: '100%', possible: 'relative' }}>
                            <form ref="form" className="form" style={{ possible: 'relative' }} onSubmit={this.handleSubmit}>
                                <div className="form-group row mb-lg">
                                    <label className="title-input form-input">{t('change_password.pass_old')}</label>
                                    <div style={{ marginLeft: "16px" }}>
                                        <input
                                            className="input-changpass"
                                            placeholder={t('change_password.placeholder_passold')}
                                            type="password"
                                            name="passold"
                                            value={oldPass.value}
                                            onChange={this.onChangeOldPassword}
                                        />
                                        {oldPass.error ? oldPass.error : null}
                                    </div>
                                </div>
                                <div className="form-group row mb-lg">
                                    <label className="title-input">{t('change_password.pass_new')}</label>
                                    <div style={{ marginLeft: "16px" }}>
                                        <input
                                            className="input-changpass form-input"
                                            placeholder={t('change_password.placeholder_passnew')}
                                            type="password"
                                            name="password"
                                            value={newPass.value}
                                            onChange={this.onChangeNewPass}
                                        />
                                        {newPass.error ? newPass.error : null}
                                    </div>
                                </div>

                                <div className="form-group row mb-lg">
                                    <label className="title-input">{t('change_password.pass_confirm')}</label>
                                    <div style={{ marginLeft: "16px" }}>
                                        <input
                                            className="input-changpass"
                                            placeholder={t('change_password.placeholder_confirm')}
                                            type="password"
                                            name="confirm"
                                            value={confirmPass.value}
                                            onChange={this.onChangeConfirm}
                                        />
                                        {confirmPass.error ? confirmPass.error : null}
                                    </div>
                                </div>
                                {error ?
                                    <div className="form-error is-visible" style={{ textAlign: "center", marginBottom: "20px" }}>{error}</div>
                                    : null}
                                <div className={isClick ? "btn btn-changepass" : "btn btn-changepass disabled"} onClick={this.handleSubmit.bind(this)}>{t('change_password.title')}</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default translate('common')(ChangePassword);