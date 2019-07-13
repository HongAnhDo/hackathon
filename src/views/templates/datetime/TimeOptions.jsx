import React, { Component } from 'react';
import './Time.css'

class TimeOptions extends Component {

  constructor(props) {
    super(props)

    this.state = {
      value: props.valueTimeDefault,
      isDisabale: "disabled",
      listDisable: props.listDisable,
      listOption: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentWillMount() {
    await this.getListOption();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.valueTimeDefault,
      listDisable: nextProps.listDisable
    }, () => {
      this.getListOption();
    });
  }

  handleChange = (event) => {
    var value = event.target.value;
    this.setState({ value: value });
    if (this.props.handleChange) {
      this.props.handleChange(value);
    }
  };

  getListOption() {
    var list = ["00", "30"];
    var listOption = [];
    var Options = [];

    for (let i = 0; i < 24; i++) {
      let hour = i < 10 ? "0" + i : i;
      for (let j = 0; j < list.length; j++) {
        listOption.push(hour + ":" + list[j]);
      }
    }
    for (let i = 0; i < listOption.length; i++) {
        Options.push(<option value={listOption[i]} key={i} disabled={this.state.listDisable[i]}>{listOption[i]}</option>)

    }

    this.setState({ listOption: Options });
  }

  render() {
    var listDisable = this.state.listDisable;
    const { listOption } = this.state.listOption;

    return (
      <div className="contentTime">
        <select
          id="time-select"
          value={this.state.value}
          onChange={this.handleChange}
          className="contentTime"
        >
          {this.state.listOption}
        </select>
      </div>
    );
  }
}

export default TimeOptions;