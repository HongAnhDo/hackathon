import React from 'react';
import Base from '../../../core/Base';
import { translate } from 'react-i18next';
import "../css/RentalGuide.css";
import "../css/Guide.css"
import HeaderSubPage from '../header/HeaderSubPage';
import {getQuestions} from "../../../../views/assets/questions.js"
import scrollToComponent from 'react-scroll-to-component';
import { reactLocalStorage } from 'reactjs-localstorage'

class RentalGuide extends Base {
    constructor(props) {
        super(props);
        var questions = getQuestions();
        questions && questions.map(value => {
            return value["display"] = false;

        })
        this.state = ({
            questions: questions ? questions : [],
            index: ""

        })
    }

    componentWillReceiveProps() {
        this.handleScroll()
    }

    componentDidMount() {
        this.handleScroll()
    }

    handleScroll = () => {
        var link = window.location.href;
        var index = link.charAt(link.length - 1);
      
        var height = window.innerHeight

        if (index == 1)
            scrollToComponent(this.sec0, { offset: 0, align: 'bottom', duration: 500 });
        else if (index == 2)
            scrollToComponent(this.sec1, { offset: 0, align: 'middle', duration: 500 });
        else
            window.scrollTo(0, 0)
    }

    onShowMore = (event, index) => {
        var questions = this.state.questions;

        questions.map(value => {
            if (value["index"] === index) {
                return value["display"] = !value["display"]
            }
        })

        this.setState({ questions: questions })
    }


    render() {
        const t = this.props.t;
        const { questions } = this.state
        return (
            <div className="container-page-sub">
                <div className="row">
                    <HeaderSubPage title={t("guide.title")} />
                    <div className="body-rent">
                        <div className="body-guide">
                            <section ref={(section) => { this.sec0 = section; }}>
                                <p className="title-child-owner">{t("guide.title1")}</p>
                                {/* <div className="div-guest">Khách thuê</div> */}
                                <div className="rental-process">
                                    <div>
                                        <img src="assets/images/Group1390.png" className="img-process" />
                                        <img src="assets/images/Group1391.png" className="img-process" />
                                        <img src="assets/images/Group1392.png" className="img-process" />
                                        <img src="assets/images/Group1393.png" className="img-process" />
                                    </div>
                                    <div>
                                        <div className="line-process"></div>
                                        <div className="rental-process dot-line">
                                            <span className="dot dot1"></span>
                                            <span className="dot dot2"></span>
                                            <span className="dot dot3"></span>
                                            <img src = "assets/images/icon/ic-complete.png" className="dot dot4"></img>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-process">
                                            <span className="title-process">{t("guide.process1")}</span>
                                            <span className="des-process">{t("guide.content1")}</span>
                                        </div>
                                        <div className="text-process">
                                            <span className="title-process">{t("guide.process2")}</span>
                                            <span className="des-process">{t("guide.content2")}</span>
                                        </div>
                                        <div className="text-process">
                                            <span className="title-process">{t("guide.process3")}</span>
                                            <span className="des-process">{t("guide.content3")}</span>
                                        </div>
                                        <div className="text-process">
                                            <span className="title-process">{t("guide.process4")}</span>
                                            <span className="des-process">{t("guide.content4")}</span>
                                        </div>
                                    </div>

                                </div>
                            </section >

                            <section ref={(section) => { this.sec1 = section; }}>
                                <p className="title-child-owner question">{t("guide.title2")}</p>
                            </section>
                            {/* <div className="div-guest">Khách thuê</div> */}

                            <div className="wrapper">
                                {questions && questions.map(value =>
                                    <div key={value["index"]}>
                                        <div key={value["index"]} className={value["display"] ? "item-question-display" : "item-question"}>
                                            <div className="div-text-question">
                                                <span className="text-question">{value["question"]}</span>
                                            </div>
                                            <div>
                                                {value["display"] ? <img src="assets/images/icon/Group1260.png" alt="" className="icon-right-question" key={value["index"]} onClick={(event) => this.onShowMore(event, value["index"])} />
                                                    : <img src="assets/images/icon/Group1259.png" alt="" className="icon-right-question" key={value["index"]} onClick={(event) => this.onShowMore(event, value["index"])} />}
                                            </div>
                                        </div>
                                        {value["display"] &&
                                            <div className="item-answer">
                                                <span>{value["answer"]}</span>

                                            </div>}
                                    </div>
                                )}
                            </div>


                        </div>

                    </div>
                </div>
            </div >

        );
    }


}

export default translate('common')(RentalGuide);