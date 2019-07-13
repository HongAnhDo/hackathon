import MyUtil from "../MyUtil";

const DatetimeUtil = {
    getIndexTimeCurrent: (newDate) => {
        var minutesCurrent = 1;
        var hoursCurrent = newDate.getHours();
        var minutesCurrent = newDate.getMinutes();

        if (minutesCurrent >= 0 && minutesCurrent < 30) {
            minutesCurrent = 1;
        }
        else {
            minutesCurrent = 2;
        }

        return minutesCurrent + hoursCurrent * 2;
    },
    getTimeCurrent: (date) => {
        var date = new Date(date);
        var timeCurrent = "";
        var newTime = "" + date + "";
        var minutesCurrent = date.getMinutes();
        var hourCurrent = newTime.substring(16, 18);

        if (minutesCurrent == 0) {
            timeCurrent = "" + hourCurrent + ":00";
        }
        else if (minutesCurrent > 0 && minutesCurrent <= 30) {
            timeCurrent = "" + hourCurrent + ":30";
        } else {
            var hour = Number(hourCurrent) + 1;
            if (hour == 24) {
                timeCurrent = "00:00";
            } else {
                timeCurrent = "" + hour + ":00";
            }

        }

        return timeCurrent;
    },
    getListDisable: (dateTime, minDate) => {
        var listDisable = [];
        var dateSelect = new Date(dateTime);
        minDate = new Date(minDate);
        for (let i = 0; i < 48; i++) listDisable[i] = false;
        if (MyUtil.getDateFormat(dateSelect) === MyUtil.getDateFormat(minDate)) {
            var index = DatetimeUtil.getIndexTimeCurrent(new Date());
            for (let i = 0; i < index; i++)
                listDisable[i] = true;
        }

        return listDisable;
    },
    getInitalDate: (date) => {
        date = new Date(date);
        var hour = date.getHours();
        var minute = date.getMinutes();
        if (minute === 0) return date.setHours(hour, 0, 0)
        else if (minute > 0 && minute <= 30) return date.setHours(hour, 30, 0)
        else return date.setHours(hour + 1, 0, 0)
    }
}

export default DatetimeUtil
