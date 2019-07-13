import React, { Component } from 'react';
import './css/Popup.css'

export default class Popup extends Component {
    constructor(props) {
        super(props)
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.handleClose()
        }
    }
    handleClose = () => {
        this.props.handleClose();
    }
    render() {
        return (
            <div className='popup' >
                <div className='popup_inner' style={{ backgroundImage: 'url(assets/images/popup.jpg)' }} ref={this.setWrapperRef}>
                    <div className="btn-close-popup" onClick={this.handleClose}>x</div>
                    <div className="title-popup">THÔNG BÁO LỊCH NGHỈ LỄ 30/4 - 1/5 </div>
                    <div className ="content-popup"><b>hackathon</b> xin thông báo tới Quý khách hàng về thời gian nghỉ lễ 30/4 - 1/5<br/>
                        Nghỉ từ ngày <b>28/4/2019</b> đến hết ngày <b>01/05/2019</b><br/>
                        Làm việc trở lại Thứ Năm ngày 02/05/2019<br/><br/>
                        Nếu quý khách cần hỗ trợ <br/>
                        trong khoảng thời gian này, vui lòng liên hệ qua<br/>
                        email <b>contact@hackathon.vn</b>.<br/><br/>

                        Trân trọng thông báo!
                    </div>

                </div>
            </div>
        );
    }
}
