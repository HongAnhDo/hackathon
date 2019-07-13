import { translate } from "react-i18next";
import swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss';
import './css/AlertNotification.css';

const AlertNotification = () =>
    swal.fire({
        width: 380,
        title: "Thông báo",
        html:
            '<p style="font-size:14px;margin:15px;font-weight:400;font-family:Montserrat">' +
            '<strong>Quý khách nên đặt xe ít nhất trước <span style="color:red">12</span> tiếng để đảm bảo có xe!</strong>' +
            '</p>',
        position: 'center',
        showConfirmButton: false,
        padding: '10px',
        customClass: "alert-swal"
    });

export {AlertNotification};