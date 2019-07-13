import React, { Component } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
// import 'bootstrap/dist/css/bootstrap.css';
// // you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
import './daterangepicker.css'
import MyUtil from '../../../actions/MyUtil';
import DatetimeUtil from '../../../actions/datetime/DatetimeUtil';
var moment = require("moment")

export default class DatetimeCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
  }

  componentWillMount() {
    var { startDate, endDate, singleDatePicker, isFocus, timePicker } = this.props;
    var value = "";
    if (singleDatePicker && !timePicker) value = startDate || endDate ? MyUtil.getDateFormat(new Date(startDate || endDate)) : ""
    else if (singleDatePicker && timePicker) value = startDate || endDate ? MyUtil.getDatetimeFormat(new Date(startDate || endDate)) : ""
    else value = startDate && endDate ? MyUtil.getDateRangeFormat(startDate, endDate) : "";
    if (isFocus) this.input.focus()
    this.setState({ value })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {

      var { startDate, endDate, singleDatePicker, isFocus, timePicker } = nextProps;
      var value = "";
      if (singleDatePicker && !timePicker) value = startDate || endDate ? MyUtil.getDateFormat(new Date(startDate || endDate)) : ""
      else if (singleDatePicker && timePicker) value = startDate || endDate ? MyUtil.getDatetimeFormat(new Date(startDate || endDate)) : ""
      else value = startDate && endDate ? MyUtil.getDateRangeFormat(startDate, endDate) : "";
      this.setState({ value })
      if (isFocus) this.input.focus()
    }
  }


  onShow = (e) => {
    console.log("onShow", e)
  }
  onApply = (e, picker) => {
    var { singleDatePicker } = this.props
    var startDate = picker.startDate._d;
    var endDate = picker.endDate._d;
    console.log("startDate", startDate);
    console.log("endDate", endDate);
    var value = "";
    if (singleDatePicker) value = MyUtil.getDateFormat(new Date(startDate || endDate))
    else value = MyUtil.getDateRangeFormat(startDate, endDate)
    this.handleChange(value);
    this.props.handleChange(startDate, endDate)
  }

  handleChange = (value) => {
    this.setState({ value })
  }

  render() {
    var { startDate, endDate, singleDatePicker, minDate, placeholder, style, timePicker, isFocus } = this.props;
    const { value } = this.state

    console.log("startDate", startDate);
    new Date(DatetimeUtil.getInitalDate(new Date()))
    var locale = {
      direction: 'ltr', // : 'ltr'
      format: 'DD/MM/YYYY HH:mm',
      separator: ' - ',
      daysOfWeek: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
      monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      firstDay: 1,
      applyLabel: 'OK',
      cancelLabel: 'Hủy',
    }
    return (
      <DateRangePicker
        containerClass="container_datetime"
        startDate={startDate && startDate !== "" ? new Date(startDate) : new Date(DatetimeUtil.getInitalDate(new Date()))}
        endDate={endDate && endDate !== "" ? new Date(endDate) : ""}
        minDate={minDate ? moment(new Date(minDate)) : moment(new Date(DatetimeUtil.getInitalDate(new Date())))}
        autoApply={true}
        singleDatePicker={singleDatePicker}
        timePicker={timePicker}
        timePicker24Hour={false}
        timePickerIncrement={30}
        timePickerSeconds={false}
        rtl={false}
        alwaysShowCalendars={false}
        linkedCalendars={true}
        autoUpdateInput={true}
        showCustomRangeLabel={false}
        opens="right"
        drops="down"
        singleDatePicker={singleDatePicker}
        // onCancel={this.onCancel()}
        // onEvent={this.handleEvent}
        onApply={this.onApply}
        locale={locale}

      // onHideCalendar={this.onHideCalendar()}
      // onShow={this.onShow}
      // onShowCalendar={this.onShowCalendar()}
      >
        <input type="text" className="form-control"
          placeholder={placeholder}
          onChange={this.handleChange}
          value={value}
          style={style}
          ref={(input) => { this.input = input; }}
        />
      </DateRangePicker>

    );
  }
}