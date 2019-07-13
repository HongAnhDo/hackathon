import React from 'react'
import Base from '../../../../core/Base'
import { translate } from 'react-i18next';
import { reactLocalStorage } from 'reactjs-localstorage';
import '../../css/UserInfo.css'
import { Redirect } from "react-router-dom";
import UserApi from '../../../../../actions/api/user/UserApi';
import MyUtil from '../../../../../actions/MyUtil';
import ReactLoading from 'react-loading';

class UploadLicense extends Base {

    constructor(props) {
        super(props);
        let user = reactLocalStorage.getObject("user.info", null);
        this.state = ({
            user: user,
            fontImg: MyUtil.getImgUrl(user, 3, 1, "/assets/images/icon/font_cmnd.svg"),
            backImg: MyUtil.getImgUrl(user, 3, 2, "/assets/images/icon/back_cmnd.svg"),
            isSaveFontImg: 0,
            isSaveBackImg: 0,
            isHoverFontImg: false,
            isHoverBackImg: false
        })
    }

    handleChangeFontImg = async (e) => {
        var file = e.target.files[0];
        if (file) {
            var url = URL.createObjectURL(file);
            this.setState({ fontImg: url, isSaveFontImg: 1 });
            await this.handleSaveFontImage({ file: file, proc_id: 3, proc_img_indx: 1 })
        }
    }

    handleChangeBackImg = async (e) => {
        var file = e.target.files[0];
        if (file) {
            var url = URL.createObjectURL(file);
            this.setState({ backImg: url, isSaveBackImg: 1 });
            await this.handleSaveBackImage({ file: file, proc_id: 3, proc_img_indx: 2 })
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

    handleSaveFontImage = async (data) => {
        let result = await UserApi.uploadProcedure(data);
        if (result && result.message) alert(result.message)
        else if (result && result.code == "success") {
            this.setState({
                isSaveFontImg: 2,
                user: result.data,
                fontImg: MyUtil.getImgUrl(result.data, 3, 1, "/assets/images/icon/font_cmnd.svg")
            })
        }
        else alert(this.props.t("announce.error_api"));
    }

    handleSaveBackImage = async (data) => {
        let result = await UserApi.uploadProcedure(data);
        console.log("user: ", result)
        if (result && result.message) alert(result.message)
        else if (result && result.code == "success")
            this.setState({
                isSaveBackImg: 2,
                user: result.data,
                backImg: MyUtil.getImgUrl(result.data, 3, 2, "/assets/images/icon/back_cmnd.svg")
            })
        else alert(this.props.t("announce.error_api"));
    }

    render() {
        const t = this.props.t
        const { user, isHoverFontImg, isHoverBackImg, isSaveFontImg, isSaveBackImg, fontImg, backImg } = this.state;
        if (!user) return <Redirect push to="/" />
        return (
            <div className="container-upload">
                <p className="title-info" style={{ marginTop: '30px' }}>{t('user_info.license.title')}</p>
                <div className="upload-license" >
                    <div className="frames-image"
                        onMouseEnter={this.onMouseEnterHandlerFontImg}
                        onMouseLeave={this.onMouseLeaveHandlerFontImg}
                    >
                        <img src={fontImg} className="frames-img" />
                        <div className="div-hover-license1" style={{ display: isHoverFontImg ? "block" : "none" }}>
                            <label htmlFor="upload-license1" className="hover-license-label">
                                <img src="assets/images/icon/ic-add.png" height='18' className="ic" htmlFor="upload-license1" />
                                <label htmlFor="upload-license1"> {t('user_info.license.add1')}</label>
                                <input type="file" name="photo" id="upload-license1" onChange={this.handleChangeFontImg} />
                            </label>
                        </div>
                        <div className="div-loading1" style={{ display: (isSaveFontImg === 1) ? "block" : "none" }}>
                            <ReactLoading type="spinningBubbles" color="#00363b" width="40px" height="40px" className="react-loading react-loading-custom" />
                        </div>
                    </div>

                    <div className="frames-image"
                        onMouseEnter={this.onMouseEnterHandlerBackImg}
                        onMouseLeave={this.onMouseLeaveHandlerBackImg}
                    >
                        <img src={backImg} className="frames-img" />
                        <div className="div-hover-license2" style={{ display: isHoverBackImg ? "block" : "none" }}>
                            <label className="hover-license-label" htmlFor="upload-license2">
                                <img src="assets/images/icon/ic-add.png" height='18' className="ic" htmlFor="upload-license2" />
                                <label htmlFor="upload-license2"> {t('user_info.license.add2')}</label>
                                <input type="file" name="photo" id="upload-license2" onChange={this.handleChangeBackImg} />
                            </label>
                        </div>
                        <div className="div-loading2" style={{ display: (isSaveBackImg === 1) ? "block" : "none" }}>
                            <ReactLoading type="spinningBubbles" color="#00363b" width="40px" height="40px" className="react-loading react-loading-custom" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default translate('common')(UploadLicense);