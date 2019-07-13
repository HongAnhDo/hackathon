import Base from "../../../core/Base";
import React from 'react';
import { translate } from 'react-i18next';
import { Redirect } from 'react-router-dom'
import { reactLocalStorage } from "reactjs-localstorage";
import { save } from "../../../../actions/handlerBooking";
import './Slides.css'
import MyUtil from "../../../../actions/MyUtil";
import { i18next } from "../../../../actions/i18n";
import { AlertNotification } from "../AlertNotification";

class QuickBook extends Base {
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
            modal: false,
            error: "",
            isAlert: props.isAlert
        }

    }

    componentWillReceiveProps(nextProps){
        if (nextProps.type !== this.state.type) this.setState({type: nextProps.type});
        // if (nextProps.isAlert !== this.state.isAlert) this.setState({isAlert: nextProps.isAlert});
    }

    handleChooseType = (e) => {
        this.setState({ type: e.target.id == "car" ? 1 : 2 })
        var { type, location, rentalDate, returnDate } = this.state;
        type = e.target.id;
        var typeName = type == "car" ? "oto" : "xemay"
        this.check({ type, location, rentalDate, returnDate });
        this.props.onChangeUrl("/" + typeName)
    }

    handleSelectLocation = (e) => {
        this.setState({ location: e.target.value })
        var { type, location, rentalDate, returnDate } = this.state;
        location = e.target.value
        this.check({ type, location, rentalDate, returnDate });
    }

    handleClick = () => {
        var { rentalDate, returnDate, type, location } = this.state
        rentalDate = window.jQuery('#quick-book #rental-datetime').val();
        returnDate = window.jQuery('#quick-book #return-datetime').val();
        if (rentalDate) rentalDate = MyUtil.getDateByDateFormat(rentalDate);
        if (returnDate) returnDate = MyUtil.getDateByDateFormat(returnDate);

        var check = this.check({ rentalDate, returnDate, type, location });
        if (check) {
            save({ rentalDate, returnDate, type, location })
            this.setState({ isRedirect: true, location })
        }
    }

    handleRentalDate = (rentalDate, returnDate) => {
        var { type, location, isAlert } = this.state;
        window.jQuery.genderDatetimePicker({
            form_id: 'quick-book',
            datetime_name: 'rental-datetime',
            requestDateTime: MyUtil.getDatetimeFormat(rentalDate),
            minDate: new Date()
        }, () => {
            var dateStr = window.jQuery('#quick-book #rental-datetime').val();
            if (!dateStr) dateStr = MyUtil.getDatetimeFormat(new Date())
            
            var date = MyUtil.getDateByDateFormat(dateStr);

            //Consider time conditions - xét điều kiện thời gian---------------------------------------//
            // var dateNow = new Date();
            // var diff = Math.abs(dateNow - date);
            // if(diff < 43200000 && !isAlert) {
            //    AlertNotification();
            //    this.setState({isAlert: true});
            //    this.props.changeAlert(true);
            // }
            //-----------------------------------------------------------------------------------------//

            returnDate = MyUtil.getReturnDateByRentalDate(date);
            this.setState({ rentalDate: date, returnDate });
            this.check({ type, location, rentalDate: date, returnDate })
            
            reactLocalStorage.setObject("booking.rental_date", date);
            reactLocalStorage.setObject("booking.return_date", returnDate);

            window.jQuery("#btn-quick-book").css({
                cursor: "pointer",
                background: "linear-gradient(to right, #00363b, #064a50)",
                pointerEvents: "inherit"
            });
        }, () => {
            window.jQuery("#btn-quick-book").css({
                cursor: "not-allowed",
                background: "#bcbcbc",
                pointerEvents: "none"
            })
        });
    }

    handleReturnDate = (rentalDate, returnDate) => {
        var { type, location } = this.state;
        var minDate = rentalDate ? MyUtil.getMinDateByDate(rentalDate) : MyUtil.getMinDateByDate(new Date())
        window.jQuery.genderDatetimePicker({
            form_id: 'quick-book',
            datetime_name: 'return-datetime',
            requestDateTime: MyUtil.getDatetimeFormat(returnDate),
            min_date: minDate
        }, () => {
            var dateStr = window.jQuery('#quick-book #return-datetime').val();
            if (!dateStr) dateStr = MyUtil.getDatetimeFormat(MyUtil.getMinDateByDate(new Date()))
            var date = MyUtil.getDateByDateFormat(dateStr)
            this.setState({ returnDate: date })
            this.check({ type, location, rentalDate, returnDate: date })
            reactLocalStorage.setObject("booking.return_date", date);

            window.jQuery("#btn-quick-book").css({
                cursor: "pointer",
                background: "linear-gradient(to right, #00363b, #064a50)",
                pointerEvents: "inherit"
            });
        }, () => {
            window.jQuery("#btn-quick-book").css({
                cursor: "not-allowed",
                background: "#bcbcbc",
                pointerEvents: "none"
            })
        });
    }

    check = (state) => {
        const t = this.props.t
        if (!state) {
            this.setState({ error: t("background_area.quick_book.error.not_enough") });
            return false
        }
        else if (!state.type) {
            this.setState({ error: t("background_area.quick_book.error.vhc_type") });
            return false
        }
        else if (!state.location) {
            this.setState({ error: t("background_area.quick_book.error.city") });
            return false
        }
        else if (!state.rentalDate) {
            this.setState({ error: t("background_area.quick_book.error.rental_date") });
            return false
        }
        else if (!state.returnDate) {
            this.setState({ error: t("background_area.quick_book.error.return_date") });
            return false
        } else {
            this.setState({ error: "" })
            return true
        }
    }
    handleOpenModal = () => {
        this.setState({ modal: true })
    }

    handleCloseModal = () => {
        this.setState({ modal: false })
    }

    render() {
        const { t, cities } = this.props;
        console.log("gia tri tim xe:",t('background_area.quick_book.input.btn'));
        var { type, location, rentalDate, returnDate, isRedirect, error } = this.state;
        var lang = i18next.language;

        this.handleRentalDate(rentalDate, returnDate);
        this.handleReturnDate(rentalDate, returnDate);

        var rentalFormat = MyUtil.getDatetimeFormatEn(new Date(rentalDate));
        var returnFormat = MyUtil.getDatetimeFormatEn(new Date(returnDate));

        if (isRedirect) {
            var typeName = type == 1 ? "oto" : "xemay"
            return <Redirect push to={{ pathname: "/tim-xe/" + typeName + "/" + type + "/" + location + "/" + rentalFormat + "/" + returnFormat }} />
        } else return (
            <div className="quick-book">
                <div className="box-content input-info-search">
                    <h4 className="text-center">{t('background_area.quick_book.title')}</h4>
                    <form id="quick-book">
                        <div className="form-row button-radio">
                            <div className="form-group col-xs-6 col-sm-6">
                                <div className="radio-custom radio-inline text-center">
                                    <input type="radio" id="car" name="booking" checked={type == 1} onChange={this.handleChooseType.bind(this)} />
                                    <label htmlFor="car" id = "chon-xe-o-to">
                                        <div className="car"  id = "chon-oto">{t('background_area.quick_book.type.car')}</div>
                                    </label>
                                </div>
                            </div>
                            <div className="form-group col-xs-6 col-sm-6">
                                <div className="radio-custom radio-inline text-center">
                                    <input type="radio" id="motor" name="booking" checked={type == 2} onChange={this.handleChooseType.bind(this)} />
                                    <label htmlFor="motor" id = "chon-xe-may">
                                        <div className="motor" id = "chon-xemay">{t('background_area.quick_book.type.motor')}</div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-row button-radio">
                            <div className="form-group col-lg-12">
                                <div className="select-box location">
                                    <select required name="cruise-line" onChange={this.handleSelectLocation.bind(this)} value={location}>
                                        <option value="" hidden>{t("background_area.quick_book.province.title")}</option>
                                        {cities && cities.length > 0 && cities.map(city => (
                                           <option key={city.city_id} value={city.city_id}>{ lang === "vi" ? city.city_name : (lang === "en" ? city.city_name_en : "")}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className="form-row button-radio">
                            <div className="form-group col">
                                <div className="two-column">
                                    <div className="box-date ">
                                        {/* <img src="assets/images/icon/calendar.png" style={styles.image} /> */}
                                        <input className="input" id="rental-datetime" type="text" name="rental-datetime" placeholder={t('background_area.quick_book.input.date_pick')} style={styles.image} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-row button-radio">
                            <div className="form-group col">
                                <div className="two-column">
                                    <div className="box-date">
                                        {/* <img src="assets/images/icon/calendar.png" style={styles.image} /> */}
                                        <input className="input" id="return-datetime" type="text" name="return-datetime" placeholder={t('background_area.quick_book.input.date_drop')} ref={(input) => this.refReturn = input} style={styles.image} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span className="form-error is-visible">{error}</span>
                        <div className="form-row button-radio">
                            <div className="form-group col">
                                <div className="btn btn-block" id="btn-quick-book" onClick={this.handleClick.bind(this)}>{t('background_area.quick_book.input.btn')}</div>
                            </div>
                        </div>

                    </form>
                    <div style={{ width: '100%', textAlign: "center", fontSize: '12px' }} className="span_require" >{t('background_area.quick_book.require.text1')} <a href="https://dichungtaxi.com" title={t('background_area.quick_book.require.text2')}>{t('background_area.quick_book.require.text2')}</a>, <a href="https://megabus.vn/xe-limousine" title={t('background_area.quick_book.require.text5')} > {t('background_area.quick_book.require.text5')} </a> {t('background_area.quick_book.require.text3')} <span onClick={this.handleOpenModal} title={t('background_area.quick_book.require.text4')}>{t('background_area.quick_book.require.text4')}</span></div>
                </div>
               
            </div>
        );
    }
}

const styles = {
    input_datatime: {
        borderRadius: "5px",
        paddingLeft: "16px"
    },
    image: {
        background: "url(assets/images/icon/calendar.png)no-repeat right",
        backgroundSize: "37px"
    }
}
export default translate('common')(QuickBook);