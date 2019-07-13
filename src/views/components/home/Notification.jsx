import React from 'react';
import Base from '../../core/Base'
import './css/Notification.css';
import './css/Carousel.css';
import { translate } from 'react-i18next';
import CustomCarousel from "./CustomCarousel"

class Notification extends Base {
    constructor(props) {
        super(props);
        this.state = { bookings: [], isActive: true };
        this.mounted = true;
    }

    async componentDidMount() {
       
    }

    componentWillUnmount(){
        this.mounted = false
    }

    handleClose = () => {
        this.setState({ isActive: false })
    }

    render() {
        const { bookings, isActive } = this.state;

        if (this.mounted && isActive && bookings && (bookings.length > 0)) return (
            <div className="notification-container">
                <div className="carousel-custom">
                    <button type="button" className="close" style={{ position: "absolute", right: "10px", top: "10px", zIndex: 1500 }} aria-label="Close" onClick={this.handleClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <CustomCarousel bookings={bookings} mounted={this.mounted}/>
                </div>
            </div>
        );
        else return null
    }
}


export default translate('common')(Notification);

