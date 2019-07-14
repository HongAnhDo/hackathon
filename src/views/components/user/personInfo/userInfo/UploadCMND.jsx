import React from 'react'
import Base from '../../../../core/Base'
import { translate } from 'react-i18next';
import { reactLocalStorage } from 'reactjs-localstorage';
import '../../css/UserInfo.css'
import { Redirect } from "react-router-dom";
import ReactLoading from 'react-loading';
import MyUtil from '../../../../../actions/MyUtil';

class UploadCMND extends Base {

    constructor(props) {
        super(props);
        let user = reactLocalStorage.getObject("user.info", null);
        this.state = ({
            user: user,
            fontImgUrl: MyUtil.getImgUrl(user, 1, 1, "/assets/images/icon/font_cmnd.svg"),
            backImgUrl: MyUtil.getImgUrl(user, 1, 2, "/assets/images/icon/back_cmnd.svg"),
            isHoverFontImg: false,
            isHoverBackImg: false,
            isSaveFontImg: 0,
            isSaveBackImg: 0,
        })
    }

    handleChangeFontImg =  (e) => {
        var file = e.target.files[0];
        if (file) {
            var url = URL.createObjectURL(file);
            this.setState({ fontImgUrl: url, isSaveFontImg: 1 });
        }
    }

    handleChangeBackImg =  (e) => {
        var file = e.target.files[0];
        if (file) {
            var url = URL.createObjectURL(file);
            this.setState({ backImgUrl: url, isSaveBackImg: 1 });
        }
    }

    onMouseEnterHandlerFontImg = (e) => {
        this.setState({ isHoverFontImg: true })
    }

    onMouseLeaveHandlerFontImg = (e) => {
        this.setState({ isHoverFontImg: false })
    }

    onMouseEnterHandlerBackImg = (e) => {
        this.setState({ isHoverBackImg: true })
    }

    onMouseLeaveHandlerBackImg = (e) => {
        this.setState({ isHoverBackImg: false })
    }

    handleSaveFontImg =  (data) => {
        
    }

    handleSaveBackImg =  (data) => {
        
    }

    render() {
        const t = this.props.t
        const { user, isHoverFontImg, isHoverBackImg, isSaveFontImg, isSaveBackImg, fontImgUrl, backImgUrl } = this.state;
        if (!user) return <Redirect push to="/" />
        return (
            <div className="container-upload">
                <p className="title-info" style={{ marginTop: '30px' }}>{t('user_info.cmnd.title')}</p>
                <div className="upload-license" >
                    <div className="frames-image"
                        onMouseEnter={this.onMouseEnterHandlerFontImg}
                        onMouseLeave={this.onMouseLeaveHandlerFontImg}
                    >
                        <img src={fontImgUrl} className="frames-img" />
                        <div className="div-hover-cmnd1" style={{ display: isHoverFontImg ? "block" : "none" }}>
                            <label className="hover-license-label" htmlFor="upload-photo1">
                                <img src="assets/images/icon/ic-add.png" height='18' className="ic" htmlFor="upload-photo1" />
                                <span htmlFor="upload-photo1"> {t('user_info.cmnd.add1')}</span>
                                <input type="file" name="photo" id="upload-photo1" onChange={this.handleChangeFontImg} />
                            </label>
                        </div>
                        <div className="div-loading-cmnd1" style={{ display: (isSaveFontImg === 1) ? "block" : "none" }}>
                            <ReactLoading type="spinningBubbles" color="#00363b" width="40px" height="40px" className="react-loading react-loading-custom" />
                        </div>
                    </div>

                    <div className="frames-image"
                        onMouseEnter={this.onMouseEnterHandlerBackImg}
                        onMouseLeave={this.onMouseLeaveHandlerBackImg}
                    >
                        <img src={backImgUrl} className="frames-img" />
                        <div className="div-hover-cmnd2" style={{ display: isHoverBackImg ? "block" : "none" }}>
                            <label className="hover-license-label" htmlFor="upload-photo2">
                                <img src="assets/images/icon/ic-add.png" height='18' className="ic" htmlFor="upload-photo2" />
                                <span htmlFor="upload-photo2"> {t('user_info.cmnd.add2')}</span>
                                <input type="file" name="photo" id="upload-photo2" onChange={this.handleChangeBackImg} />
                            </label>
                        </div>
                        <div className="div-loading-cmnd2" style={{ display: (isHoverBackImg === 1) ? "block" : "none" }}>
                            <ReactLoading type="spinningBubbles" color="#00363b" width="40px" height="40px" className="react-loading react-loading-custom" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default translate('common')(UploadCMND);