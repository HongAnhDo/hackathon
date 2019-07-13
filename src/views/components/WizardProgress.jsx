import React from 'react';
import Base from '../core/Base';
import { translate } from 'react-i18next';
import Steps, { Step } from 'rc-steps';
import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
import "../assets/css/WizardProgress.css"

class WizardProgress extends Base {
    constructor(props) {
        super(props);
        this.state = {
            steps: [
                { id: 1, value: "", text: props.t("process.one") },
                { id: 2, value: "", text: props.t("process.two") },
                { id: 3, value: "", text: props.t("process.three") },
                { id: 4, value: "", text: props.t("process.four") }]
        }
    }

    componentWillMount = () => {
        var activeStep = this.props.step;
        var steps = this.state.steps;

        steps.map((s) => {
            (s.id < activeStep) ? s.value = "completed" : (s.id == activeStep) ? s.value = "active" : s.value = ""
        })

        this.setState({ steps })
    }

    getFinishIcon=(step)=> {
        const path = <div>{step}</div>
        return (
           <div style ={{width:"100%", height:"100%", fontSize:"14px", lineHeight:"22px", textAlign:"center",color:"#fff", marginTop: "3px"}}>{step}</div>
        );
    }

    render() {
        const steps = this.state.steps;
        var step = parseInt(this.props.step);
        var width = step / 4 * 100 + "%";
        const icons1 = {
            finish: this.getFinishIcon(1)
        }
        const icons2 = {
            finish: this.getFinishIcon(2)
        }
        const icons3 = {
            finish: this.getFinishIcon(3)
        }
        const icons4 = {
            finish: this.getFinishIcon(4)
        }
        

        return (
            <div className="container">
                <div className="row  mt-xlg mb-md">
                    <div className="col-lg-7 col-md-9 m-auto" style={{ paddingBottom: "10px" }}>

                        <ul >

                            <Steps labelPlacement="vertical" current={step - 1}>
                                <Step className ={step >= 1 ? "done-step":"" } title={steps[0].text}  icons={icons1} />
                                <Step className ={step >= 2 ? "done-step":"" } title={steps[1].text}  icons={icons2}/>
                                <Step className ={step >= 3 ? "done-step":"" } title={steps[2].text}  icons={icons3}/>
                                <Step className ={step >= 4 ? "done-step":"" } title={steps[3].text}  icons={icons4}/>

                            </Steps>

                        </ul>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default translate('common')(WizardProgress);
