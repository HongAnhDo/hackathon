import React from 'react';
import { isEmail } from 'validator';
import MailchimpSubscribe from "react-mailchimp-subscribe";
import Base from '../core/Base';
import '../App.css';
import { i18next } from '../../actions/i18n';


const url =
    "https://hackathon.us19.list-manage.com/subscribe/post?u=4dde64e06c8b9d8297c88cfd9&amp;id=333cb11143";
const CustomForm = ({ status, message, onValidated }) => {
    var email;
    const submit = () =>
        email &&
        isEmail(email.value, { 'allow_utf8_local_part': false }) &&
        onValidated({
            EMAIL: email.value

        });

    return (

        <div
            style={{
                borderRadius: 2,
                fontSize: '14px'
            }}
            className="form-submit"
        >
            {status === "sending" && <div style={{ color: "#ffffff" }}>{i18next.t("common:announce.mailchip.sending")}</div>}
            {status === "error" && alert(i18next.t("common:announce.mailchip.error"))}
            {status === "success" && alert(i18next.t("common:announce.mailchip.success"))}
            <div>
                <input
                    style={{ fontSize: 14, padding: 5, backgroundColor: '#ffffff', height: 30, float: 'left', width: 'calc(100% - 76px)', borderRadius: 0 }}
                    ref={node => (email = node)}
                    type="email"
                    placeholder={i18next.t("common:change_info.email_placeholder")}
                />
                <button className="btn-send" onClick={submit}>{i18next.t("common:menu.register")}</button>
            </div>
        </div>
    );
};


class MailChip extends Base {
    render() {
        return (
            <MailchimpSubscribe
                url={url}
                render={({ subscribe, status, message }) => (
                    <CustomForm
                        status={status}
                        message={message}
                        onValidated={formData => subscribe(formData)}
                    />
                )}
            />
        )
    }
}
;
export default MailChip;