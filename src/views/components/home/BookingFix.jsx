import React from 'react';
import Base from '../../core/Base';
import { translate } from 'react-i18next';
import { Redirect, Link } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage';
import { save } from '../../../actions/handlerBooking';
import MyUtil from '../../../actions/MyUtil';
import Image from 'react-image-webp';
import { i18next } from '../../../actions/i18n';
import { AlertNotification } from './AlertNotification';

var navbar;
var sticky;

class BookingFix extends Base {

    constructor(props) {
        super(props);
        this.rentalDate = reactLocalStorage.get("booking.rental_date", "");
        this.returnDate = reactLocalStorage.get("booking.return_date", "");
        this.state = {
            type: props.type,
            location: reactLocalStorage.get("booking.location", ""),
            rentalDate: this.rentalDate,
            returnDate: this.returnDate,
            isRedirect: false,
            error: "",
            isAlert: props.isAlert
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type !== this.state.type) this.setState({ type: nextProps.type });
        // if (nextProps.isAlert !== this.state.isAlert) this.setState({isAlert: nextProps.isAlert});
    }

    componentDidMount() {
        window.onscroll = () => {
            this.handleScroll()
        };

        navbar = document.getElementById("booking-fix");
        sticky = navbar.offsetTop;
    }

    handleRentalDate = (rentalDate, returnDate) => {
        window.jQuery.genderDatetimePicker({
            form_id: 'booking-fix-input',
            datetime_name: 'rental-datetime1',
            requestDateTime: MyUtil.getDatetimeFormat(rentalDate)
        }, () => {
            var dateStr = window.jQuery('#booking-fix-input #rental-datetime1').val();
            if (!dateStr) dateStr = MyUtil.getDatetimeFormat(new Date())
            var date = MyUtil.getDateByDateFormat(dateStr)
            //Consider time conditions - xét điều kiện thời gian---------------------------------------//
            // var dateNow = new Date();
            // var diff = Math.abs(dateNow - date);
            // if (diff < 43200000 && !this.state.isAlert) {
            //     AlertNotification()
            //     this.setState({isAlert: true});
            //     this.props.changeAlert(true);
            // }
            //-----------------------------------------------------------------------------------------//
            returnDate = MyUtil.getReturnDateByRentalDate(date);
            this.setState({ rentalDate: date, returnDate });
            reactLocalStorage.setObject("booking.rental_date", date);
            reactLocalStorage.setObject("booking.return_date", returnDate);
        });
    }

    handleReturnDate = (rentalDate, returnDate) => {
        var minDate = rentalDate ? MyUtil.getMinDateByDate(rentalDate) : MyUtil.getMinDateByDate(new Date())
        window.jQuery.genderDatetimePicker({
            form_id: 'booking-fix-input',
            datetime_name: 'return-datetime1',
            requestDateTime: MyUtil.getDatetimeFormat(returnDate),
            min_date: minDate
        }, () => {
            var dateStr = window.jQuery('#booking-fix-input #return-datetime1').val();
            if (!dateStr) dateStr = MyUtil.getDatetimeFormat(MyUtil.getMinDateByDate(new Date()))
            var date = MyUtil.getDateByDateFormat(dateStr)
            this.setState({ returnDate: date });
            reactLocalStorage.setObject("booking.return_date", date);
        });

    }

