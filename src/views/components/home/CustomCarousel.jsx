import { Carousel, CarouselItem } from 'reactstrap';
import React from 'react';
import Base from '../../core/Base'
import './css/Notification.css';
import './css/Carousel.css';
import MyUtil from '../../../actions/MyUtil';
import { translate } from 'react-i18next';
import LazyImage from '../../templates/customeView/LazyImage';

class CustomCarousel extends Base {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0, bookings: props.bookings };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.mounted = props.mounted;
    }

    renderItem(book) {
        const t = this.props.t
        if (book) return (
            <CarouselItem
                key={book.book_id}
                onExiting={this.onExiting}
                onExited={this.onExited} >
                <div className="carousel-custom--image">
                    <p className="item-title">
                        <span style={{ color: "#107b82" }}>{t("notification.title")} </span> <b> {book.city_name}</b>
                    </p>
                    <table className="item-content">
                        <tbody>
                            <tr>
                                <td style={{ verticalAlign: 'top' }}>
                                    <img
                                        placeholder="assets/images/placeholder.png"
                                        src={book.vhc_imgs[0] ? book.vhc_imgs[0].vhc_img_link : ""}
                                        // src_webp={book.vhc_imgs[0] ? book.vhc_imgs[0].vhc_img_web : ""}
                                        // className="image_vehicle"
                                        width={`100%`}
                                        height={`auto`}
                                        effect={"opacity"}
                                        alt={book.vhc_imgs[0] ? book.vhc_imgs[0].vhc_img_name : ""}
                                    />
                                </td>
                                <td>
                                    {book.city_name} | {book.vhc_type_name}<br />
                                    {t("notification.content.name")}: {book.cstm_name}<br />
                                    {t("notification.content.phone")}: {MyUtil.getEncodePhone(book.cstm_phon)} - {t("notification.content.price")}: <span style={{ color: '#555' }}><b>{MyUtil.currencyFormat(book.book_prie_tota)}{t("notification.content.unit")}</b></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </CarouselItem >
        ); else return <div></div>
    }


    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        var { bookings } = this.state;
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === bookings.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        var { bookings } = this.state;
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? bookings.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    render() {
        const { activeIndex, bookings } = this.state;

        const slides = bookings && (bookings.length > 0) && bookings.map((book) => {
            return this.renderItem(book)
        });

        if (this.mounted) return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
                interval={7000}
            >
                {slides}
            </Carousel>
        );
    }
}


export default translate('common')(CustomCarousel);