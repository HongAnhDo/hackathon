import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './style.scss';


export const ContentPage = ({ leftComponent, rightComponent }) => (
    <Row className="content-page-row">

        <Col sm="4" className="content-left">
            <div className=" container-shadow">
                {leftComponent()}
            </div>
        </Col>
        <Col className="col-xs-6 content-right" style={{ marginLeft: "40px" }} >
            <div className="container-shadow right">
                <div className = "right__content">
                {rightComponent()}
                </div>
            </div>

        </Col>

    </Row>

)