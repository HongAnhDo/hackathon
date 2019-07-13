import React, { PureComponent } from "react";
import { translate } from 'react-i18next';
import Base from '../../../../core/Base';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import "../../css/UserInfo.css";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ReactLoading from 'react-loading';


class ModalUploadImage extends Base {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: "",
            isOpenMomal: props.isOpenMomal,
            isSave: props.isSave,
            src: null,
            fileName: "",
            crop: {
                aspect: 1,
                width: 66,
                x: 15,
                y: 0,
            },
            croppedImageFile: null
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpenMomal !== this.state.isOpenMomal) this.setState({ isOpenMomal: nextProps.isOpenMomal })
        if (nextProps.isSave !== this.state.isSave) this.setState({ isSave: nextProps.isSave })
    }

    toggle = () => {
        this.setState({ isOpenMomal: false, croppedImageFile: null })
        this.props.handleCloseMomal();
    }

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result})
            );
            reader.readAsDataURL(e.target.files[0]);
            let fileName = this.props.user.user_acc_id + "_" + e.target.files[0].name;
            this.setState({fileName})
        }

    };

    onImageLoaded = (image, pixelCrop) => {
        this.imageRef = image;
    };

    onCropComplete = (crop, pixelCrop) => {
        this.makeClientCrop(crop, pixelCrop);
    };

    onCropChange = crop => {
        this.setState({ crop });
    };

    async makeClientCrop(crop, pixelCrop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageFile = await this.getCroppedImg(
                this.imageRef,
                pixelCrop,
                this.state.fileName,
            );
            console.log("croppedImageFile", croppedImageFile)
            this.setState({ croppedImageFile });
        }
    }

    getCroppedImg(image, pixelCrop, fileName) {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height,
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                // window.URL.revokeObjectURL(this.fileUrl);
                // this.fileUrl = window.URL.createObjectURL(blob);
                // this.file = blob;
                resolve(blob);
            }, 'image/jpeg');
        });
    }

    handleSaveImage = async () => {
        this.setState({ isSave: 1 })
        await this.props.handleSaveImage(this.state.croppedImageFile);
        this.setState({
            imgUrl: "",
            src: null
        })
    }

    render() {
        const { t } = this.props;
        const { isOpenMomal, crop, croppedImageFile, src, isSave } = this.state;

        return (
            <div>
                <Modal isOpen={isOpenMomal} style={{ width: '378px', height: 'auto' }} toggle={this.toggle}>
                    <ModalHeader className="upload-image-header" toggle={this.toggle}>
                        <p className="title-normal">{t("user_info.image.title")}</p>
                    </ModalHeader>

                    <ModalBody >
                        {isSave === 0 ?
                            <div >
                                <div className="box">
                                    <input type="file" style={{ display: "block" }} id="avatar" className="input-file" onChange={this.onSelectFile} />
                                    <label htmlFor="avatar" className="btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                                            <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                                        </svg>
                                        <span> {t("user_info.image.action")} </span>
                                    </label>
                                </div>
                                {src && (
                                    <ReactCrop
                                        src={src}
                                        crop={crop}
                                        onImageLoaded={this.onImageLoaded}
                                        onComplete={this.onCropComplete}
                                        onChange={this.onCropChange}
                                    />
                                )}
                            </div>
                            : isSave === 1 ? <ReactLoading type="bubbles" color="#00363b" className="react-loading" />
                                : <div className="upload-body">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ verticalAlign: "middle" }}><path style={{ fill: '#00363b' }} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                                    <span style={{ marginLeft: 2, verticalAlign: 'middle' }}>{t("user_info.image.success")}</span>
                                </div>
                        }
                        {croppedImageFile && (isSave !== 2) && (
                            <div className="div-btn-upload-img">
                                {/* <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} /> */}
                                <button className="btn btn-upload-img" onClick={this.handleSaveImage}> Cập nhật </button>
                            </div>
                        )}
                        {isSave === 2 &&
                            <div className="div-btn-upload-img">
                                <button className="btn btn-upload-img" onClick={this.toggle} > Hoàn tất </button>
                            </div>
                        }
                    </ModalBody>
                    <ModalFooter style={{ display: "none" }}>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default translate('common')(ModalUploadImage);