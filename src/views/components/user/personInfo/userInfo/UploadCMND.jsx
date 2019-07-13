import React from 'react'
import Base from '../../../../core/Base'
import { translate } from 'react-i18next';
import { reactLocalStorage } from 'reactjs-localstorage';
import '../../css/UserInfo.css'
import { Redirect } from "react-router-dom";
import UserApi from '../../../../../actions/api/user/UserApi';
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

    handleChangeFontImg = async (e) => {
        var file = e.target.files[0];
        if (file) {
            var url = URL.createObjectURL(file);
            this.setState({ fontImgUrl: url, isSaveFontImg: 1 });
            await this.handleSaveFontImg({ file: file, proc_id: 1, proc_img_indx: 1 });
        }
    }

    handleChangeBackImg = async (e) => {
        var file = e.target.files[0];
        if (file) {
            var url = URL.createObjectURL(file);
            this.setState({ backImgUrl: url, isSaveBackImg: 1 });
            await this.handleSaveBackImg({ file: file, proc_id: 1, proc_img_indx: 2 });
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

    handleSaveFontImg = async (data) => {
        let result = await UserApi.uploadProcedure(data);
        if (result && result.message) {
            alert(result.message);
            this.setState({ isSaveFontImg: 0 })
        }
        else if (result && result.code === "success")
            this.setState({
                isSaveFontImg: 2,
                user: result.data,
                fontImgUrl: MyUtil.getImgUrl(result.data, 1, 1, "/assets/images/icon/font_cmnd.svg")
            })
        else {
            alert(this.props.t("announce.error_api"));
        }
    }

    handleSaveBackImg = async (data) => {
        let result = await UserApi.uploadProcedure(data);
        if (result && result.message) {
            alert(result.message);
            this.setState({ isSaveBackImg: 0 })
        }
        else if (result && result.code == "success")
            this.setState({
                isSaveBackImg: 2,
                user: result.data,
                backImgUrl: MyUtil.getImgUrl(result.data, 1, 2, "/assets/images/icon/back_cmnd.svg")
            })
        else {
            alert(this.props.t("announce.error_api"));
        }
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