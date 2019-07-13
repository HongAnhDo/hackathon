import React from 'react'
import { isAlpha } from 'validator';
import { i18next } from './i18n';
const validates = {
    maxLength: 8,
    minLengthPass: 6,
    minAddress: 3
};
const required = (value) => {
    if (!value) {
        return  <span className="form-error is-visible">{i18next.t('common:validate.required')}</span>
    } else  return ""
};

const email = (value) => {
    if (!isEmail(value)) {
        return <span className="form-error is-visible">{i18next.t('common:validate.email')}</span>;
    } else return false
};

const phone = (value) => {
    if (!isPhone(value)) {
        return <span className="form-error is-visible">{i18next.t('common:validate.phone')}</span>;
    } return false
};

const password = (value) => {
    if (value.toString().trim().length < validates.minLengthPass) {
        return <span className="form-error is-visible">{i18next.t('common:validate.password')}</span>;
    } return false
};

const emailAndPhone = (value) => {
    if (phone(value) && email(value)) return <span className="form-error is-visible">{i18next.t('common:validate.email_phone')}</span>;
}

const confirmPassword = (confPass, newPass) => {
    if (confPass !== newPass) {
        return <span className="form-error is-visible">{i18next.t('common:validate.confirm')}</span>;
    } else return false
}

const address = (value) => {
    if (value.toString().trim().length < validates.minAddress) {
        return <span className="form-error is-visible">{i18next.t('common:validate.required')}</span>;
    } return false
}

const isPhone = (phone) => {
    if (!phone) return false;
    phone = phone.trim();
    var flag = false;

    const gpcPattern = /^(84|0)(9(1|4)|12(3|4|5|7|9)|88)\d{7}$/;

    const vinaphone = /^(84|0)(9(1|4)|8(1|2|3|4|5))\d{7}$/;

    const vmsPattern = /^(84|0)(9(0|3)|12(0|1|2|6|8)|89)\d{7}$/;

    const mobiphone = /^(84|0)(9(0|3)|7(0|6|7|8|9))\d{7}$/;

    const viettelPattern = /^(84|0)(9(6|7|8)|16(8|9|6|7|3|4|5|2)|86)\d{7}$/;

    const viettel = /^(84|0)(9(6|7|8)|3(8|9|6|7|3|4|5|2)|86)\d{7}$/;

    const vnm = /^(84|0)(92|188|186)\d{7}$/;

    const vnmobile = /^(84|0)(92|58|56)\d{7}$/;

    const beeline = /^(84|0)((1|)99)\d{7}$/;

    const Gmobile = /^(84|0)(99|59)\d{7}$/;

    const telephone = /^(02|2)\d{9}$/;

    flag = phone.match(gpcPattern) || phone.match(vmsPattern) || phone.match(viettelPattern) || phone.match(vnm) || phone.match(beeline) || phone.match(telephone)
        || phone.match(vinaphone) || phone.match(mobiphone) || phone.match(viettel) || phone.match(vnmobile) || phone.match(Gmobile);

    return flag;
}

const isEmail = (email) => email && email.match(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]{2,})+$/i)


export {
    required,
    email,
    password,
    phone,
    emailAndPhone,
    address,
    confirmPassword,
    isPhone,
    isEmail
}
