import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import { start } from 'repl';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class DatePickerCustom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    var { startDate, endDate, placeholder, minDate } = this.props
    startDate = startDate ? new Date(startDate) : ""
    endDate = endDate ? new Date(endDate) : ""
    minDate = minDate ? new Date(minDate) : new Date()
    return
    <DatePicker
      selected={this.state.startDate}
      onChange={this.handleChange}
      startDate={startDate ? moment(startDate) : moment()}
      endDate={endDate ? moment(endDate) : null}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={30}
      dateFormat="DD/MM/YYYY HH:mm"
      timeCaption="Time"
      placeholderText={placeholder}
      minDate={minDate ? moment(minDate) : moment()}
    />;
  }
}

export default DatePickerCustom;