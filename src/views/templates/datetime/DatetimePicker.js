import React from 'react';
import Base from '../../core/Base';

export default class DatetimePicker extends Base {
    constructor(props) {
        super(props);
    }

    handleFocus = () => {

    }

    render() {
        const {id, placeholder, style, defaultValue} = this.props
        return (
            <div className="controls input-append date form_datetime"
                data-date-format="dd/mm/yyyy hh:ii" id={id}
                data-link-field="dtp_input2"
                data-link-format="yyyy-mm-dd hh-ii">
                <input size="16" type="text" defaultValue={defaultValue} style={style} id={"input_"+ id}
                    placeholder={placeholder} onFocus={this.handleFocus} />
                <span className="add-on"><i className="icon-remove"></i></span>
                <span className="add-on"><i className="icon-th"></i></span>
            </div>
        );
    }
}
