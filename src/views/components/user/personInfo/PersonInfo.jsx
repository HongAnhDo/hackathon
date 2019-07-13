import React from 'react';
import Base from '../../../core/Base';
import { translate } from 'react-i18next';
import { reactLocalStorage } from 'reactjs-localstorage';
import MenuLeft from './MenuLeft';
import ChangePassword from './ChangePassword';
import ProfileDetail from './userInfo/ProfileDetail'
import PaymentInfo from './PaymentInfo'
import { Redirect } from 'react-router-dom'
import HistoryRentalList from './historyRental/HistoryRentalList';
import { USER_INFO_TABS } from "../../../../actions/constants";
import UserInfo from './userInfo/UserInfo';

class PersonInfo extends Base {

    constructor(props) {
        super(props);

        this.state = ({
            value: props.match.params.content,
            bookId: props.match.params.bookId
        })
        this.mounted = true;
    }

    componentWillMount() {
        var { value } = this.state;
        for (var i = 0; i < USER_INFO_TABS.length; i++) {
            if (value === USER_INFO_TABS[i].name) value = USER_INFO_TABS[i].id
        }
        this.setState({ value })
    }

    componentWillReceiveProps(props) {
        if (props.match.params.content !== this.state.value) {
            var value = props.match.params.content;
            for (var i = 0; i < USER_INFO_TABS.length; i++) {
                if (value === USER_INFO_TABS[i].name) value = USER_INFO_TABS[i].id
            }
            this.setState({value: value})
        }
    }

    componentWillUnmount(){
        this.mounted = false
    }

    handleChangeTab = (value) => {
        this.setState({ value: value });
    }

    render() {
        const user = reactLocalStorage.getObject("user.info", null);
        if (!user) return <Redirect push to="/" />
        const { value, bookId } = this.state;
        if (this.mounted)
        return (
            <div className="container">
                <div className="row mt-xlg mb-md">
                    <div className="col-lg-4 col-md-12">
                        <MenuLeft value={value} handleChangeTab={this.handleChangeTab} />
                    </div>
                    <div className="col-lg-8 col-md-12">
                        {value === 0 && <HistoryRentalList path={this.props.location.pathname} bookId={bookId}/>}
                        {value === 1 && <PaymentInfo />}
                        {value === 2 && <UserInfo />}
                        {value === 3 && <ChangePassword />}
                    </div>
                </div>
            </div>

        );
    }
}

export default translate('common')(PersonInfo);