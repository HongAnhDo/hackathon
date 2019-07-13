import React from 'react'
import Base from '../../../../core/Base'
import { translate } from 'react-i18next';

class MenuHistory extends Base {

    constructor(props) {
        super(props);
        this.state = {
            status: props.status,
            type: props.type
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.status !== this.state.status) this.setState({status: nextProps.status});
        if (nextProps.type !== this.state.type) this.setState({type: nextProps.type});
    }

    onChangeStatus = async (e, status) => {
        this.setState({status: status})
        await this.props.onChangeStatus(status)
        
    }

    onChangeType = async (e, type) => {
        this.setState({type: type})
        await this.props.onChangeType(type);
    }

    render() {
        const {status, type} = this.state
        const t = this.props.t
        return (
            <div className="row">
                {/* <div className="col-md-7 cf">
                    <div className="shadow min cc">
                        <div className="btn-group d-flex" role="group">
                            <a className={status == 3 ? "btn btn-default w-100 active" : "btn btn-default w-100" } onClick={(e) => this.onChangeStatus(e, 3)} role="button">{t('history.menu.complete')}</a>
                            <a className={status == 1 ? "btn btn-default w-100 active" : "btn btn-default w-100" } onClick={(e) => this.onChangeStatus(e, 1)} role="button">{t('history.menu.upcoming')}</a>
                            <a className={status == 2 ? "btn btn-default w-100 active" : "btn btn-default w-100" } onClick={(e) => this.onChangeStatus(e, 2)} role="button">{t('history.menu.hiring')}</a>
                            <a className={status == 4 ? "btn btn-default w-100 active" : "btn btn-default w-100" } onClick={(e) => this.onChangeStatus(e, 4)} role="button">{t('history.menu.cancelled')}</a>
                        </div>
                    </div>
                </div> */}
                <div className="col-md-12">

                    <div className="shadow min cc pull-right">
                        <div className="form-row button-radio min">
                            <div className="col-xs-6 col-sm-6 pr-none">
                                <div className="radio-custom radio-inline mt-none text-center">
                                    <input type="radio" id="grid" name="viewmode" checked={type == 1} onChange={e => this.onChangeType(e, 1)}/>
                                    <label htmlFor="grid">
                                        <div className="car">{t('history.menu.type.car')}</div>
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-6 pl-none">
                                <div className="radio-custom radio-inline mt-none text-center">
                                    <input type="radio" id="list" name="viewmode" checked={type == 2} onChange={e => this.onChangeType(e, 2)}/>
                                    <label htmlFor="list">
                                        <div className="motor">{t('history.menu.type.motor')}</div>
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {console.log("Gia tri cua t",t)}
            </div>
        )
    }
}

export default translate('common')(MenuHistory);