import { i18next } from "../../i18n";
import React from 'react';
import "../../../views/components/company/css/InsurancePolicy.css";

const MediaData = () => {
    return [
        {
            media_id: 1,
            media_name: "Tuyên truyền phòng chống bạo lực học đường",
            media_link: "https://vtv.vn/trong-nuoc/bao-luc-hoc-duong-thu-pham-hay-nan-nhan-20190413105524267.html",
            media_content: <img src="assets/images/about/hist.png" alt="vn express 2018" className="video-slide" />
        },
        {
            media_id: 4,
            media_name: "SheCodes Hackathon là cuộc thi phát triển phần mềm đầu tiên tại Việt Nam hướng đến đối tượng dự thi là nữ giới ",
            media_link: "https://vtv.vn/trong-nuoc/bao-luc-hoc-duong-thu-pham-hay-nan-nhan-20190413105524267.html",
            media_content: <img src="assets/images/about/doanhnhan8x.jpg" alt="doanhnhan8x" className="video-slide" />
        },
        {
            media_id: 2,
            media_name: "Chương trình chống bạo lực ở trẻ em",
            media_link: "http://www.pcworld.com.vn/articles/cong-nghe/song-va-cong-nghe/2018/10/1257720/hist-2018-chao-don-21-du-an-tham-gia-vong-tang-toc-huan-luyen/",
            media_content: <img src="assets/images/about/FPTChungxe.jpg" alt="hist2018" className="video-slide" />
        },
        {
            media_id: 3,
            media_name: "Tập huấn kỹ năng cho các em học sinh tại các trường học",
            media_link: "https://vtv.vn/trong-nuoc/bao-luc-hoc-duong-thu-pham-hay-nan-nhan-20190413105524267.html",
            media_content: <img src="https://tuvantamly.com.vn/wp-content/uploads/2018/06/Tu-van-tam-ly-KNS-1.jpg" alt="vn express 2018" className="video-slide" />
        }
    ]
}

export { MediaData }