    handleScroll() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky");
        }
    }

    handleChooseType = (e) => {
        var type = (e.target.id == "car2") ? 1 : 2;
        this.setState({ type })
        var typeName = (type == 1) ? "oto" : "xemay"
        this.props.onChangeUrl("/" + typeName)
    }

    handleSelectLocation = (e) => {
        this.setState({ location: e.target.value })
    }

    handleClick = () => {
        var { rentalDate, returnDate, type, location } = this.state;

        rentalDate = window.jQuery('#booking-fix-input #rental-datetime1').val();
        returnDate = window.jQuery('#booking-fix-input #return-datetime1').val();
        if (rentalDate) rentalDate = MyUtil.getDateByDateFormat(rentalDate);
        if (returnDate) returnDate = MyUtil.getDateByDateFormat(returnDate);

        var check = this.check({ rentalDate, returnDate, type, location });
        if (!check) {
            save({ rentalDate, returnDate, type, location })
            this.setState({ location, isRedirect: true })
        } else alert(check)
    }

    check = (state) => {
        const t = this.props.t
        if (!state) {
            return t("background_area.quick_book.error.not_enough")
        }
        else if (!state.type) {
            return t("background_area.quick_book.error.vhc_type")
        }
        else if (!state.location) {
            return t("background_area.quick_book.error.city")
        }
        else if (!state.rentalDate) {
            return t("background_area.quick_book.error.rental_date")
        }
        else if (!state.returnDate) {
            return t("background_area.quick_book.error.return_date")
        } else {
            return ""
        }
    }


    render() {
        const { t, cities } = this.props
        var { type, location, rentalDate, returnDate, isRedirect } = this.state;
        var lang = i18next.language;

        this.handleRentalDate(rentalDate, returnDate);
        this.handleReturnDate(rentalDate, returnDate)

        var rentalFormat = MyUtil.getDatetimeFormatEn(new Date(rentalDate));
        var returnFormat = MyUtil.getDatetimeFormatEn(new Date(returnDate));

        if (isRedirect) {
            var typeName = type == 1 ? "oto" : "xemay"
            return <Redirect push to={"/tim-xe/" + typeName + "/" + type + "/" + location + "/" + rentalFormat + "/" + returnFormat} />
        } return (
            <div id="booking-fix">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div id="logo" className="logo">
                                <Link to="/" title={t("header.logo")}>
                                    <img
                                        src="assets/images/logo_cx.png"
                                    />

                                </Link>
                            </div>
                            <div className="navigation">
                                <div className="input-info-search">
                                    <form id="booking-fix-input">
                                        <div className="button-radio">
                                            <div className="radio-custom radio-inline text-center">
                                                <input type="radio" id="car2" name="booking" checked={type == 1} onChange={this.handleChooseType.bind(this)} />
                                                <label htmlFor="car2">
                                                    <div className="car">{t('background_area.quick_book.type.car')}</div>
                                                </label>
                                            </div>
                                            <div className="radio-custom radio-inline text-center">
                                                <input type="radio" id="motor2" name="booking" checked={type == 2} onChange={this.handleChooseType.bind(this)} />
                                                <label htmlFor="motor2">
                                                    <div className="motor">{t('background_area.quick_book.type.motor')}</div>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="input-form select-box location">
                                            <select required name="cruise-line" onChange={this.handleSelectLocation.bind(this)} value={location}>
                                                <option value="" hidden>{t("background_area.quick_book.province.title")}</option>
                                                {cities && cities.length > 0 && cities.map(city => (
                                                    <option key={city.city_id} value={city.city_id}>{lang === "vi" ? city.city_name : (lang === "en" ? city.city_name_en : "")}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="box-date ">
                                            <input className="input" type="text" id="rental-datetime1" name="rental-datetime1" placeholder={t('background_area.quick_book.input.date_pick')} style={styles.input_datatime} style={styles.image} />
                                        </div>

                                        <div className="box-date">
                                            <input className="input" type="text" id="return-datetime1" name="return-datetime1" placeholder={t('background_area.quick_book.input.date_drop')} style={styles.input_datatime} style={styles.image} />
                                        </div>
                                        <div className="btn" onClick={this.handleClick} style={{ height: 42, padding: 10 }}>{t('background_area.quick_book.input.btn')}</div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const styles = {
    input_datatime: {
        paddingLeft: "40px"
    },
    image: {
        background: "url(assets/images/icon/calendar.png)no-repeat 12px",
        backgroundSize: "37px"
    }

}
export default translate('common')(BookingFix);