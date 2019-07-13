import { i18next } from "./i18n";

const VEHICAL_PICK_UP_FORM = [
    {id: "home", name: i18next.t("common:preview_price.info_right.at_home")},
    {id: "dealer", name: i18next.t("common:preview_price.info_right.at_dealer")}
]

const USER_INFO_TABS = [
    {id: 0, name: "lich-su-thue-xe"},
    {id: 1, name: "thanh-toan"},
    {id: 2, name: "chi-tiet"},
    {id: 3, name: "doi-mat-khau"}
]

const PAYMENT_METHODS = [
    {id: 1, name:	"Visa"},
    {id: 2, name:	"ATM"},
    {id: 3, name:	"MoMo"},
    {id: 4, name:	"VnPay"},
    {id: 5, name:	"ZaloPay"}
]
export { VEHICAL_PICK_UP_FORM, USER_INFO_TABS, PAYMENT_METHODS}