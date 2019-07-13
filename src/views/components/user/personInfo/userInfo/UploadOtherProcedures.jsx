import React from 'react'
import Base from '../../../../core/Base'
import { translate } from 'react-i18next';
import { reactLocalStorage } from 'reactjs-localstorage';
import '../../css/UserInfo.css'
import { Redirect } from "react-router-dom";
import UserApi from '../../../../../actions/api/user/UserApi';
import MyUtil from '../../../../../actions/MyUtil';
import ReactLoading from 'react-loading';

class UploadOtherProcedures extends Base {

    constructor(props) {
        super(props);
        let user = reactLocalStorage.getObject("user.info", null);
        this.state = ({
            user: user,
            file: null,
            fileName: MyUtil.getImgName(user, 2, 1),
            isHover: false,
            isSave: 0,
        })
    }

    handleChangeFile = async (e) => {
        var file = e.target.files[0];
        if (file) {
            var url = URL.createObjectURL(file);
            this.setState({ fontImg: url, isSave: 1, file: file, fileName: file.name });
            await this.handleSaveFile({ file: file, proc_id: 2, proc_img_indx: 1 });
        }
    }

    onMouseEnterHandler = (e) => {
        this.setState({ isHover: true })
    }

    onMouseLeaveHandler = (e) => {
        this.setState({ isHover: false })
    }

    handleSaveFile = async (data) => {
        let result = await UserApi.uploadProcedure(data);
        console.log("user: ", result)
        if (result && result.message) alert(result.message)
        else if (result && result.code == "success")
            this.setState({
                isSave: 2,
                user: result.data,
                fileName: MyUtil.getImgName(result.data, 2, 1)
            })
        else {
            alert(this.props.t("announce.error_api"));
        }
    }

    render() {
        const t = this.props.t
        const { user, isHover, isSave, fileName } = this.state;
        if (!user) return <Redirect push to="/" />
        return (
            <div className="container-upload">
                <p className="title-info" style={{ marginTop: '30px' }}>{t('user_info.so_ho_khau.title')}</p>
                <div className="upload-shk" >
                    <span className="div-shk" >
                        <label className="btn" htmlFor="upload-shk"> {t('user_info.so_ho_khau.add')}</label>
                        <input type="file" name="photo" id="upload-shk" onChange={this.handleChangeFile} />
                    </span>
                    <span style={{display: (isSave != 1 ? "inline-block": "none")}}>{fileName}</span>
                    <div className="div-loading-shk" style={{ display: (isSave === 1) ? "inline-block" : "none" }}>
                        <ReactLoading type="bubbles" color="#00363b" width="40px" height="40px" className="react-loading react-loading-shk" />
                    </div>
                </div>
            </div>
        );
    }
}

export default translate('common')(UploadOtherProcedures);