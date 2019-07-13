import React from 'react'
import Base from '../../../../core/Base'
import { translate } from 'react-i18next';
import '../../css/MenuLeft.css'
import MenuHistory from './MenuHistory';
import { reactLocalStorage } from 'reactjs-localstorage';
import MyUtil from '../../../../../actions/MyUtil';
import { Redirect, Link, Route } from "react-router-dom"
import HistoryRental from './HistoryRental';

class History extends Base {

    constructor(props) {
        super(props);
        this.state = ({
            moveToDetail: false,
            bookings: [],
            isRedirect: false,
            isDetail: false,
            booking: null,
            status: 1,
            type: 1
        })
        this.mounted = true
    }

    componentWillMount() {
        reactLocalStorage.get("menu_default", 0);
    }

    async componentDidMount() {
        var user = reactLocalStorage.getObject("user.info", null)
        if (!user) this.setState({ isRedirect: true })
        else {
            this.token = user.user_acc_tokn;
            var { status, type } = this.state
            await this.getBookings(status, type);
        }
    }

    getBookings = async (status, type) => {
        
    }

    componentWillUnmount() {
        this.mounted = false
    }

    handleDetailHistory = (booking) => {
        this.setState({ isDetail: true, booking: booking })
    }

    onChangeStatus = async (status) => {
        this.setState({ status: status })
        await this.getBookings(status, this.state.type);
    }

    onChangeType = async (type) => {
        this.setState({ type: type })
        await this.getBookings(this.state.status, type);
    }

    renderItemList = (booking) => {
        const t = this.props.t
        if (booking) return (
            <div className="prod his " key={booking.book_id}>
                <a>
                    <img src={booking.vhc_imgs ? booking.vhc_imgs[0].vhc_img_link : ""} className=" pt-xlg pb-lg" />
                </a>
                <div className="info-prod">
                    <div className="pull-left">
                        <p className="tit2 mt-md mb-sm">{booking.vhc_part_name}</p>
                        <div className="dt">
                            <div style={{ display: '-webkit-box' }}>
                                <div style={{ width: '100px' }}>{t("history.complete.code_received")}</div>
                                <span>{booking.book_code}</span>
                            </div>
                            <div style={{ display: '-webkit-box' }}>
                                <div style={{ width: '100px' }}>{t("history.complete.date_book")}</div>
                                <span>{MyUtil.getDatetimeFormat(booking.book_crta)}</span>
                            </div>
                            <div style={{ display: '-webkit-box' }}>
                                <div style={{ width: '100px' }}>{t("history.complete.time")}</div>
                                <span>{MyUtil.getDatetimeFormat(booking.book_rent_date) + " - " + MyUtil.getDatetimeFormat(booking.book_retun_date)}</span>
                            </div>
                            <div style={{ display: '-webkit-box' }}>
                                <div style={{ width: '100px' }}>{t("history.complete.price_rent")}</div>
                                <span>{MyUtil.currencyFormat(booking.book_prie_tota)} {t("preview_price.unit")}</span>
                            </div>
                        </div>
                    </div>
                    <div className="pull-right text-right">
                        <Link to={this.props.path + "/" + booking.book_id} params={{ booking: booking }} className="btn" style={{ color: '#ffffff' }} >{t("history.complete.btn_detail")}</Link>
                        {/* <a className="btn" onClick={() => this.handleDetailHistory(booking)} style={{ color: '#ffffff' }} >{t("history.complete.btn_detail")}</a> */}
                        <a className="btn light" style={{ color: '#00363b' }} data-toggle="modal" data-target="#huyxe">{t("history.complete.btn_cancel")}</a>
                    </div>
                </div>
            </div>)
    }

    render() {
        const { bookings, isRedirect, isDetail, booking, status, type } = this.state
        if (isRedirect) return <Redirect push to="/" />
        if (this.mounted) {
            if (this.props.bookId > 0) return (
                <HistoryRental booking={booking} />
            )
            else return (
                <div className="right-content">
                    <MenuHistory
                        status={status}
                        type={type}
                        onChangeStatus={this.onChangeStatus}
                        onChangeType={this.onChangeType}
                    />
                    <div className="row list-view mb-xlg">
                        <div className="col-md-12">
                            {bookings && bookings.length ? bookings.map(booking =>
                                this.renderItemList(booking)
                            ) : null}
                        </div>
                    </div>
                </div>)
        }
    }
}

export default translate('common')(History);