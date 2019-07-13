import React from "react";
import { translate } from 'react-i18next';
import Base from '../../../../core/Base';
import { email, phone, required } from '../../../../../actions/validate';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import '../../css/UserInfo.css'
import UserApi from "../../../../../actions/api/user/UserApi";

class DialogChangeInfo extends Base {
    constructor(props) {
        super(props);
        this.user = props.user;
        this.state = {
            username: {
                value: this.user && this.user.user_acc_full_name ? this.user.user_acc_full_name : "",
                error: ""
            },
            phoneNumber: {
                value: this.user && this.user.user_acc_phon ? this.user.user_acc_phon : "",
                error: ""
            },
            userEmail: {
                value: this.user && this.user.user_acc_emai ? this.user.user_acc_emai : "",
                error: ""
            },
            message: "",
            isClick: false
        }
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        var isClick = this.check(this.state);
        this.setState({ isClick, message: "" })
    }

    componentWillReceiveProps(props){
        if (props.user !== this.state.user){
            this.user = props.user;
            var state = {
                username: {
                    value: this.user && this.user.user_acc_full_name ? this.user.user_acc_full_name : "",
                    error: ""
                },
                phoneNumber: {
                    value: this.user && this.user.user_acc_phon ? this.user.user_acc_phon : "",
                    error: ""
                },
                userEmail: {
                    value: this.user && this.user.user_acc_emai ? this.user.user_acc_emai : "",
                    error: ""
                },
                message: ""
            }
            var isClick = this.check(state);
            this.setState({...state, isClick});
        }
    }

    toggle() {
        this.setState({isOpenMomal: false})
        this.props.handleCloseMomal();
    }

    handleSubmit = async () => {
        var { username, phoneNumber, userEmail, message } = this.state;
        var params = {
            user_acc_full_name: username.value,
            user_acc_emai: userEmail.value,
            user_acc_phon: phoneNumber.value
        }
        var result = null;
        await UserApi.update(params)
            .then(data => result = data)
            .catch(err => console.log(err))

        if (result && result.code === "error") {
            message = result.message;
        }
        else if (result && result.data) {
            alert(this.props.t("announce.success_change_info"));
            this.props.handleCloseMomal(result);
        }
        else if (!result) alert(this.props.t("announce.error_network"));
        this.setState({ message })
    };

    onChangeUsername = (e) => {
        var value = e.target.value;
        var { username, phoneNumber, userEmail, isClick, message } = this.state;
        username.value = value;
        username.error = required(value)
        isClick = this.check({ username, phoneNumber, userEmail });
        message = "";
        this.setState({ username, phoneNumber, userEmail, isClick, message })
    }

    onChangeEmail = (e) => {
        var value = e.target.value;
        var { username, phoneNumber, userEmail, isClick, message } = this.state;
        userEmail.value = value;
        userEmail.error = required(value) || email(value);
        isClick = this.check({ username, phoneNumber, userEmail });
        message = "";
        this.setState({ username, phoneNumber, userEmail, isClick, message })
    }

    onChangePhone = (e) => {
        var value = e.target.value;
        var { username, phoneNumber, userEmail, isClick, message } = this.state;
        phoneNumber.value = value;
        phoneNumber.error = required(value) || phone(value);
        isClick = this.check({ username, phoneNumber, userEmail });
        message = "";
        this.setState({ username, phoneNumber, userEmail, isClick, message })
    }

    check = (state) => {
        if (!state) return false;
        if ((!state.username.value) || (!state.userEmail.value) || (!state.phoneNumber.value)) return false;
        if (state.username.error || state.userEmail.error || state.phoneNumber.error) return false;
        if ((state.username.value && (this.user && (state.username.value === this.user.user_acc_full_name))) &&
            (state.userEmail.value && (this.user && (state.userEmail.value === this.user.user_acc_emai))) &&
            (state.phoneNumber.value && (this.user && (state.phoneNumber.value === this.user.user_acc_phon)))) return false
        return true
    }

    render() {
        const { isOpenMomal, t } = this.props;
        const { username, userEmail, phoneNumber, isClick, message } = this.state;

        return (
            <div>
                <Modal isOpen={isOpenMomal} style={{ maxWidth: '378px', height: 'auto' }} toggle={this.toggle}>
                    <ModalHeader style={{display: "none"}}>
                    </ModalHeader>

                    <ModalBody >
                        <form className="change-info" onSubmit={this.handleSubmit}>
                            <p className="title-normal">{t("change_info.title")}</p>
                            <FormGroup>
                                <p className="title-change-info">{t("change_info.name_label")}</p>
                                <input
                                    className="input-nomal"
                                    placeholder={t("change_info.name_placeholder")}
                                    type="text"
                                    value={username.value}
                                    onChange={this.onChangeUsername}
                                />
                                {username.error ? username.error : null}
                            </FormGroup>
                            <FormGroup>
                                <p className="title-change-info">{t("change_info.phone_label")}</p>
                                <input
                                    className="input-nomal"
                                    placeholder={t("change_info.phone_placeholder")}
                                    type="number"
                                    pattern="[0-9]*"
                                    value={phoneNumber.value}
                                    onChange={this.onChangePhone}
                                />
                                {phoneNumber.error ? phoneNumber.error : null}
                            </FormGroup>
                            <FormGroup>
                                <p className="title-change-info">{t("change_info.email_label")}</p>
                                <input
                                    className="input-nomal"
                                    placeholder={t("change_info.email_placeholder")}
                                    type="email"
                                    value={userEmail.value}
                                    onChange={this.onChangeEmail}
                                />
                                {userEmail.error ? userEmail.error : null}
                            </FormGroup>
                            <FormGroup className="form-error is-visible"> {message} </FormGroup>
                            <FormGroup row style={{ marginBottom: "1rem" }} className="btn-change-info" >
                                <div className={isClick ? "btn" : "btn disabled"} style={{ marginLeft: '35px', width: '129px !important', height: '44px', marginTop: "5px", marginRight: 5 }} onClick={this.handleSubmit}><p className="text-btn">{t("change_info.btn_save")}</p></div>
                                <div className='btn btn-white' style={{ height: "44px", marginTop: "5px" }} onClick={this.toggle.bind(this)}><p className="text-btn" style={{ marginTop: -3 }}>{t("change_info.btn_back")}</p></div>
                            </FormGroup>

                        </form>
                    </ModalBody>
                    <ModalFooter style={{display: "none"}}>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default translate('common')(DialogChangeInfo);