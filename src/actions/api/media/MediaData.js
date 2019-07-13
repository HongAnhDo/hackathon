import { i18next } from "../../i18n";
import React from 'react';
import "../../../views/components/company/css/InsurancePolicy.css";

const MediaData = () => {
    return [
        , {
            media_id: 1,
            media_name: i18next.t("common:media.express"),
            media_link: "https://startup.vnexpress.net/tin-tuc/hanh-trinh-khoi-nghiep/cong-bo-top-15-du-an-vao-vong-thuyet-trinh-startup-viet-2018-3834533-p2.html",
            media_content: <img src="assets/images/about/vnexpress.jpg" alt="vn express 2018" className="video-slide" />
        },
        {
            media_id: 4,
            media_name: i18next.t("common:media.startup"),
            media_link: "https://startup.vnexpress.net/tin-tuc/y-tuong-moi/doanh-nhan-8x-va-nen-tang-truc-tuyen-chia-se-xe-tu-lai-3833028.html?fbclid=IwAR1c3qn3I9UoNMHbfd-sKnRC4KC3FM5WmPR9g9wr0reKbcg_mAEmu6QduiQ",
            media_content: <img src="assets/images/about/doanhnhan8x.jpg" alt="doanhnhan8x" className="video-slide" />
        },
        {
            media_id: 2,
            media_name: i18next.t("common:media.hist"),
            media_link: "http://www.pcworld.com.vn/articles/cong-nghe/song-va-cong-nghe/2018/10/1257720/hist-2018-chao-don-21-du-an-tham-gia-vong-tang-toc-huan-luyen/",
            media_content: <img src="assets/images/about/hist.png" alt="hist2018" className="video-slide" />
        },
        {
            media_id: 3,
            media_name: i18next.t("common:media.hackathon"),
            media_link: "http://cafebiz.vn/y-tuong-bookingcom-trong-linh-vuc-cho-thue-xe-o-to-dat-giai-nhat-cuoc-thi-lap-trinh-ve-giao-thong-thong-minh-20180717153509249.chn",
            media_content: <img src="assets/images/about/FPThackathon.jpg" alt="hackathon" className="video-slide" />,
        },
        
        {
            media_id: 0,
            media_name: i18next.t("common:media.video"),
            media_link: "https://www.youtube.com/embed/kI2krhX2esI?showinfo=0&amp;wmode=opaque",
            media_content:
                <div className="embed-responsive embed-responsive-16by9 video-slide">
                    <iframe frameBorder="0" allowFullScreen="" src="https://www.youtube.com/embed/kI2krhX2esI?showinfo=0&amp;wmode=opaque"></iframe>
                </div>
        }
    ]
}

export { MediaData }