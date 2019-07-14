import React from 'react';
import Base from '../../core/Base';
import BackgroundArea from './backgroudArea/BackgroundArea';
import UsefulArea from './UsefulArea';
import ProductArea from './ProductArea';
import MediaArea from './MediaArea';
import PartnerArea from './PartnerArea';
import { reactLocalStorage } from '../../../../node_modules/reactjs-localstorage';
import Notification from './Notification'
import createHistory from 'history/createBrowserHistory';
import Popup from './Popup';
import { HeaderSubPage } from '../HeaderSubPage'

const history = createHistory()

export default class Home extends Base {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            url: "",
            showPopup: false,
            type: "",
            isAlert: false,
        }
        this.mounted = true;
        
    }

    togglePopup = () => {
        this.setState({
            showPopup: false
        });
    }

    async componentWillMount() {
      
    }

    onChangeUrl = (typeName) => {
        var type = (typeName === "/oto") ? 1 : 2;
        this.setState({ type })
        history.replace(typeName);
    }

    getTypeByPath = () => {
        var path = window.location.pathname;
        if (path == "/oto")
            this.setState({ type: 1 })
        else if (path == "/xemay")
            this.setState({ type: 2 })
        else this.setState({ type: "" })
    }

    changeAlert = (isAlert) => {
        this.setState({ isAlert })
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        reactLocalStorage.set("booking.brand", 0)
        reactLocalStorage.setObject("booking.object", null)
        reactLocalStorage.setObject("booking.pick_up_form", null)
        reactLocalStorage.setObject("deli_address_lng", null)
        reactLocalStorage.setObject("deli_address_lat", null)
        reactLocalStorage.setObject("deli_address", null)
        reactLocalStorage.setObject("booking.vehicle", "")
        reactLocalStorage.set("booking.promotion_code", "");

        if (new Date() < new Date("2019/05/01 23:59") && new Date() >= new Date("2019/04/27 00:00")){
            this.setState({showPopup: true})
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const { cities, type, showPopup, isAlert, returnDate, rentalDate } = this.state;
        
        return (
            <div>
                <BackgroundArea
                    cities={cities}
                    onChangeUrl={this.onChangeUrl}
                    type={type}
                    isAlert={isAlert}
                    changeAlert={this.changeAlert}
                />
     
                <UsefulArea />
                <ProductArea />
                <MediaArea />
                <PartnerArea />
                <Notification />
                {showPopup ?
                    <Popup
                        text='Close Me'
                        handleClose={this.togglePopup}
                    />
                    : null}
            </div>
        );
    }
}