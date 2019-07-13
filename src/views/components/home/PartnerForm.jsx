import React from 'react';
import { translate } from 'react-i18next';
import './css/PartnerForm.css';
import Base from '../../core/Base';
import { FormGroup } from 'reactstrap';
import { required, phone, email, address } from '../../../actions/validate';
import AutoCompleteInput from '../../templates/autoComplete/AutoCompleteInput';
import { Link } from 'react-router-dom'

class PartnerForm extends Base {

    constructor(props) {
        super(props);
        this.state = {
            nameInput: {
                value: "",
                error: ""
            },
            addressInput: {
                value: "",
                error: ""
            },
            message: "",
            phoneInput: {
                value: "",
                error: ""
            },
            titleInput: {
                value: "",
                error: ""
            },
            contentInput: {
                value: "",
                error: ""
            },
            emailInput: {
                value: "",
                error: ""
            }
        }
    }

    onChangeName = (e) => {
        var value = e.target.value;
        var { titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput, isClick } = this.state;
        nameInput.value = value
        nameInput.error = required(value);
        isClick = this.check({ titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput });
        this.setState({ titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput, isClick, message: "" })
    }

    onChangeAddress = (address) => {
        var value = address;
        var { titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput, isClick } = this.state;
        addressInput.value = value
        isClick = this.check({ titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput });
        this.setState({ titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput, isClick, message: "" })
    }

    onChangeTitle = (e) => {
        var value = e.target.value;
        var { titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput, isClick } = this.state;
        titleInput.value = value
        isClick = this.check({ titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput });
        this.setState({ titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput, isClick, message: "" })
    }

    onChangePhone = (e) => {
        var value = e.target.value;
        var { titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput, isClick } = this.state;
        phoneInput.value = value
        phoneInput.error = required(value) || phone(value);
        isClick = this.check({ titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput });
        this.setState({ titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput, isClick, message: "" })
    }

    onChangeContent = (e) => {
        var value = e.target.value;
        var { titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput, isClick } = this.state;
        contentInput.value = value
        isClick = this.check({ titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput });
        this.setState({ titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput, isClick, message: "" })
    }

    onChangeEmail = (e) => {
        var value = e.target.value;
        var { titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput, isClick } = this.state;
        emailInput.value = value
        emailInput.error = required(value) || email(value);
        isClick = this.check({ titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput });
        this.setState({ titleInput, nameInput, addressInput, phoneInput, contentInput, emailInput, isClick, message: "" })
    }

    check = (state) => {
        if (!state ||(!state.nameInput) || (!state.phoneInput) || (!state.emailInput)) return false;
        if ((!state.nameInput.value) || (state.nameInput.value && state.nameInput.error)) return false;
        if ((!state.phoneInput.value) || (state.phoneInput.value && state.phoneInput.error)) return false;
        if ((!state.emailInput.value) || (state.emailInput.value && state.emailInput.error)) return false;
        return true
    }

    handleSubmit = async () => {
        const t = this.props.t
        var check1 = await this.sendEmailUs();
        var check2 = await this.sendEmailCustomer();
        if (check1 && check2) alert(t("announce.success_register"));
        else alert(t("announce.error_network"))
    }

    sendEmailUs = async () => {
       
    }

    sendEmailCustomer = async () => {
      
    }

    render() {
        const { nameInput, addressInput, message, phoneInput, titleInput, contentInput, emailInput, isClick } = this.state
        const { t } = this.props
        return (
            <div className="partner-form-container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <p className="title-child-about" style={{ textAlign: "center" }}>{t("partner_form.title")}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <form className="form form-content" >
                            <FormGroup style={styles.formGroup} >
                                <p className="title-ip-register form-input">{t("partner_form.form.name_label")}</p>
                                <input
                                    className="input-tabs"
                                    placeholder={t("partner_form.form.name_placeholder")}
                                    type="text"
                                    value={nameInput.value}
                                    onChange={this.onChangeName}
                                />
                                {nameInput.error ? nameInput.error : null}
                            </FormGroup>
                            <FormGroup style={styles.formGroup}>
                                <p className="title-ip-register"> {t("partner_form.form.phone_label")} </p>
                                <input
                                    className="input-tabs"
                                    placeholder={t("partner_form.form.phone_placeholder")}
                                    type="number"
                                    pattern="[0-9]*"
                                    value={phoneInput.value}
                                    onChange={this.onChangePhone}
                                />
                                {phoneInput.error ? phoneInput.error : null}
                            </FormGroup>

                            <FormGroup style={styles.formGroup}>
                                <p className="title-ip-register"> {t("partner_form.form.email_label")} </p>
                                <input
                                    className="input-tabs"
                                    placeholder={t("partner_form.form.email_placeholder")}
                                    type="email"
                                    value={emailInput.value}
                                    onChange={this.onChangeEmail}
                                />
                                {emailInput.error ? emailInput.error : null}
                            </FormGroup>

                            <FormGroup style={styles.formGroup}>
                                <p className="title-ip-register"> {t("partner_form.form.address_label")} </p>
                                <AutoCompleteInput
                                    className="input-tabs"
                                    placeholder={t("partner_form.form.address_placeholder")}
                                    value={addressInput.value}
                                    onChange={this.onChangeAddress}
                                    name="address"
                                    handleSelect={this.onChangeAddress}
                                />
                                {addressInput.error ? addressInput.error : null}
                            </FormGroup>
                            <FormGroup style={styles.formGroup}>
                                <p className="title-ip-register"> {t("partner_form.form.title_label")} </p>
                                <input
                                    className="input-tabs"
                                    placeholder={t("partner_form.form.title_placeholder")}
                                    type="text"
                                    value={titleInput.value}
                                    onChange={this.onChangeTitle}
                                />
                                {titleInput.error ? titleInput.error : null}
                            </FormGroup>
                            <FormGroup style={styles.formGroup}>
                                <p className="title-ip-register"> {t("partner_form.form.content_label")}</p>
                                <textarea
                                    className="input-tabs"
                                    placeholder={t("partner_form.form.content_placeholder")}
                                    type="text"
                                    rows={5}
                                    value={contentInput.value}
                                    onChange={this.onChangeContent}
                                />
                                {contentInput.error ? contentInput.error : null}
                            </FormGroup>
                            <FormGroup className="form-error is-visible" > {message} </FormGroup>
                            <FormGroup style={{ width: '410px', textAlign: 'center', paddingTop: '5px !important' }}>
                                <div className={isClick ? 'btn partner-button' : 'btn-disabled partner-button'} onClick={isClick ? this.handleSubmit.bind(this): undefined}>{t("partner_form.btn_register")}</div>
                            </FormGroup>
                            <FormGroup style={{ textAlign: "center", marginBottom: 24 }}>
                                <Link  to="/">
                                    <div className="btn_back partner-back">{t("partner_form.btn_back")}</div>
                                </Link>

                            </FormGroup>
                        </form>
                    </div>
                </div>

            </div>);
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
        width: '410px'
    }
}
export default translate("common")(PartnerForm);