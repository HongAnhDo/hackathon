import React from 'react'
import Base from '../../../../core/Base'
import { translate } from 'react-i18next';
import '../../css/MenuLeft.css'
import MyUtil from '../../../../../actions/MyUtil';
import {Link} from "react-router-dom"

class HistoryRental extends Base {

    constructor(props) {
        super(props);

    }

    render() {
        const { t, booking } = this.props
        if (booking) return (
            <div className="right-content">
                <div className="row mb-xlg">
                    <div className="col-md-12">
                        <div className="shadow p-lg mb-xlg">
                            <div className="model row">
                                <div className="col-sm-5">
                                    <a><img src={booking.vhc_imgs[0] ? booking.vhc_imgs[0].vhc_img_link : ""}  className="mt-md" /></a>
                                </div>
                                <div className="col-sm-7">
                                    <div className="tit3 mt-md mb-xs">{booking.vhc_part_name}</div>
                                    <div className="clear">
                                        <div className="stars large mb-sm pull-left">
                                            <img src="assets/images/icon/star-on.png" />
                                            <img src="assets/images/icon/star-on.png" />
                                            <img src="assets/images/icon/star-on.png" />
                                            <img src="assets/images/icon/star-on.png" />
                                            <img src="assets/images/icon/star-on.png" />
                                        </div>
                                        <a className="pull-left ml-md edit"><img src="assets/images/icon/ic-pen.png" height="18" /></a>
                                    </div>
                                    <form>
                                        <div className="form-group">
                                            <textarea className="form-control"
                                                placeholder={t('history_rental.placeholder_comment')}></textarea>
                                        </div>
                                        <a href="#" className="btn"><b>{t('history_rental.btn_comment')}</b></a>
                                    </form>
                                </div>
                            </div>
                            <div className="luuy pt-sm pb-sm m-xs mt-xlg">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p className="text-default mb-md mt-lg"><b>{t('history_rental.info_customer')}</b></p>
                                        <form className="cap">
                                            <div className="form-group  mb-none">
                                                <label className=" pt-1">{t('history_rental.name')}</label>
                                                <p className="form-control-static pt-none">{booking.cstm_name}</p>
                                            </div>
                                            <div className="form-group mb-none">
                                                <label className=" pt-2">{t('history_rental.phone')}</label>
                                                <p className="form-control-static pt-none">{booking.cstm_phon}</p>
                                            </div>
                                            <div className="form-group mb-none">
                                                <label className=" pt-2">{t('history_rental.email')} </label>
                                                <p className="form-control-static pt-none">{booking.cstm_emai}</p>
                                            </div>
                                            {booking.cstm_deli_addr && <div className="form-group mb-none">
                                                <label className=" pt-2">{t('history_rental.address_received')}</label>
                                                <p className="form-control-static pt-none">{booking.cstm_deli_addr}</p>
                                            </div>}
                                            <div className="form-group mb-none">
                                                <label className=" pt-2">{t('history_rental.payment_form')}</label>
                                                <p className="form-control-static pt-none">{booking.cstm_deli_addr ? t("booking.received_vehicle.at_home"): t("booking.received_vehicle.at_agency")}</p>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="text-default mb-md mt-lg"><b>{t('history_rental.detail_reservation')}</b></p>
                                        <form className="cap">
                                            <div className="form-group  mb-none">
                                                <label className=" pt-1">{t('history_rental.status')}</label>
                                                <p className="form-control-static pt-none">{booking.book_stt.book_stt_name}</p>
                                            </div>
                                            <div className="form-group  mb-none">
                                                <label className=" pt-1">{t('history_rental.payment_form')}</label>
                                                <p className="form-control-static pt-none">{booking.cstm_pay_meth.pay_meth_name}</p>
                                            </div>
                                            <div className="form-group  mb-none">
                                                <label className=" pt-1">{t('history_rental.code_received')}</label>
                                                <p className="form-control-static pt-none">{booking.book_code}</p>
                                            </div>

                                            <div className="form-group  mb-none">
                                                <label className=" pt-1">{t('history_rental.value_tax')}</label>
                                                <p className="form-control-static pt-none">{MyUtil.currencyFormat(booking.book_prie_tota)} {t("preview_price.unit")}</p>
                                            </div>
                                            <div className="form-group mb-none">
                                                <label className=" pt-2">{t('history_rental.time_rental')}</label>
                                                <p className="form-control-static pt-none">{MyUtil.getDatetimeFormat(booking.book_rent_date) + " - " + MyUtil.getDatetimeFormat(booking.book_retun_date)}</p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <Link to="/thong-tin-tai-khoan/lich-su-thue-xe" className="btn mt-md">{t('history_rental.btn_back')}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default translate('common')(HistoryRental);