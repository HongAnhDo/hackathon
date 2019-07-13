import MyUtil from "../../MyUtil";
import { MyConfig } from "../../../config/Config";

const APP_ID = 'CnLvLiVJbIIfl6aQSDBX';
const APP_SECRET = 'CeoFTwBcnmALdvv809YT';
const URL_RETURN = '/payment/online_payment_response';

const encryptData = (data) => {
    return MyUtil.dec_enc("encrypt", data, APP_SECRET, APP_ID);
}

const PaymentMethod = {
    getData: (booking, typeId) => {
        var data = null;
        var amount = booking.book_prie_tota;
        var note = 'Đặt xe mã vé ' + booking.book_code;
        var bookingId = booking.book_id;
        data = { 
            chargeTypeId: parseInt(typeId),
            amount: amount,
            booking_name: note,
            url_return: MyConfig.getDomain() + URL_RETURN,
            booking_id: bookingId
        };
        console.log("data payment:", data)
        return data;
    },
    redirectPayment: (data) => {
        return  process.env.REACT_APP_DICHUNG_PAYMENT + '/api.php/partner/charge_operator?app_id='+ APP_ID + '&data=' + encryptData(data);
    }
}

export default PaymentMethod;