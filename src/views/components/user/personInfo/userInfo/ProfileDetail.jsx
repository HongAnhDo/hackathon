import React from 'react'
import Base from '../../../../core/Base'
import { translate } from 'react-i18next';
import { reactLocalStorage } from 'reactjs-localstorage';
import '../../css/UserInfo.css'
import DialogChangeInfo from './DialogChangeInfo';
import icEdit from '../../icon/ic-pen.png';
import { Redirect } from "react-router-dom";
import icCamera from "../../icon/camera.png";
import ModalUploadImage from './ModalUploadImage';
import UserApi from '../../../../../actions/api/user/UserApi';

class ProfileDetail extends Base {

    constructor(props) {
        super(props);
        let user = reactLocalStorage.getObject("user.info", null);
        this.state = ({
            isOpenMomal: false,
            user: user,
            isHover: false,
            avatar: user ? user.user_acc_img : "assets/images/avatar.jpg",
            isOpenUploadImage: false,
            isSave: 0,
        })
    }

    componentWillMount() {
        reactLocalStorage.get("menu_default", 2);
    }

    handleCloseChangeInfo = (result) => {
        var user = this.state.user;
        if (result && result.data) user = result.data
        this.setState({
            isOpenMomal: false,
            user
        })
    }

    handleOpenChangeInfo = () => {
        this.setState({
            isOpenMomal: true
        })
    }

    onMouseEnterHandlerAvatar = (e) => {
        this.setState({ isHover: true })
    }

    onMouseLeaveHandlerAvatar = (e) => {
        this.setState({ isHover: false })
    }

    handleSaveImage = async (file) => {
        let user = await UserApi.uploadAvatar(file);
        console.log("user: ", user)
        if (user && user.message) alert(user.message)
        else if (user && user.code)
            this.setState({
                isSave: 2,
                user: user.data,
                avatar: user.data.user_acc_img
            })
        else {
            alert("co loi xay ra!");
            this.setState({isOpenUploadImage: false, isSave: 0})
        }
    }

    closeUploadImage = () => {
        this.setState({ isOpenUploadImage: false, isSave: 0 })
    }

    render() {
        const t = this.props.t
        const { isOpenMomal, user, isHover, avatar, isSave, isOpenUploadImage } = this.state;
        if (!user) return <Redirect push to="/" />
        return (
            <div>
                <DialogChangeInfo
                    user={user}
                    isOpenMomal={isOpenMomal}
                    handleCloseMomal={this.handleCloseChangeInfo.bind(this)}
                />
                <ModalUploadImage
                    isOpenMomal={isOpenUploadImage}
                    isSave={isSave}
                    handleCloseMomal={this.closeUploadImage.bind(this)}
                    user={user}
                    handleSaveImage={this.handleSaveImage.bind(this)}
                />
                <div className="profile-detail-div" >
                    <div className="upload-image"
                        onMouseEnter={this.onMouseEnterHandlerAvatar}
                        onMouseLeave={this.onMouseLeaveHandlerAvatar}
                    >
                        <img className="image-user" src={avatar} />
                        <div className="div-hover" style={{ display: isHover ? "block" : "none" }}>
                            <div className="btn-upload" onClick={() => this.setState({ isOpenUploadImage: true })} >
                                <label>
                                    <img src={icCamera} className="ic-camera" />
                                    <p> {t("user_info.image.update")}</p>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginLeft: '24px' }}>
                        <p className="title-info">{t('user_info.name')}</p>
                        <p style={{ marginBottom: '10px' }}>{user.user_acc_full_name}</p>

                        <p className="title-info">{t('user_info.phone')}</p>
                        <p style={{ marginBottom: '10px' }}>{user.user_acc_phon}</p>

                        <p className="title-info">{t('user_info.email')}</p>
                        <p style={{ marginBottom: '10px' }}>{user.user_acc_emai}</p>
                    </div>
                    <button className="btn-edit" onClick={this.handleOpenChangeInfo.bind(this)}>
                        <div style={{ margin: '0 auto', display: 'inherit' }}>
                            <img src={icEdit} height="13" className="ic-edit" />
                            <p className="text-edit">{t('user_info.edit')}</p>
                        </div>
                    </button>
                </div>
            </div>
        );
    }
}

export default translate('common')(ProfileDetail);