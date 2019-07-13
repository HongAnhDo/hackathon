import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './style.css';

export const HeaderSubPage = ({ title,idTitle, description, rightComponent, type = 1 }) => (
    <div className="h-subpage">

        <Col sm="6" className="col-xs-6 child child-1" >
            <img src = "assets/images/banner_cx1.jpg"/>
        </Col>
        <Col sm="6" className="col-xs-6 child child-2" style ={{background: '#107d82'}} >
            {type == 1 ?
            <div className = "div-des"><h4 className ="description">{description}</h4></div>
                : rightComponent()}
        </Col>

    </div>

)
