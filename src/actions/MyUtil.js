import { reactLocalStorage } from "reactjs-localstorage";
import CryptoJS from "crypto-js";
import url from "locutus/php/url";

var crypto = require("crypto")

const MyUtil = {
    currencyFormat: function (curency) {
        return curency.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    },
    subStringCurrency: function (curency) {
        return curency.substr(0, curency.length - 1);
    },
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getDateFormat: function (date) {
        date = new Date(date);
        var { day, month } = MyUtil.getMonthDay(date);
        return (day + '/' + month + '/' + date.getFullYear());
    },
    getDateFormatUs: function (date) {
        date = new Date(date);
        var { day, month } = MyUtil.getMonthDay(date);
        return (day + '/' + day + '/' + date.getFullYear());
    },
    getDateFormatEn: function (date) {
        var { day, month } = MyUtil.getMonthDay(date);
        return (month + '/' + day + '/' + date.getFullYear());
    },
    getDatetimeFormat: function (datetime) {
        var date = new Date(datetime);
        var { day, month } = MyUtil.getMonthDay(date);
        var { hour, minute } = MyUtil.getHourMinute(date);
        return (hour + ":" + minute + " " + day + '/' + month + '/' + date.getFullYear());
    },
    getDatetimeFormatCrta: function (date) {
        var { day, month } = MyUtil.getMonthDay(date);
        var { hour, minute } = MyUtil.getHourMinute(date);
        return (hour + ":" + minute + " " + day + '-' + month + '-' + date.getFullYear());
    },
    getDatetimeFormatEn: function (date) {
        var { day, month } = MyUtil.getMonthDay(date);
        var { hour, minute } = MyUtil.getHourMinute(date);
        return (date.getFullYear() + '-' + month + '-' + day + " " + hour + ":" + minute);
    },
    getDateByDateFormat: function (dateStr) {
        dateStr = dateStr.toString();
        var hour = dateStr.substr(0, 2);
        var minute = dateStr.substr(3, 2);
        var day = dateStr.substr(6, 2);
        var month = dateStr.substr(9, 2);
        var year = dateStr.substr(12, 4);
        var date = new Date(year, month - 1, day, hour, minute);
        return date;

    },
    getReturnDateByRentalDate: function (date) {
        var returnDate = new Date(date);
        returnDate.setDate(returnDate.getDate() + 1);
        returnDate.setHours(19, 0, 0)
        return returnDate
    },
    getDateRangeFormat: function (start, end) {
        var startDate = MyUtil.getDatetimeFormat(new Date(start));
        var endDate = MyUtil.getDatetimeFormat(new Date(end));
        return startDate + " - " + endDate
    },
    getMinDateByDate: function (date) {
        var minDate = new Date(date);
        if (minDate.getHours() > 16) {
            minDate.setDate(minDate.getDate() + 1)
            minDate.setHours(6, 0, 0)
        } else minDate.setHours(minDate.getHours() + 6);
        return minDate
    },
    formatVehicleName: (name) => {
        var i = 0, strLength = name.length;
        for (i; i < strLength; i++) {
            name = name.replace(" ", "-");
        }
        return name
    },
    getVehicleName: (name) => {
        var i = 0, strLength = name.length;
        for (i; i < strLength; i++) {
            name = name.replace("-", " ");
        }
        return name
    },
    rangePrice: (price_from, price_to) => {
        return (MyUtil.currencyFormat(price_from) + " VNĐ" + " - " + MyUtil.currencyFormat(price_to) + " VNĐ")
    },
    formatMoney: (value) => {
        var price_from = value[0] * 15000;
        var price_to = value[1] * 15000;
        price_from = price_from.toLocaleString(
            'de-DE',
            { minimumFractionDigits: 0 }
        );

        price_to = price_to.toLocaleString(
            'de-DE',
            { minimumFractionDigits: 0 }
        );

    },
    sortVehicle: (vehicles) => {
        let arr = vehicles.slice().sort(
            function (a, b) {
                var price_1 = parseInt(a.vhc_part_defa_prie)
                var price_2 = parseInt(b.vhc_part_defa_prie)
                return (price_1 > price_2) ? 1 : (price_1 < price_2) ? -1 : 0;
            });

        return arr;
    },
    sortVehicleStar: (vehicles) => {
        let arr = vehicles.slice().sort(
            function (a, b) {
                var price_1 = parseFloat(a.vhc_part_star)
                var price_2 = parseFloat(b.vhc_part_star)
                return (price_1 > price_2) ? 1 : (price_1 < price_2) ? -1 : 0;
            });

        return arr;
    },
    checkDate: () => {
        var start = reactLocalStorage.get("booking.rental_date");
        var end = reactLocalStorage.get("booking.return_date");
        var startDate = new Date(start).getTime();
        var endDate = new Date(end).getTime();
        var now = new Date().getTime();
        if ((startDate < now) || (endDate < now) || (startDate > endDate)) {
            reactLocalStorage.set("booking.rental_date", "");
            reactLocalStorage.set("booking.return_date", "");
        }
    },
    getDetailPrice: (data) => {
        var price = {
            dayPrice: {
                unit: 0,
                quantity: 0,
                price: 0
            },
            wdayPrice: {
                unit: 0,
                quantity: 0,
                price: 0
            },
            holiPrice: {
                unit: 0,
                quantity: 0,
                price: 0
            },
            dayPackPrice: {
                unit: 0,
                quantity: 0,
                price: 0
            },
            promoPrice: {
                unit: 0,
                quantity: 0,
                price: 0
            },
            deliPrice: {
                unit: 0,
                quantity: 0,
                price: 0
            },
            sumPrice: 0,
            extraFee: 0
        }
        if (data && data.price_total) {
            price.sumPrice = data.price_total;
            var booking_price_details = data.booking_price_details;
            if (booking_price_details && booking_price_details.length > 0) {
                for (let i = 0; i < booking_price_details.length; i++) {
                    var priceTypeCode = booking_price_details[i].book_prie_type.book_prie_type_code;
                    switch (priceTypeCode) {
                        case "DAY_PRICE": {
                            price.dayPrice.quantity = booking_price_details[i].prie_type_qaty;
                            price.dayPrice.unit = booking_price_details[i].unit_prie;
                            price.dayPrice.price = booking_price_details[i].detl_prie_tota;
                            break;
                        }
                        case "WDAY_PRICE": {
                            price.wdayPrice.quantity = booking_price_details[i].prie_type_qaty;
                            price.wdayPrice.unit = booking_price_details[i].unit_prie;
                            price.wdayPrice.price = booking_price_details[i].detl_prie_tota;
                            price.extraFee += price.wdayPrice.price
                            break;
                        }
                        case "HOLI_PRICE": {
                            price.holiPrice.quantity = booking_price_details[i].prie_type_qaty;
                            price.holiPrice.unit = booking_price_details[i].unit_prie;
                            price.holiPrice.price = booking_price_details[i].detl_prie_tota;
                            price.extraFee += price.holiPrice.price
                            break;
                        }
                        case "DAYPACK_PRICE": {
                            price.dayPackPrice.quantity = booking_price_details[i].prie_type_qaty;
                            price.dayPackPrice.unit = booking_price_details[i].unit_prie;
                            price.dayPackPrice.price = booking_price_details[i].detl_prie_tota;
                            break;
                        }
                        case "PROMO_PRICE": {
                            price.promoPrice.quantity = booking_price_details[i].prie_type_qaty;
                            price.promoPrice.unit = booking_price_details[i].unit_prie;
                            price.promoPrice.price = booking_price_details[i].detl_prie_tota;
                            break;
                        }
                        case "DELI_PRICE": {
                            price.deliPrice.quantity = booking_price_details[i].prie_type_qaty;
                            price.deliPrice.unit = booking_price_details[i].unit_prie;
                            price.deliPrice.price = booking_price_details[i].detl_prie_tota;
                            break;
                        }
                    }
                }
            }

        }
        return price
    },
    getMonthDay(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        if (day < 10)
            day = "0" + day;
        if (month < 10)
            month = "0" + month;
        return { day, month };
    },
    getHourMinute(date) {
        var hour = date.getHours();
        var minute = date.getMinutes();
        if (hour < 10) hour = "0" + hour;
        if (minute < 10) minute = "0" + minute;
        return { hour, minute }
    },
    getEncodePhone(phone){
        return phone.substr(0, 3) + "xxx" + phone.substr(6, phone.length - 6); 
    },
    cutDateTime(date){
        var time = date.slice(0,5);
        var day = date.slice(6, date.length);
        return[time, day]
    },
    checkTetHoliday (rentalDate, returnDate) {
        var minDate = new Date('00:00 04/27/2019');
        var maxDate = new Date('23:59 05/01/2019');

        var returnD = new Date(returnDate)
        var rentalD = new Date(rentalDate)

        if (!rentalDate || !returnDate) return false

        var checkRentalDate = (rentalD >= minDate) && (rentalD <= maxDate);
        var checkReturnDate = (returnD >= minDate) && (returnD <= maxDate);

        if (checkRentalDate || checkReturnDate) return true
        else return false
    },
    getImgUrl: (data, procId, procIndex, urlDefault) => {
        if (!data) return urlDefault;
        else {
            let userImgs = data.user_imgs;
            if (userImgs && userImgs.length > 0){
                for (let i = 0; i < userImgs.length; i++){
                    if ((userImgs[i].proc_id == procId) && (userImgs[i].proc_img_indx == procIndex)){
                        return userImgs[i].user_img_url
                    }
                }
            } 
            return urlDefault;
        }
    },
    getImgName: (data, procId, procIndex) => {
        if (!data) return "";
        else {
            let userImgs = data.user_imgs;
            if (userImgs && userImgs.length > 0){
                for (let i = 0; i < userImgs.length; i++){
                    if ((userImgs[i].proc_id == procId) && (userImgs[i].proc_img_indx == procIndex)){
                        return userImgs[i].user_img_name
                    }
                }
            } 
            return "";
        }
    },
    isSmallScreen: () => {
		if (matchMedia('only screen and (max-width: 991px)').matches) {
			return true;
		}
		return false;
    },
    dec_enc(action, data, secret_app, secret_id) {
        var output;
        var key = CryptoJS.SHA256(secret_app).toString();
        var id = CryptoJS.SHA256(secret_id).toString().substr(0, 16);

        if (action === 'encrypt') {
            var encrypt = this.encrypt(JSON.stringify(data), key.substr(0,32), id);
            output = url.base64_encode(encrypt);

        } 
        else if (action === "decrypt") {
            var decrypt = url.base64_decode(data);
            output = this.decrypt(decrypt, key.substr(0, 32), id )
        }

        return output;
    },
    encrypt(data, key, iv) {
        var cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(key), iv);
        var crypted = cipher.update(new Buffer(data, "utf-8"), "utf-8", "base64");
        crypted += cipher.final("base64");

        return crypted.toString(CryptoJS.enc.Base64);
    },
    decrypt(data, key, iv) {
        var decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(key), iv);
        var decrypted = decipher.update(data, 'base64', 'utf-8');
        decrypted += decipher.final('utf-8');

        return decrypted;
    }

}

export default MyUtil;
