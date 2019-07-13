// widget / _js_form_gender_independency.html-- >< !--widget / _js_gender_datetime_picker.html
$.nameToId = function (name) {
    name = name.replace('[', '_');
    name = name.replace(']', '');
    return name;
};

$.callbackIfNotExists = function (id, callback) {
    if ($('#' + id).size() === 0) {
        callback();
    }
}; 

var MyFlatDateTimePicker = {};

$.genderDatetimePicker = function (params, closeCallback, onOpenCallback) {

    params = $.extend({
        form_id: 'booking_form',
        datetime_name: 'data[depart_time]',
        gender_datetime_to: '.gender_date_time',
        min_date: '',
        inline: false,
        requestDateTime: ''
    }, params);

    function callCalendarFunc(func) {
         
        for (var k in MyFlatDateTimePicker) {
            if (MyFlatDateTimePicker[k][func]) {
                MyFlatDateTimePicker[k][func]();
            }
        }
        
    }

    $.callbackIfNotExists(
        $.nameToId(params.datetime_name),
        function () {
            $('<input>')
                .appendTo($(params.gender_datetime_to))
                .attr({
                    name: params.datetime_name,
                    id: $.nameToId(params.datetime_name),
                    class: 'form-control',
                    type: 'text',
                    placeholder: 'Thời gian đón'
                });

            $(params.gender_datetime_to).prepend('<span class="input-group-addon"><i class="fa fa-calendar"></i></span>');

        }
    );
    var requestDateTime = params.requestDateTime || '';
    var requestTime = [];
    var requestDate = [];
    if (requestDateTime) {
        requestTime = requestDateTime.split(' ')[0];
        requestTime = requestTime.split(':');
        requestDate = requestDateTime.split(' ')[1];
        requestDate = requestDate.split('/');
    }
    Flatpickr.l10ns.default = Object.create(Flatpickr.l10ns.vn);

    var minuteStep = 30;
    var time = 1000 * 60 * minuteStep;
    var minDateTime;
    if (params.min_date) {
        var date = new Date(params.min_date);
        minDateTime = (date.getTime() % time) == 0 ? new Date(date.getTime()) : new Date(date.getTime() + time - (date.getTime() % time));
    }
    else {
        var date = new Date();
        minDateTime = (date.getTime() % time) == 0 ? new Date(date.getTime()) : new Date(date.getTime() + time - (date.getTime() % time));
    }

    var onClose = [resetFullscreen];
    if (closeCallback) {
        onClose.push(closeCallback);
    }
    var datePickerId = params.form_id+'_'+$.nameToId(params.datetime_name);
    if(MyFlatDateTimePicker[datePickerId] && MyFlatDateTimePicker[datePickerId]['destroy']) {
         
        MyFlatDateTimePicker[datePickerId].destroy();
    }

    var defaultDate = requestDateTime ? (new Date(requestDate[2], requestDate[1] - 1, requestDate[0], requestTime[0], requestTime[1])) : new Date();
    defaultDate = (defaultDate.getTime() % time) == 0 ? new Date(defaultDate.getTime()) : new Date(defaultDate.getTime() + time - (defaultDate.getTime() % time));
    
    MyFlatDateTimePicker[datePickerId] = flatpickr("#" + $.nameToId(params.datetime_name), {
        defaultDate: defaultDate ,
        defaultHour: 7,
        minDate: minDateTime,
        minuteIncrement: minuteStep,
        dateFormat: 'H:i d/m/Y',
        time_24hr: true,
        enableTime: true,
        disableMobile: true,
        onValueUpdate: function () {
            setTimeout(function() {
                updateCell();
                showCloseAndTimeTitleAndSelectTime();
            }, 100);
            
        },
        onOpen: [updateInputToSelect, appendClose, updateCell, fixFullScreen, onOpenCallback],
        onClose: onClose,
        onMonthChange: [updateCell],
        onReady: [],
        inline: params.inline,
        static: isMobile()
    });

    $('.flatpickr-calendar .numInputWrapper input').attr('readonly', '');

    var firstOpenFullscreeen = true;
    function openFullscreeen() {
        if (isMobile()) {
            if (firstOpenFullscreeen) {
                firstOpenFullscreeen = false;
                $('body').append(
                    '<style>' +
                    '.flatpickr-calendar.open {top: 0 !important; left: 0 !important; borderRadius: 0 !important; width: 100% !important; height: 100% !important;}' +
                    '.flatpickr-calendar .flatpickr-days { width: 100% !important}' +
                    '</style>');
            }
        }
    }

    function isMobile() {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    function resetFullscreen() {
        if (isMobile()) {
            $('body').removeAttr('style');
            $('.flatpickr-calendar').removeAttr('style');
        }
    }

    function fixFullScreen() {
        if (isMobile()) {
            $('body').attr('style', 'position: fixed; overflow-y: hidden; text-size-adjust: 100%; width: 100%; min-height: 100%; margin: 0px;');
            $('#header').css({"z-index" : 1 })
        }
    }

    function showCloseAndTimeTitleAndSelectTime() {
        $('.flatpickr-close, .flatpickr-time-title, #flatpickr_datetime').removeClass('hide');
    }

    function appendClose() {
        if ($('.flatpickr-calendar.open .flatpickr-close').size() == 0) {
            $('<div class="flatpickr-close bg_blue_gradient hide"><i class ="fa fa-check"></i></div>')
                .appendTo($('.flatpickr-calendar.open'));
            $('.flatpickr-calendar.open .flatpickr-close').click(function () {
                MyFlatDateTimePicker[datePickerId].close();
                $('#header').css("z-index", 300);
            });
        }
    }

    function disableLessEqualMinTime() {
        $('.flatpickr-calendar.open #flatpickr_datetime option').removeAttr('disabled');
        var minMonth = minDateTime.getMonth() + 1;
        if (minMonth < 10) {
            minMonth = '0' + minMonth;
        }
        var minDay = minDateTime.getDate();
        if (minDay < 10) {
            minDay = '0' + minDay;
        }
        var minDate = minDateTime.getFullYear() + '-' + minMonth + '-' + minDay;
        var selectedDateTime = getInputDateTime().date;
        if (selectedDateTime) {
            var selectedDates = selectedDateTime.split('/');
            var selectedDate = selectedDates[2] + '-' + selectedDates[1] + '-' + selectedDates[0];
            if (selectedDate == minDate) {
                var minHour = minDateTime.getHours();
                minHour = minHour < 10 ? '0' + minHour : minHour;
                var minMinute = minDateTime.getMinutes();
                minMinute = minMinute < 10 ? '0' + minMinute : minMinute;

                $('.flatpickr-calendar.open #flatpickr_datetime option').each(function () {

                    if ($(this).attr('value') < minHour + ':' + minMinute) {
                        $(this).attr('disabled', '')
                    }
                });
            }
        }
    }
    function updateInputToSelect() {
          
            if ($('.flatpickr-calendar.open #flatpickr_datetime').size() == 0) {
                
                $('<div class="flatpickr-time-title hide" >Giờ đón</div>')
                    .insertAfter($('.flatpickr-calendar.open .flatpickr-innerContainer'));
                
                var divDatetime = $('.flatpickr-calendar.open .flatpickr-time.time24hr');
                
                divDatetime.find('div,span').hide();
               
                $('<select id="flatpickr_datetime" class="numInput flatpickr-minute hide">' + rangeOptions(getInputDateTime().time) + '</select>').change(function () {
                    var hourSecondVal = $(this).val();
                    $('#' + $.nameToId(params.datetime_name)).val(hourSecondVal + ' ' + getInputDateTime().date);
    
                    var hourSecond = hourSecondVal.split(':');
                    $('.flatpickr-calendar.open .numInput.flatpickr-hour').val(hourSecond[0]);
                    $('.flatpickr-calendar.open .numInput.flatpickr-minute').val(hourSecond[1]);
                    updateTextToCloseBtn();
                     
                }).prependTo(divDatetime);
            } 
        
    }

    function updateCell() {
        
        if ($('.flatpickr-day.nextMonthDay').size() >= 7) {
            for (var i = 0; i < 7; i++) {
                $('.flatpickr-day.nextMonthDay').last().remove();
            }
        }
        $('.flatpickr-calendar .nextMonthDay').text('');
        $('.flatpickr-calendar .flatpickr-day')
            .not('.nextMonthDay')
            .last()
            .next()
            .css({
                'visibility': 'inherit',
                'border-bottom': 'none'
            })
            .text('');

        var fDatetime = $('.flatpickr-calendar.open #flatpickr_datetime');
        if (fDatetime.size()) { 
                fDatetime.val(getInputDateTime().time); 
        }
        disableLessEqualMinTime();
        updateTextToCloseBtn();
        openFullscreeen();
    }

    function getInput() {
        return $('#' + $.nameToId(params.datetime_name));
    }

    function getInputDateTime() {
        var dateTime = getInput().val().split(' '); 
        return { date: dateTime[1], time: dateTime[0] };
    }

    function updateTextToCloseBtn() {
        $('.flatpickr-calendar.open .flatpickr-close').html(getInput().val() + ' <i class="fa fa-check"></i>');
    }

    function rangeOptions(selectValue) {
        var opts = [];
        for (var i = 6; i <= 22; i++) {
            var val = i < 10 ? '0' + i : i;
            val += ':';
            for (var j = 0; j <= 30; j += 30) {
                var minuteVal = j < 10 ? '0' + j : j;
                var valAll = val + minuteVal;
                var valText = valAll + ' (' + add0FirstNumber(i) + ':' + minuteVal + ' Sáng)';
                if (i >= 12 && i <= 17) {
                    valText = valAll + ' (' + add0FirstNumber(i - 12) + ':' + minuteVal + ' Chiều)';
                }
                else if (i > 17) {
                    valText = valAll + ' (' + add0FirstNumber(i - 12) + ':' + minuteVal + ' Tối)';
                }
                if (!(i === 22 && j === 30)) opts.push('<option ' + (selectValue == valAll ? 'selected' : '') + ' value="' + valAll + '">' + valText + '</option>');
            }
        }
        return opts.join('');
    }

    function add0FirstNumber(v) {
        return v < 10 ? ('0' + v) : v;
    }

    return MyFlatDateTimePicker[datePickerId];
};