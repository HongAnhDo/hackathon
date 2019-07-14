import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './style.css';
import { Icon } from 'antd';
import { Collapse } from 'reactstrap';

class ItemQuestion extends React.Component {
    state = {
        show: false
    }

    handleShow = () => {
        var show = this.state.show;
        this.setState({ show: !show })
    }

    render() {
        const { question } = this.props;
        const { show } = this.state;
        return (
            <div className="item-question">
                <Row className={show ? "title-question act" : "title-question"} onClick={this.handleShow}>
                    <div className="text-title">
                        <span>{question.title}</span>
                    </div>
                    <Icon type={show ? "minus" : "plus"} className={show ? "icon icon-white" : "icon"} ></Icon>
                </Row>
                <Collapse isOpen={show}>
                    <div className="content-question" >{question.content}</div></Collapse>
            </div>

        )
    }

}

export default ItemQuestion;